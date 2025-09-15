export default function handler(req, res) {
  if (req.method === 'GET') {
    // Mock order data
    const orders = [
      {
        orderId: 'ORD001',
        status: 'completed',
        pickupAddress: '123 Main St',
        deliveryAddress: '456 Oak Ave',
        packageType: 'Document',
        weight: '0.5 kg',
        price: 100,
        estimatedDelivery: 'Today, 1-2 PM',
        orderDate: '2023-10-26',
        orderTime: '10:00 AM',
        customerName: 'Alice Smith',
        customerPhone: '111-222-3333',
        receiverName: 'Bob Johnson',
        receiverPhone: '444-555-6666',
      },
      {
        orderId: 'ORD002',
        status: 'failed',
        pickupAddress: '789 Pine Ln',
        deliveryAddress: '101 Elm Rd',
        packageType: 'Parcel',
        weight: '2.0 kg',
        price: 250,
        estimatedDelivery: 'Yesterday, 3-4 PM',
        orderDate: '2023-10-25',
        orderTime: '02:30 PM',
        customerName: 'Charlie Brown',
        customerPhone: '777-888-9999',
        receiverName: 'Lucy Van Pelt',
        receiverPhone: '000-111-2222',
      },
      {
        orderId: 'ORD003',
        status: 'pending_payment',
        pickupAddress: '222 Maple Dr',
        deliveryAddress: '333 Birch Ct',
        packageType: 'Electronics',
        weight: '1.5 kg',
        price: 500,
        estimatedDelivery: 'Tomorrow, 10-11 AM',
        orderDate: '2023-10-26',
        orderTime: '11:45 AM',
        customerName: 'David Lee',
        customerPhone: '999-888-7777',
        receiverName: 'Eve Davis',
        receiverPhone: '666-555-4444',
      },
      {
        orderId: 'ORD004',
        status: 'out_for_delivery',
        pickupAddress: '444 Cedar Ave',
        deliveryAddress: '555 Spruce St',
        packageType: 'Fragile',
        weight: '1.0 kg',
        price: 300,
        estimatedDelivery: 'Today, 2-3 PM',
        orderDate: '2023-10-26',
        orderTime: '01:00 PM',
        customerName: 'Frank White',
        customerPhone: '123-456-7890',
        receiverName: 'Grace Black',
        receiverPhone: '098-765-4321',
      },
    ];
    res.status(200).json(orders);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}