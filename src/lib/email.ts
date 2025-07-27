// src/lib/email.ts
import nodemailer from 'nodemailer';

// Configure your email transporter
// Example using SMTP (replace with your actual SMTP details or a service like SendGrid/Mailgun)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: process.env.EMAIL_SERVER_SECURE === 'true', // Use 'true' for 465, 'false' for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendVerificationEmail(to: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // e.g., "Your App <noreply@yourdomain.com>"
      to: to,
      subject: 'Verify your email address for Orient Express',
      html: `
        <p>Hello,</p>
        <p>Thank you for registering with Orient Express. Please verify your email address by clicking the link below:</p>
        <p><a href="${verificationUrl}">Verify Email Address</a></p>
        <p>If you did not register for an account, please ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,</p>
        <p>The Orient Express Team</p>
      `,
      text: `Hello,\n\nThank you for registering with Orient Express. Please verify your email address by visiting this link: ${verificationUrl}\n\nIf you did not register for an account, please ignore this email.\n\nThis link will expire in 24 hours.\n\nBest regards,\nThe Orient Express Team`,
    });
    console.log(`Verification email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send verification email to ${to}:`, error);
    throw new Error('Failed to send verification email.');
  }
}