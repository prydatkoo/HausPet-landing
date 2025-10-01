import { getPermanentSubmissions } from './permanent-storage.mjs';
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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

  try {
    const { emailData } = req.body;
    
    if (!emailData) {
      return res.status(400).json({
        success: false,
        message: 'No email data provided. Please provide email content containing form submissions.',
        instructions: [
          '1. Go to your email inbox (where HausPet submissions are sent)',
          '2. Find emails with subject containing "HausPet" or "Early Access" or "Pre-order"',
          '3. Copy the email content/body',
          '4. Paste it in the emailData field',
          '5. The system will extract form data from email content'
        ]
      });
    }

    console.log('📧 Attempting to recover submissions from email content...');
    
    // Step 1: Parse emails to get recovered submissions
    const recoveredSubmissions = [];
    const emailSections = emailData.split(/(?:Subject:|From:|To:|Date:|---)/i);
    
    for (const section of emailSections) {
      try {
        const submission = extractSubmissionFromEmail(section);
        if (submission) {
          recoveredSubmissions.push(submission);
        }
      } catch (error) {
        console.log('⚠️ Could not parse section:', error.message);
      }
    }

    console.log(`📊 Found ${recoveredSubmissions.length} potential submissions in emails`);

    if (recoveredSubmissions.length === 0) {
        return res.status(200).json({
            success: true,
            message: 'No new submissions found in the provided email content.',
            data: {
                submissions: [],
                count: 0,
                newCount: 0
            }
        });
    }

    // Step 2: Get current submissions from permanent storage
    const { submissions: existingSubmissions } = await getPermanentSubmissions();
    const existingSubmissionEmails = new Set(existingSubmissions.map(s => s.email.toLowerCase()));

    // Step 3: Filter out duplicates based on email
    const newUniqueSubmissions = recoveredSubmissions.filter(rec => {
        return !existingSubmissionEmails.has(rec.email.toLowerCase());
    });

    console.log(`✨ Found ${newUniqueSubmissions.length} new, unique submissions to add from emails.`);

    if (newUniqueSubmissions.length === 0) {
        return res.status(200).json({
            success: true,
            message: 'Recovery complete. All submissions from the email content were already in the database.',
            data: {
                submissions: existingSubmissions,
                count: existingSubmissions.length,
                newCount: 0
            }
        });
    }

    // Step 4: Combine and save back to permanent storage
    const combinedSubmissions = [...existingSubmissions, ...newUniqueSubmissions];

    if (kv) {
        await kv.set('hauspet_submissions', combinedSubmissions);
        console.log(`✅ Permanently saved ${newUniqueSubmissions.length} new submissions from email to Vercel KV.`);
    } else {
        return res.status(200).json({
            success: true,
            message: `Successfully recovered ${recoveredSubmissions.length} submissions. WARNING: Vercel KV not available, data cannot be saved permanently.`,
            data: {
                submissions: combinedSubmissions,
                count: combinedSubmissions.length,
                newCount: newUniqueSubmissions.length,
            }
        });
    }
    
    return res.status(200).json({
      success: true,
      message: `Successfully recovered and permanently saved ${newUniqueSubmissions.length} new submissions from email content`,
      data: {
        submissions: combinedSubmissions,
        count: combinedSubmissions.length,
        newCount: newUniqueSubmissions.length,
      }
    });

  } catch (error) {
    console.error('❌ Error recovering submissions from emails:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to recover submissions from email content',
      error: error.message
    });
  }
}

function extractSubmissionFromEmail(emailContent) {
  const submission = {
    id: Date.now() + Math.random(),
    date: new Date().toISOString(),
    type: 'early-access',
    language: 'EN'
  };

  const nameMatch = emailContent.match(/(?:Name|Full Name):\s*([^\n\r]+)/i);
  if (nameMatch) submission.name = nameMatch[1].trim();

  const emailMatch = emailContent.match(/(?:Email|E-mail):\s*([^\s\n\r]+@[^\s\n\r]+)/i);
  if (emailMatch) submission.email = emailMatch[1].trim();

  const phoneMatch = emailContent.match(/(?:Phone|Phone Number|Telephone):\s*([^\n\r]+)/i);
  if (phoneMatch) submission.phone = phoneMatch[1].trim();

  const petTypeMatch = emailContent.match(/(?:Pet Type|Pet|Animal):\s*([^\n\r]+)/i);
  if (petTypeMatch) submission.petType = petTypeMatch[1].trim();

  const petNameMatch = emailContent.match(/(?:Pet Name|Pet's Name):\s*([^\n\r]+)/i);
  if (petNameMatch) submission.petName = petNameMatch[1].trim();

  const messageMatch = emailContent.match(/(?:Message|Comments|Additional Info):\s*([^\n\r]+(?:\n[^\n\r]+)*)/i);
  if (messageMatch) submission.message = messageMatch[1].trim();

  const collarMatch = emailContent.match(/(?:Collar Size|Size):\s*([^\n\r]+)/i);
  if (collarMatch) submission.collarSize = collarMatch[1].trim();

  const addressMatch = emailContent.match(/(?:Address|Shipping Address):\s*([^\n\r]+(?:\n[^\n\r]+)*)/i);
  if (addressMatch) submission.address = addressMatch[1].trim();

  const orderMatch = emailContent.match(/(?:Order|Order Number|Pre-order):\s*([^\n\r]+)/i);
  if (orderMatch) {
    submission.orderNumber = orderMatch[1].trim();
    submission.type = 'pre-order';
  }

  if (emailContent.toLowerCase().includes('pre-order') || emailContent.toLowerCase().includes('pre order')) {
    submission.type = 'pre-order';
  } else if (emailContent.toLowerCase().includes('contact') || emailContent.toLowerCase().includes('inquiry')) {
    submission.type = 'contact';
  }

  if (emailContent.toLowerCase().includes('hund') || 
      emailContent.toLowerCase().includes('katze') || 
      emailContent.toLowerCase().includes('nachricht') ||
      emailContent.toLowerCase().includes('größe')) {
    submission.language = 'DE';
  }

  if (submission.name && submission.email) {
    return {
      ...submission,
      phone: submission.phone || 'N/A',
      petType: submission.petType || 'Not specified',
      petName: submission.petName || '',
      message: submission.message || 'No message provided',
      address: submission.address || '',
      collarSize: submission.collarSize || '',
      orderNumber: submission.orderNumber || null
    };
  }

  return null;
}
