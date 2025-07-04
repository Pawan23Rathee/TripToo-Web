// triptoo-backend/utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // For self-signed certs in dev; remove in production if using valid certs
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: to, // List of receivers
            subject: subject, // Subject line
            html: text, // html body
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Email send failed:', error);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;