import nodemailer from 'nodemailer';

// Step 1: Configure the transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // use true for 465, false for other ports
    auth: {
        user: process.env.UserMail,
        pass: process.env.UserPass,
    },
});

// Step 2: Set up the email options


const sendEmail = (mailOptions) => {
    

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
