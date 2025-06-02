const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

const mailOption = (receiverMail, receiverName) => {
  return {
    from: `"Hasan" ${process.env.USER} `,
    to: receiverMail, // Birden fazla alıcı virgülle ayrılabilir
    subject: 'Thank you for contacting us!',
    text: `Hello ${receiverName}`,
  }
}

const sendMail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { mailOption, sendMail };