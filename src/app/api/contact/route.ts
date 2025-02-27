import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure nodemailer with your email provider settings
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'nirvanasmartchain@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'auye bwit ryzo rlib', // Replace with your actual app password
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'nirvanasmartchain@gmail.com',
      to: process.env.EMAIL_TO || 'nirvanasmartchain@gmail.com',
      subject: `Contact Form: ${data.subject}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        
        Message:
        ${data.message}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.EMAIL_FROM || 'nirvanasmartchain@gmail.com',
      to: data.email,
      subject: 'Thank you for contacting us',
      text: `
        Dear ${data.name},
        
        Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.
        
        Here's a copy of your message:
        
        Subject: ${data.subject}
        
        ${data.message}
        
        Best regards,
        The Support Team
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Thank You for Contacting Us</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 20px;">Best regards,<br>The Support Team</p>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
