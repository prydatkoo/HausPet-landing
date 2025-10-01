import { Resend } from 'resend';
import { getPermanentSubmissions } from './permanent-storage.mjs';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      message: 'Method not allowed',
      error: 'only_post_allowed' 
    });
  }

  try {
    const { selectedUserIds, subject, message, adminKey } = req.body;

    // Validate admin access
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({
        message: 'Unauthorized - Admin access required',
        error: 'unauthorized'
      });
    }

    // Validate required fields
    if (!selectedUserIds || !Array.isArray(selectedUserIds) || selectedUserIds.length === 0) {
      return res.status(400).json({
        message: 'No users selected',
        error: 'no_users_selected'
      });
    }

    if (!subject || !message) {
      return res.status(400).json({
        message: 'Subject and message are required',
        error: 'missing_email_content'
      });
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.log('❌ RESEND_API_KEY not configured - cannot send emails');
      return res.status(500).json({
        message: 'Email service not configured',
        error: 'email_service_not_configured'
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get submissions from our new permanent database
    const { submissions: allUsers } = await getPermanentSubmissions();

    // Filter users based on selected IDs
    const selectedUsers = allUsers.filter(user => selectedUserIds.includes(user.id));

    if (selectedUsers.length === 0) {
      return res.status(400).json({
        message: 'No valid users found for selected IDs',
        error: 'invalid_user_ids'
      });
    }

    console.log(`📧 Sending bulk email to ${selectedUsers.length} users...`);

    const emailResults = [];

    // Send emails to each selected user
    for (const user of selectedUsers) {
      try {
        const personalizedMessage = message.replace(/\{name\}/g, user.name);
        
        const emailData = await resend.emails.send({
          // Reverting to the correct, verified sender domain
          from: 'HausPet <hello@hauspet.net>', 
          to: [user.email],
          subject: subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #0ea5e9; margin: 0;">🐾 HausPet</h1>
                <p style="color: #666; margin: 5px 0 0 0;">Smart Pet Health Monitoring</p>
              </div>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="color: #334155; margin-top: 0;">${subject}</h2>
                <div style="color: #475569; line-height: 1.6;">
                  ${personalizedMessage.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                  Best regards,<br>
                  The HausPet Team
                </p>
                <p style="color: #94a3b8; font-size: 12px; margin-top: 15px;">
                  HausPet GmbH • Berlin, Germany<br>
                  <a href="mailto:hello@hauspet.net" style="color: #0ea5e9;">hello@hauspet.net</a>
                </p>
              </div>
            </div>
          `,
        });

        emailResults.push({
          userId: user.id,
          email: user.email,
          success: true,
          emailId: emailData.data.id
        });

        console.log(`✅ Email sent to ${user.email} (ID: ${emailData.data.id})`);

      } catch (emailError) {
        console.error(`❌ Failed to send email to ${user.email}:`, emailError);
        emailResults.push({
          userId: user.id,
          email: user.email,
          success: false,
          error: emailError.message
        });
      }
    }

    const successCount = emailResults.filter(r => r.success).length;
    const failureCount = emailResults.length - successCount;

    console.log(`📊 Bulk email results: ${successCount} sent, ${failureCount} failed`);

    return res.status(200).json({
      success: true,
      message: `Emails sent successfully to ${successCount} out of ${emailResults.length} users`,
      data: {
        totalSent: successCount,
        totalFailed: failureCount,
        results: emailResults
      }
    });

  } catch (error) {
    console.error('❌ Bulk email error:', error);
    
    return res.status(500).json({
      message: 'Internal server error while sending emails',
      error: 'bulk_email_failed'
    });
  }
}
