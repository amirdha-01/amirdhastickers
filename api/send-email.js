import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, phone, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  // Email configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Email options
  const mailOptions = {
    from: `"${name}" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `New Contact Form: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Contact Form Submission</h2>
        
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;"><strong style="color: #374151;">Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong style="color: #374151;">Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
          <p style="margin: 10px 0;"><strong style="color: #374151;">Phone:</strong> <a href="tel:${phone}" style="color: #2563eb;">${phone}</a></p>
          <p style="margin: 10px 0;"><strong style="color: #374151;">Subject:</strong> ${subject}</p>
        </div>

        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0;"><strong style="color: #374151;">Message:</strong></p>
          <p style="margin: 0; white-space: pre-wrap; color: #1f2937;">${message}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #6b7280; font-size: 12px;">
          <p>This message was sent from the Amirdha Stickers contact form</p>
          <p>Website: Amirdha Stickers</p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}

---
This message was sent from the Amirdha Stickers contact form
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✉️ Email sent successfully from ${email}`);
    
    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message,
    });
  }
}
