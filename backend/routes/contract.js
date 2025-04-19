import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const contractRouter = express.Router();

contractRouter.post('/', async (req, res) => {
  const {
    productName,
    price,
    buyerEmail,
    sellerEmail,
    deliveryDate,
    penalty,
    selectedRule
  } = req.body;

  const contractId = `CT${Date.now()}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: [buyerEmail, sellerEmail],
    subject: `New SafeContract Agreement - ID ${contractId}`,
    html: `
      <h2>SafeFreeze Contract Created</h2>
      <p><strong>Product:</strong> ${productName}</p>
      <p><strong>Price:</strong> ₹${price}</p>
      <p><strong>Delivery Date:</strong> ${deliveryDate}</p>
      <p><strong>Penalty:</strong> ₹${penalty} per day</p>
      <p><strong>Rule:</strong> ${selectedRule}</p>
      <p><strong>Contract ID:</strong> ${contractId}</p>
      <p>This email was sent to both buyer and seller as a formal contract record.</p>
    `
  };

  // try {
  //   await transporter.sendMail(mailOptions);
  //   res.status(200).json({ success: true, contractId });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ success: false, message: 'Failed to send email' });
  // }
  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent!");
    res.status(200).json({ success: true, contractId });
  } catch (err) {
    console.error("❌ Email failed:", err);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
  
});

export default contractRouter;
