import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // In a real application, you would store the OTP with an expiration time
    // and associate it with the user's email/session.
    console.log(`Generated OTP for ${email}: ${otp}`);

    // Configure Nodemailer (replace with your actual email service details)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail', 'outlook', or your SMTP host
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for NEXYE Courier Portal',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #667eea;">NEXYE Courier Portal - OTP Verification</h2>
          <p>Dear User,</p>
          <p>Your One-Time Password (OTP) for verification is: <strong>${otp}</strong></p>
          <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thank you,<br/>NEXYE Team</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send OTP email.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}