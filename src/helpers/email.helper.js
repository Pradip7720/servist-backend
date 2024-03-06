import aws from 'aws-sdk';
import nodemailer from 'nodemailer';
import { resMessages } from '../constants/successMessages';
import { errorMessages } from '../constants/errorMessages';
// AWS SES
aws.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY',    //   AWS access key
  secretAccessKey: 'YOUR_SECRET_KEY', // AWS secret key
  region: 'us-east-1'                 // Replace AWS region
});

// Configure Nodemailer with SES
const transporter = nodemailer.createTransport({
  SES: new aws.SES({ apiVersion: '2010-12-01' })
});

// Function to send an email
const sendEmail = async (to, subject, message) => {
  try {
    // Define email options
    const mailOptions = {
      from: 'your-email@example.com', // Replace  sender email address
      to,
      subject,
      text: message
    };

    const result = await transporter.sendMail(mailOptions);

    console.log('Email sent:', result);
    return { success: true, message: resMessages.EMAIL_SUCCESS };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: errorMessages.EMAIL_SEND_ERR };
  }
};

module.exports = { sendEmail };
