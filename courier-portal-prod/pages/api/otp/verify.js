import { verify } from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // In a real application, you would retrieve the stored OTP for the given email
    // and compare it with the provided OTP. Also, check for OTP expiration.
    // For this example, we'll use a dummy OTP '1234'.
    const storedOtp = '1234'; // This should come from your database/cache

    if (otp === storedOtp) {
      // OTP is valid, you might want to generate a token or set a session here
      res.status(200).json({ message: 'OTP verified successfully!', verified: true });
    } else {
      res.status(400).json({ message: 'Invalid OTP', verified: false });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}