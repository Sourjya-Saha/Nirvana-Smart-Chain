import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: EmailPayload = await req.json();
    const { name, email, subject, message } = body;

    // Validate the email payload
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nirvanasmartchain@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Email options with types
    const mailOptions: nodemailer.SendMailOptions = {
        from: email,
        to: 'nirvanasmartchain@gmail.com',
        subject: `Contact Form: ${subject}`,  // Fixed: Added backticks here
        text: `
          Name: ${name}
          Email: ${email}
          
          Message:
          ${message}
        `,
        replyTo: email
      };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
