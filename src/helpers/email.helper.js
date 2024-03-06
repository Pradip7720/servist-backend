import aws from 'aws-sdk';
import nodemailer from 'nodemailer';
import { resMessages } from '../constants/successMessages';
import { errorMessages } from '../constants/errorMessages';

aws.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  region: process.env.AWS_REGION
});


const transporter = nodemailer.createTransport({
  SES: new aws.SES({ apiVersion: '2010-12-01' })
});

const sendEmail = async (to, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to,
      subject,
      text: message
    };

    const result = await transporter.sendMail(mailOptions);

    console.log('Email sent:', result);
    return { message: resMessages.EMAIL_SUCCESS };
  } catch (error) {
    console.error('Error sending email:', error);
    return { message: errorMessages.EMAIL_SEND_ERR };
  }
};

module.exports = { sendEmail };
