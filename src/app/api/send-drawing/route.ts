import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { image, senderName } = await request.json()

    if (!image) {
      return NextResponse.json({ error: 'No image data provided' }, { status: 400 })
    }

    // Detect format from data URI
    const isJpeg = image.startsWith('data:image/jpeg')
    const ext = isJpeg ? 'jpg' : 'png'

    // Strip the data URL prefix to get raw base64
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.error('Missing SMTP_EMAIL or SMTP_PASSWORD env vars')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.SMTP_EMAIL

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports (like 587)
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Verify connection first
    await transporter.verify()

    await transporter.sendMail({
      from: `"Aymon Website" <${process.env.SMTP_EMAIL}>`,
      to: recipientEmail,
      subject: `Visual Message${senderName ? ` from ${senderName}` : ''} — aymon.work`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #005240;">New Visual Message</h2>
          ${senderName ? `<p style="color: #555;">From: <strong>${senderName}</strong></p>` : ''}
          <p style="color: #555;">Someone sent you a visual message from your website.</p>
          <img src="cid:drawing" style="max-width: 100%; border: 1px solid #ddd; border-radius: 8px;" />
        </div>
      `,
      attachments: [
        {
          filename: `visual-message.${ext}`,
          content: base64Data,
          encoding: 'base64',
          cid: 'drawing',
        },
      ],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    const message = error instanceof Error ? error.message : 'Failed to send message'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
