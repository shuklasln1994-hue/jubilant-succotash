import { getAuthToken } from './auth';
import { getCityStateFromPincode } from './utils/pincode';
import { getPickupLocations, createPickupLocation } from './utils/pickupLocation';
import { getCourierRates } from './utils/courierSelection';

console.log('🔍 Shiprocket handler loaded with all imports');

// Utility function to validate and parse dimensions
function parseDimensions(dimensionsInput) {
  // Default dimensions (in cm)
  const defaultDimensions = { length: 10, breadth: 10, height: 5 };

  if (!dimensionsInput) {
    console.log('No dimensions provided, using defaults:', defaultDimensions);
    return defaultDimensions;
  }

  try {
    // If it's already an object with length, breadth, height
    if (typeof dimensionsInput === 'object' && dimensionsInput.length !== undefined) {
      const length = parseFloat(dimensionsInput.length) || defaultDimensions.length;
      const breadth = parseFloat(dimensionsInput.breadth) || defaultDimensions.breadth;
      const height = parseFloat(dimensionsInput.height) || defaultDimensions.height;

      return { length, breadth, height };
    }

    // If it's a string like "10x10x5" or "10*10*5"
    if (typeof dimensionsInput === 'string') {
      const parts = dimensionsInput.split(/[x*]/).map(part => parseFloat(part.trim()));

      if (parts.length === 3 && parts.every(part => !isNaN(part) && part > 0)) {
        return {
          length: parts[0],
          breadth: parts[1],
          height: parts[2]
        };
      }
    }

    console.warn(`Invalid dimensions format: ${JSON.stringify(dimensionsInput)}. Using defaults.`);
    return defaultDimensions;

  } catch (error) {
    console.error('Error parsing dimensions:', error);
    return defaultDimensions;
  }
}

// Utility function to validate pincode
function validatePincode(pincode) {
  const pincodeStr = String(pincode).trim();
  if (!/^\d{6}$/.test(pincodeStr)) {
    throw new Error(`Invalid pincode: ${pincode}. Must be exactly 6 digits.`);
  }
  return pincodeStr;
}

// Utility function to validate required fields
function validateRequiredFields(data) {
  const required = [
    'senderName', 'senderPhone', 'senderAddress', 'senderPincode', 'senderEmail',
    'receiverName', 'receiverPhone', 'receiverAddress', 'receiverPincode', 'receiverEmail',
    'packageWeight', 'description', 'price'
  ];
  
  const missing = required.filter(field => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    const {
      senderName, senderPhone, senderAddress, senderPincode, senderEmail,
      receiverName, receiverPhone, receiverAddress, receiverPincode, receiverEmail,
      packageWeight, dimensions, description, serviceType, price
    } = req.body;

    // Validate required fields
    validateRequiredFields(req.body);

    // Validate pincodes
    const validSenderPincode = validatePincode(senderPincode);
    const validReceiverPincode = validatePincode(receiverPincode);

    // Get city/state from pincodes
    console.log('Looking up sender pincode:', validSenderPincode);
    const senderLocation = await getCityStateFromPincode(validSenderPincode);
    
    console.log('Looking up receiver pincode:', validReceiverPincode);
    const receiverLocation = await getCityStateFromPincode(validReceiverPincode);

    if (senderLocation.error) {
      return res.status(400).json({ 
        success: false, 
        message: `Sender Pincode Error: ${senderLocation.error}` 
      });
    }
    
    if (receiverLocation.error) {
      return res.status(400).json({ 
        success: false, 
        message: `Receiver Pincode Error: ${receiverLocation.error}` 
      });
    }

    const senderCity = senderLocation.city || "Delhi"; // Better fallback
    const senderState = senderLocation.state || "Delhi";
    const receiverCity = receiverLocation.city || "Sultanpur"; // Better fallback  
    const receiverState = receiverLocation.state || "Uttar Pradesh";

    // Parse and validate dimensions
    const parsedDimensions = parseDimensions(dimensions);
    console.log('Parsed dimensions:', parsedDimensions);

    // Validate weight
    const weight = parseFloat(packageWeight);
    if (isNaN(weight) || weight <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid package weight. Must be a positive number.'
      });
    }

    // Validate price
    const validPrice = parseFloat(price);
    if (isNaN(validPrice) || validPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid price. Must be a positive number.'
      });
    }

    // Generate unique order ID
    const order_id = `NEXYE-${Date.now()}`;
    const order_date = new Date().toISOString().split('T')[0];

    // Create dynamic pickup location
    const pickupLocationData = {
      pickup_location: `Sender-${order_id}`,
      name: senderName,
      email: senderEmail,
      phone: senderPhone,
      address: senderAddress,
      city: senderCity,
      state: senderState,
      country: "India",
      pin_code: senderPincode,
    };

    // Get authentication token
    const token = await getAuthToken();
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Shiprocket authentication failed.'
      });
    }

    // Create dynamic pickup location
    const { success: createPickupSuccess, pickup_location_name, error: createPickupError } = await createPickupLocation(pickupLocationData);

    if (!createPickupSuccess) {
      console.error('Failed to create pickup location:', createPickupError);
      return res.status(400).json({ success: false, message: 'Failed to create pickup location.' });
    }

    console.log('Using Shiprocket pickup location:', pickup_location_name);
    console.log('Value of pickup_location_name before creating shiprocketOrder:', pickup_location_name);

    // Parse names
    const senderNameParts = senderName.trim().split(' ');
    const billing_customer_name = senderNameParts[0] || '';
    const billing_last_name = senderNameParts.slice(1).join(' ') || '';

    const receiverNameParts = receiverName.trim().split(' ');
    const shipping_customer_name = receiverNameParts[0] || '';
    const shipping_last_name = receiverNameParts.slice(1).join(' ') || '';

    // Create Shiprocket order object
    const shiprocketOrder = {
      order_id: order_id,
      order_date: order_date,
      pickup_location: pickup_location_name,
      channel: "Website",
      comment: description,
      billing_customer_name: billing_customer_name,
      billing_last_name: billing_last_name,
      billing_address: senderAddress,
      billing_address_2: "",
      billing_city: senderCity,
      billing_state: senderState,
      billing_country: "India",
      billing_email: senderEmail,
      billing_phone: senderPhone,
      billing_pincode: validSenderPincode,
      shipping_customer_name: shipping_customer_name,
      shipping_last_name: shipping_last_name,
      shipping_address: receiverAddress,
      shipping_address_2: "",
      shipping_city: receiverCity,
      shipping_state: receiverState,
      shipping_country: "India",
      shipping_email: receiverEmail,
      shipping_phone: receiverPhone,
      shipping_pincode: validReceiverPincode,
      shipping_is_billing: false,
      order_items: [
        {
          name: description,
          sku: `SKU-${order_id}`,
          units: 1,
          selling_price: validPrice,
          discount: 0,
          tax: 0,
          hsn: 49011000
        }
      ],
      payment_method: "Prepaid",
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: validPrice,
      length: parsedDimensions.length,
      breadth: parsedDimensions.breadth,
      height: parsedDimensions.height,
      weight: weight
    };

    console.log('Final Shiprocket Order Object:', JSON.stringify(shiprocketOrder, null, 2));

    // Call Shiprocket API to create an order
    const shiprocketResponse = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(shiprocketOrder),
    });

    const shiprocketData = await shiprocketResponse.json();
    console.log('Shiprocket Order Creation Response (full data):', JSON.stringify(shiprocketData, null, 2));
    console.log('courier_id from shiprocketData:', shiprocketData.courier_id);
    console.log('awb_code from shiprocketData:', shiprocketData.awb_code);

    if (shiprocketData.status_code !== 1) {
      console.error("Shiprocket API Error:", shiprocketData);
      return res.status(shiprocketResponse.status).json({
        message: "Failed to create order in Shiprocket",
        error: shiprocketData,
        shiprocketOrder: shiprocketOrder,
      });
    }

    const orderId = shiprocketData.order_id;
    const shipmentId = shiprocketData.shipment_id;

    // Get courier rates
    const rateData = {
      pickup_postcode: validSenderPincode,
      delivery_postcode: validReceiverPincode,
      weight: weight,
      length: parsedDimensions.length,
      breadth: parsedDimensions.breadth,
      height: parsedDimensions.height,
      declared_value: validPrice,
      cod: 0,
    };
    console.log('Fetching courier rates with data:', rateData);
    const { success: ratesSuccess, couriers, error: ratesError } = await getCourierRates(rateData);

    if (!ratesSuccess || couriers.length === 0) {
      console.error("Failed to fetch courier rates or no couriers available.", ratesError);
      return res.status(400).json({ success: false, message: 'Failed to fetch courier rates or no couriers available.' });
    }

    const selectedCourier = couriers[0];
    console.log('Selected courier:', selectedCourier);

    // Assign AWB
    console.log('Attempting to assign AWB with orderId:', orderId, 'and shipmentId:', shipmentId);
    const assignAWBResponse = await fetch("https://apiv2.shiprocket.in/v1/external/courier/assign/awb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shipment_id: shipmentId,
        courier_id: selectedCourier.courier_company_id,
      }),
    });
    console.log('assignAWBResponse:', assignAWBResponse);
    const assignAwbData = await assignAWBResponse.json();
    console.log('assignAwbData:', assignAwbData);
    console.log('assignAWBResponse.status:', assignAWBResponse.status);

    // Temporarily adjust condition to allow processing even if HTTP status is not 2xx, as long as Shiprocket reports success
    if (assignAwbData.awb_assign_status !== 1) {
      console.error("Shiprocket AWB Assignment Error:", assignAwbData);
      return res.status(assignAWBResponse.status).json({
        message: "Failed to assign AWB in Shiprocket",
        error: assignAwbData,
        shiprocketOrder: shiprocketOrder,
        shiprocketCreateOrderResponse: shiprocketData,
      });
    }

    const awbCode = assignAwbData.response.data.awb_code;
    const courierName = assignAwbData.response.data.courier_name;
    console.log('awbCode from assignAwbData:', awbCode);
    console.log('courierName from assignAwbData:', courierName);

    res.status(200).json({
      message: "Order created and AWB assigned successfully",
      orderId: orderId,
      shipmentId: shipmentId,
      awbCode: awbCode,
      courierName: courierName,
      shiprocketResponse: shiprocketData,
      assignAwbResponse: assignAwbData,
    });
  } catch (error) {
    console.error("Error in Shiprocket API integration:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}