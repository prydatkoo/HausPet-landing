import { Resend } from 'resend';
import { savePermanently } from './permanent-storage.mjs';

function logSubmissionForRecovery(submissionData) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    type: 'FORM_SUBMISSION',
    data: submissionData
  };
  
  console.log('🔍 SUBMISSION_LOG_START');
  console.log(JSON.stringify(logEntry));
  console.log('🔍 SUBMISSION_LOG_END');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      petType,
      petName,
      collarSize,
      address,
      message,
      type = 'early-access',
      orderNumber,
    } = req.body;

    // Enhanced validation
    if (!name || !email) {
      return res.status(400).json({
        message: 'Name and email are required',
        error: 'missing_required_fields',
      });
    }

    if (type === 'early-access' && !phone) {
      return res.status(400).json({
        message: 'Phone number is required for early access applications',
        error: 'missing_phone',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email address',
        error: 'invalid_email',
      });
    }

    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(name.trim())) {
      return res.status(400).json({
        message: 'Please enter a valid name (2-50 characters, letters only)',
        error: 'invalid_name',
      });
    }

    if (phone) {
      const phoneRegex = /^[+]?[0-9\s-()]{7,20}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          message: 'Please enter a valid phone number',
          error: 'invalid_phone',
        });
      }
    }

    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type,
      orderNumber: orderNumber || null,
      name,
      email,
      phone: phone || '',
      petType: petType || '',
      petName: petName || '',
      collarSize: collarSize || '',
      address: address || '',
      message: message || '',
    };

    console.log(`🎉 New HausPet ${type} submission:`, submission);
    logSubmissionForRecovery(submission);

    const submissionId = await savePermanently(submission);
    if (!submissionId) {
      console.log('❌ Failed to save to permanent storage');
      return res.status(500).json({
        success: false,
        message: 'Failed to save submission. Please try again.',
        error: 'storage_failed'
      });
    }
    console.log(`✅ Submission permanently saved with ID: ${submissionId}`);

    if (process.env.RESEND_API_KEY) {
      console.log('✅ RESEND_API_KEY found, initializing email service...');
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        if (type === 'early-access') {
          await resend.emails.send({
            from: 'HausPet <hello@hauspet.net>',
            to: [email],
            subject: 'Willkommen beim HausPet Early Access Programm! / Welcome to HausPet Early Access Program! 🐾',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 28px;">🐾 HausPet</h1>
                  <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">AI-Powered Smart Collar</p>
                </div>
                <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 10px 10px;">
                  <h2 style="color: #333; margin-bottom: 20px;">Vielen Dank für Ihre Teilnahme am Early Access Programm!</h2>
                  <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Hallo ${name},</p>
                  <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Wir freuen uns, Sie an Bord zu haben! Ihre Bewerbung wurde erhalten und unser Team wird sie in Kürze prüfen.</p>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                    <h3 style="color: #333; margin: 0 0 10px 0;">Ihre Bewerbungsdetails:</h3>
                    <p style="color: #666; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="color: #666; margin: 5px 0;"><strong>E-Mail:</strong> ${email}</p>
                    ${phone ? `<p style="color: #666; margin: 5px 0;"><strong>Telefon:</strong> ${phone}</p>`: ''}
                    ${petType ? `<p style="color: #666; margin: 5px 0;"><strong>Haustierart:</strong> ${petType}</p>`: ''}
                  </div>
                  <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Wir werden Sie über den Fortschritt Ihres Antrags und exklusive Vorbestellungsmöglichkeiten auf dem Laufenden halten.</p>
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                    <h3 style="color: white; margin: 0 0 10px 0;">🚀 Vorbestellung verfügbar!</h3>
                    <p style="color: white; margin: 0 0 15px 0;">Sichern Sie sich €45 Rabatt + 3 Monate kostenlose KI-Abonnement für die ersten 100 Kunden!</p>
                    <a href="https://www.hauspet.net/pre-order" style="background: white; color: #667eea; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Jetzt Vorbestellen</a>
                  </div>
                  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                  <h2 style="color: #333; margin-bottom: 20px;">Thank you for joining the HausPet Early Access Program!</h2>
                  <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Hello ${name},</p>
                  <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">We're excited to have you on board! Your application has been received and our team will review it shortly.</p>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                    <h3 style="color: #333; margin: 0 0 10px 0;">Your Application Details:</h3>
                    <p style="color: #666; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="color: #666; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                    ${phone ? `<p style="color: #666; margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
                    ${petType ? `<p style="color: #666; margin: 5px 0;"><strong>Pet Type:</strong> ${petType}</p>` : ''}
                  </div>
                  <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">We'll keep you updated on your application progress and exclusive pre-order opportunities.</p>
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                    <h3 style="color: white; margin: 0 0 10px 0;">🚀 Pre-Order Available!</h3>
                    <p style="color: white; margin: 0 0 15px 0;">Get €45 off + 3 months free AI subscription for the first 100 customers!</p>
                    <a href="https://www.hauspet.net/pre-order" style="background: white; color: #667eea; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Pre-Order Now</a>
                  </div>
                  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p style="color: #666; font-size: 14px; margin: 0;">Best regards,<br>The HausPet Team<br><a href="mailto:hello@hauspet.net" style="color: #667eea;">hello@hauspet.net</a></p>
                  </div>
                </div>
              </div>
            `,
          });
          console.log('✅ Early access confirmation email sent to user');

          await resend.emails.send({
            from: 'HausPet <hello@hauspet.net>',
            to: ['hello@hauspet.net'],
            subject: '🐾 New Early Access Application - Neue Early Access Bewerbung',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                 <h1 style="color: #333;">New Early Access Application</h1>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Phone:</strong> ${phone}</p>
                 <p><strong>Pet Type:</strong> ${petType}</p>
                 <p><strong>Message:</strong> ${message}</p>
              </div>
            `,
          });
          console.log('✅ Admin notification email sent');

        } else if (type === 'pre-order') {
          await resend.emails.send({
            from: 'HausPet <hello@hauspet.net>',
            to: [email],
            subject: `🎉 Vorbestellung bestätigt! / Pre-order confirmed! - ${orderNumber}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 28px;">🐾 HausPet</h1>
                  <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Pre-Order Confirmation</p>
                </div>
                <div style="padding: 30px; background: #f8f9fa; border-radius: 0 0 10px 10px;">
                  <h2 style="color: #333; margin-bottom: 20px;">Vielen Dank für Ihre Vorbestellung!</h2>
                  <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Hallo ${name},</p>
                  <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Ihre Vorbestellung wurde erfolgreich aufgenommen! Sie sind unter den ersten 100 Kunden und erhalten €45 Rabatt + 3 Monate kostenlose KI-Abonnement.</p>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                    <h3 style="color: #333; margin: 0 0 10px 0;">Ihre Bestelldetails:</h3>
                    <p style="color: #666; margin: 5px 0;"><strong>Bestellnummer:</strong> ${orderNumber}</p>
                    <p style="color: #666; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="color: #666; margin: 5px 0;"><strong>E-Mail:</strong> ${email}</p>
                  </div>
                  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p style="color: #666; font-size: 14px; margin: 0;">Best regards,<br>The HausPet Team<br><a href="mailto:hello@hauspet.net" style="color: #667eea;">hello@hauspet.net</a></p>
                  </div>
                </div>
              </div>
            `,
          });
          console.log('✅ Pre-order confirmation email sent to customer:', email);

          await resend.emails.send({
            from: 'HausPet <hello@hauspet.net>',
            to: ['hello@hauspet.net'],
            subject: `🐾 New Pre-Order - Neue Vorbestellung - ${orderNumber}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                 <h1 style="color: #333;">New Pre-Order Received</h1>
                 <p><strong>Order Number:</strong> ${orderNumber}</p>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Phone:</strong> ${phone}</p>
                 <p><strong>Pet Type:</strong> ${petType}</p>
                 <p><strong>Pet Name:</strong> ${petName}</p>
                 <p><strong>Collar Size:</strong> ${collarSize}</p>
                 <p><strong>Address:</strong> ${address}</p>
                 <p><strong>Message:</strong> ${message}</p>
              </div>
            `,
          });
          console.log('✅ Admin notification email sent for pre-order');
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        return res.status(500).json({
          message: 'Form submitted but email could not be sent. Please check your email address and try again.',
          error: 'email_send_failed',
          type,
          orderNumber: orderNumber || null,
        });
      }
    } else {
      console.log('❌ RESEND_API_KEY not found - email service not configured, skipping email sending');
    }

    return res.status(200).json({
      message: 'Submission successful',
      type,
      orderNumber: orderNumber || null,
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
}
