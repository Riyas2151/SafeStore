import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/escrow', async (req, res) => {
  const { contractId, buyerEmail, sellerEmail } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: [buyerEmail, sellerEmail],
    subject: `SafeFreeze Escrow Confirmation (Contract ID: ${contractId})`,
    html: `
      <h2>Payment Stored in Escrow</h2>
      <p><strong>Contract ID:</strong> ${contractId}</p>
      <p>Your payment is safely stored in escrow. It will be released once both parties fulfill the contract conditions.</p>
      <p>Thank you for trusting <strong>SafeFreeze</strong>.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending escrow email:', err);
    res.status(500).json({ success: false, message: 'Failed to send escrow email' });
  }
});

export default router;
