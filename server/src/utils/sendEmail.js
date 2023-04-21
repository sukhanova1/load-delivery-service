const nodemailer = require('nodemailer');

const sendEmail = async (email, emailSubj, emailText) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: emailSubj,
    text: emailText,
  });
};

module.exports = {
  sendEmail,
};
