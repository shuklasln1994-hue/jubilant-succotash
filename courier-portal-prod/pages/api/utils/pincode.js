// Multiple pincode lookup services for redundancy
const PINCODE_APIS = [
  {
    name: 'PostalPincode',
    url: (pincode) => `https://api.postalpincode.in/pincode/${pincode}`,
    parseResponse: (data) => {
      if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.[0]) {
        const postOffice = data[0].PostOffice[0];
        return {
          city: postOffice.District,
          state: postOffice.State
        };
      }
      throw new Error('No data found');
    }
  },
  {
    name: 'ZippopotamusIN', 
    url: (pincode) => `http://api.zippopotam.us/in/${pincode}`,
    parseResponse: (data) => {
      if (data.places?.[0]) {
        return {
          city: data.places[0]['place name'],
          state: data.places[0]['state']
        };
      }
      throw new Error('No data found');
    }
  }
];

// Known pincode mappings for common areas (fallback)
const KNOWN_PINCODES = {
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '110096': { city: 'East Delhi', state: 'Delhi' },
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '400002': { city: 'Mumbai', state: 'Maharashtra' },
  '560001': { city: 'Bangalore', state: 'Karnataka' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '228001': { city: 'Sultanpur', state: 'Uttar Pradesh' },
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh' },
  '221001': { city: 'Varanasi', state: 'Uttar Pradesh' },
  '201001': { city: 'Ghaziabad', state: 'Uttar Pradesh' }
};

async function fetchWithTimeout(url, options = {}) {
  const timeout = options.timeout || 5000; // 5 seconds default
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function tryPincodeAPI(api, pincode) {
  try {
    console.log(`Trying ${api.name} API for pincode ${pincode}...`);
    
    const response = await fetchWithTimeout(api.url(pincode), {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    const result = api.parseResponse(data);
    
    console.log(`✓ ${api.name} API succeeded:`, result);
    return result;
    
  } catch (error) {
    console.log(`✗ ${api.name} API failed:`, error.message);
    throw error;
  }
}

export async function getCityStateFromPincode(pincode) {
  const cleanPincode = String(pincode).trim();
  
  // Validate pincode format
  if (!/^\d{6}$/.test(cleanPincode)) {
    return { 
      error: `Invalid pincode format: ${pincode}. Must be 6 digits.`,
      city: null,
      state: null 
    };
  }
  
  // Check known pincodes first (fastest)
  if (KNOWN_PINCODES[cleanPincode]) {
    console.log(`Using known pincode data for ${cleanPincode}:`, KNOWN_PINCODES[cleanPincode]);
    return {
      ...KNOWN_PINCODES[cleanPincode],
      error: null
    };
  }
  
  // Try each API in sequence
  for (const api of PINCODE_APIS) {
    try {
      const result = await tryPincodeAPI(api, cleanPincode);
      return {
        ...result,
        error: null
      };
    } catch (error) {
      console.log(`API ${api.name} failed, trying next...`);
      continue;
    }
  }
  
  // All APIs failed - try to provide a reasonable fallback based on pincode ranges
  const fallback = getPincodeRangeFallback(cleanPincode);
  if (fallback) {
    console.log(`Using pincode range fallback for ${cleanPincode}:`, fallback);
    return {
      ...fallback,
      error: null
    };
  }
  
  // Complete failure
  return { 
    error: `Unable to fetch city/state for pincode ${pincode}. All services unavailable.`,
    city: null,
    state: null 
  };
}

// Fallback based on pincode ranges (rough approximation)
function getPincodeRangeFallback(pincode) {
  const code = parseInt(pincode);
  
  if (code >= 110001 && code <= 110096) return { city: 'Delhi', state: 'Delhi' };
  if (code >= 400001 && code <= 400104) return { city: 'Mumbai', state: 'Maharashtra' };
  if (code >= 560001 && code <= 560103) return { city: 'Bangalore', state: 'Karnataka' };
  if (code >= 700001 && code <= 700156) return { city: 'Kolkata', state: 'West Bengal' };
  if (code >= 600001 && code <= 600123) return { city: 'Chennai', state: 'Tamil Nadu' };
  if (code >= 500001 && code <= 500104) return { city: 'Hyderabad', state: 'Telangana' };
  
  // Uttar Pradesh ranges
  if (code >= 201001 && code <= 201318) return { city: 'Ghaziabad', state: 'Uttar Pradesh' };
  if (code >= 226001 && code <= 226030) return { city: 'Lucknow', state: 'Uttar Pradesh' };
  if (code >= 221001 && code <= 221601) return { city: 'Varanasi', state: 'Uttar Pradesh' };
  if (code >= 228001 && code <= 228304) return { city: 'Sultanpur', state: 'Uttar Pradesh' };
  
  // Add more ranges as needed
  return null;
}

// Function to add new known pincodes dynamically
export function addKnownPincode(pincode, city, state) {
  KNOWN_PINCODES[pincode] = { city, state };
  console.log(`Added known pincode: ${pincode} -> ${city}, ${state}`);
}