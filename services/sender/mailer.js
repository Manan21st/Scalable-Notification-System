import nodemailer from 'nodemailer';

// Step 1: Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use the email service (e.g., Gmail, Outlook)
  auth: {
    user: process.env.UserMail, // Replace with your email
    pass: process.env.UserPass   // Replace with your email password or app password
  }
});

// Step 2: Set up the email options


const sendEmail = async function (req, res) {
    

// Step 3: Send the email
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
    });
}

export default
    sendEmail;
