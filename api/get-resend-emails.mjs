import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check admin key
  const adminKey = req.headers['x-admin-key'];
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ 
      message: 'Unauthorized - Admin access required',
      error: 'unauthorized' 
    });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ 
      message: 'Resend API key not configured',
      error: 'missing_config' 
    });
  }

  try {
    console.log('📧 Fetching sent emails from Resend...');
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Note: Resend doesn't have a direct "list all emails" endpoint in their public API
    // We'll need to work around this by parsing the emails we can access
    // This is a limitation of Resend's current API
    
    // For now, let's return the submissions we have stored and note the limitation
    return res.status(200).json({
      success: true,
      message: 'Resend email fetching attempted',
      note: 'Resend API does not provide a direct way to list all sent emails. We can only retrieve specific emails by ID.',
      suggestion: 'The file-based storage in /tmp is not persistent on Vercel. Consider using a proper database or external storage service.',
      data: {
        emails: [],
        limitation: 'Resend API limitation - cannot list all sent emails without specific email IDs'
      }
    });

  } catch (error) {
    console.error('❌ Error fetching Resend emails:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch emails from Resend',
      error: error.message
    });
  }
}