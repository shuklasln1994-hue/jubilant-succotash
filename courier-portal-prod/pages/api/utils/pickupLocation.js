import { getAuthToken } from '../auth';

// Function to create a new pickup location in Shiprocket
export async function createPickupLocation(locationData) {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Authentication failed');
    }

    // Shiprocket Add Pickup Location API payload
    const pickupLocationPayload = {
      pickup_location: locationData.pickup_location, // Unique name for this location
      name: locationData.name,
      email: locationData.email,
      phone: locationData.phone,
      address: locationData.address,
      address_2: locationData.address_2 || "",
      city: locationData.city,
      state: locationData.state,
      country: locationData.country || "India",
      pin_code: locationData.pin_code
    };

    console.log('Creating pickup location with payload:', pickupLocationPayload);

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/settings/company/addpickup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(pickupLocationPayload)
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log('✓ Pickup location created successfully:', responseData);
      console.log('Returning pickup_location_name:', locationData.pickup_location);
      return {
        success: true,
        data: responseData,
        pickup_location_name: locationData.pickup_location
      };
    } else {
      console.error('✗ Failed to create pickup location:', responseData);
      return {
        success: false,
        error: responseData.message || 'Failed to create pickup location'
      };
    }

  } catch (error) {
    console.error('Error creating pickup location:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Function to check if pickup location already exists
export async function getPickupLocations() {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Authentication failed');
    }

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/settings/company/pickup', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const responseData = await response.json();

    if (response.ok) {
      return {
        success: true,
        locations: responseData.data?.shipping_address || []
      };
    } else {
      return {
        success: false,
        error: responseData.message || 'Failed to fetch pickup locations'
      };
    }

  } catch (error) {
    console.error('Error fetching pickup locations:', error);
    return {
      success: false,
      error: error.message
    };
  }
}