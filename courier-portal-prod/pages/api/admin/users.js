export default function handler(req, res) {
  if (req.method === 'GET') {
    // Mock user data
    const users = [
      {
        id: 'USR001',
        name: 'Alice Smith',
        phone: '111-222-3333',
        address: '123 Main St, Anytown, USA',
        email: 'alice.smith@example.com',
      },
      {
        id: 'USR002',
        name: 'Bob Johnson',
        phone: '444-555-6666',
        address: '456 Oak Ave, Anytown, USA',
        email: 'bob.johnson@example.com',
      },
      {
        id: 'USR003',
        name: 'Charlie Brown',
        phone: '777-888-9999',
        address: '789 Pine Ln, Anytown, USA',
        email: 'charlie.brown@example.com',
      },
      {
        id: 'USR004',
        name: 'Lucy Van Pelt',
        phone: '000-111-2222',
        address: '101 Elm Rd, Anytown, USA',
        email: 'lucy.vanpelt@example.com',
      },
    ];
    res.status(200).json(users);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}