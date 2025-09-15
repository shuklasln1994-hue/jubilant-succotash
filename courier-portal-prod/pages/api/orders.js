export default function handler(req, res) {
  if (req.method === 'POST') {
    // Here you'll integrate with Delhivery API
    const orderData = req.body;
    
    // For now, just log the data
    console.log('New order:', orderData);
    
    res.status(200).json({ 
      success: true, 
      message: 'Order received',
      orderId: 'ORD' + Date.now()
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}