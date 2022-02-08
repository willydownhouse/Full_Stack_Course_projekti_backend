import nodemailer from 'nodemailer';

import SMTPTransport from 'nodemailer/lib/smtp-transport';
import config from '../utils/config';

type EmailOptions = {
  email: string;
  subject: string;
  text: string;
};

const transporterDev = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  auth: {
    user: config.EMAIL_USERNAME,
    pass: config.EMAIL_PASSWORD,
  },
} as SMTPTransport.Options);

const transporterProd = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: 'SSLv3',
  },
  requireTLS: true,
  auth: {
    user: 'adventure_buddy@outlook.com',
    pass: config.EMAIL_PASSWORD_PROD,
  },
} as SMTPTransport.Options);

const sendEmail = async (options: EmailOptions) => {
  const mailOptions = {
    from: 'Adventure Buddy <adventure_buddy@outlook.com',
    to: options.email,
    subject: options.subject,
    text: options.text,
  };
  config.NODE_ENV === 'development'
    ? await transporterDev.sendMail(mailOptions)
    : await transporterProd.sendMail(mailOptions);
};

export const sendConfirmationEmailToCustomer = (
  bookerEmail: string,
  tripName: string,
  date: string
) => {
  return sendEmail({
    email: bookerEmail,
    subject: `You succesfully booked ${tripName}`,
    text: `Thank you ${bookerEmail} for booking ${tripName} starting at ${date}.\n\n Best regards, \n\n Adventure Buddy `,
  });
};
export const sendEmailAboutNewBookingToAdmin = (
  emailTo: string,
  bookerEmail: string,
  tripName: string,
  date: string
) => {
  return sendEmail({
    email: emailTo,
    subject: `New booking for ${tripName}`,
    text: `${bookerEmail} booked for ${tripName} start date ${date}.`,
  });
};
