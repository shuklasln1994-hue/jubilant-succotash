import { getAuthToken } from '../auth';

// Service type mapping
const SERVICE_TYPE_MAPPING = {
  'express': ['Surface', 'Air'], // Express can use both surface and air
  'standard': ['Surface'], // Standard uses surface only
  'overnight': ['Air'], // Overnight uses air only
  'same_day': ['Air'] // Same day uses air only
};

// Function to get courier rates and serviceability
export async function getCourierRates(rateData) {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Authentication failed');
    }

    const ratePayload = {
      pickup_postcode: rateData.pickup_postcode,
      delivery_postcode: rateData.delivery_postcode,
      weight: rateData.weight,
      length: rateData.length,
      breadth: rateData.breadth,
      height: rateData.height,
      declared_value: rateData.declared_value,
      cod: rateData.cod || 0 // 1 for COD, 0 for prepaid
    };

    console.log('Getting courier rates with payload:', ratePayload);

    const queryParams = new URLSearchParams(ratePayload).toString();
    const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/serviceability/?${queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();

    if (response.ok && responseData.status === 200) {
      console.log('✓ Successfully fetched courier rates');
      return {
        success: true,
        couriers: responseData.data?.available_courier_companies || []
      };
    } else {
      console.error('✗ Failed to fetch courier rates:', responseData);
      return {
        success: false,
        error: responseData.message || 'Failed to fetch courier rates'
      };
    }

  } catch (error) {
    console.error('Error fetching courier rates:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Function to select cheapest courier based on service type
export function selectCheapestCourier(couriers, serviceType = 'express') {
  if (!couriers || couriers.length === 0) {
    return null;
  }

  // Get allowed modes for this service type
  const allowedModes = SERVICE_TYPE_MAPPING[serviceType.toLowerCase()] || ['Surface', 'Air'];
  
  // Filter couriers by service type and availability
  const availableCouriers = couriers.filter(courier => {
    return courier.is_surface_available || courier.is_air_available;
  });

  if (availableCouriers.length === 0) {
    console.warn('No available couriers found');
    return null;
  }

  let cheapestCourier = null;
  let lowestRate = Infinity;

  availableCouriers.forEach(courier => {
    // Check surface rates
    if (allowedModes.includes('Surface') && courier.is_surface_available) {
      const surfaceRate = parseFloat(courier.rate || courier.freight_charge || 0);
      if (surfaceRate > 0 && surfaceRate < lowestRate) {
        lowestRate = surfaceRate;
        cheapestCourier = {
          ...courier,
          selected_mode: 'Surface',
          selected_rate: surfaceRate,
          estimated_delivery_days: courier.etd || 'N/A'
        };
      }
    }

    // Check air rates
    if (allowedModes.includes('Air') && courier.is_air_available) {
      const airRate = parseFloat(courier.air_rate || courier.air_freight_charge || 0);
      if (airRate > 0 && airRate < lowestRate) {
        lowestRate = airRate;
        cheapestCourier = {
          ...courier,
          selected_mode: 'Air',
          selected_rate: airRate,
          estimated_delivery_days: courier.air_etd || courier.etd || 'N/A'
        };
      }
    }
  });

  if (cheapestCourier) {
    console.log(`✓ Selected cheapest courier: ${cheapestCourier.courier_name} (${cheapestCourier.selected_mode}) - ₹${cheapestCourier.selected_rate}`);
  }

  return cheapestCourier;
}

// Function to automatically assign and ship the order
export async function assignAndShipOrder(orderData) {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Authentication failed');
    }

    const assignPayload = {
      shipment_id: orderData.shipment_id,
      courier_id: orderData.courier_id,
      is_return: 0,
      is_insurance: 0
    };

    console.log('Assigning courier with payload:', assignPayload);

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/courier/assign/awb', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(assignPayload)
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log('✓ Courier assigned and shipped successfully:', responseData);
      return {
        success: true,
        awb_code: responseData.awb_code,
        courier_name: responseData.courier_name,
        shipment_id: responseData.shipment_id,
        response: responseData
      };
    } else {
      console.error('✗ Failed to assign courier:', responseData);
      return {
        success: false,
        error: responseData.message || 'Failed to assign courier'
      };
    }

  } catch (error) {
    console.error('Error assigning courier:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Function to generate shipping label
export async function generateShippingLabel(shipmentId) {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error('Authentication failed');
    }

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/courier/generate/label', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shipment_id: [shipmentId]
      })
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log('✓ Shipping label generated successfully');
      return {
        success: true,
        label_url: responseData.label_url,
        response: responseData
      };
    } else {
      console.error('✗ Failed to generate shipping label:', responseData);
      return {
        success: false,
        error: responseData.message || 'Failed to generate shipping label'
      };
    }

  } catch (error) {
    console.error('Error generating shipping label:', error);
    return {
      success: false,
      error: error.message
    };
  }
}