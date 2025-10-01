import { getPermanentSubmissions } from './permanent-storage.mjs';
// We need direct access to the kv object to write back the merged list
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
    const { logData } = req.body;
    
    if (!logData) {
      return res.status(400).json({
        success: false,
        message: 'No log data provided. Please provide Vercel logs containing SUBMISSION_LOG entries.',
        instructions: [
          '1. Go to your Vercel dashboard',
          '2. Navigate to your project',
          '3. Go to Functions tab',
          '4. Find the submit-form function logs',
          '5. Copy logs containing "SUBMISSION_LOG_START" and "SUBMISSION_LOG_END"',
          '6. Paste them in the logData field'
        ]
      });
    }

    console.log('🔍 Attempting to recover submissions from logs...');
    
    // Step 1: Parse logs to get recovered submissions
    const recoveredSubmissions = [];
    const lines = logData.split('\n');
    let capturing = false;
    let submissionData = '';
    
    for (const line of lines) {
      if (line.includes('🔍 SUBMISSION_LOG_START')) {
        capturing = true;
        submissionData = '';
        continue;
      }
      
      if (line.includes('🔍 SUBMISSION_LOG_END')) {
        if (capturing && submissionData) {
          try {
            const parsed = JSON.parse(submissionData);
            if (parsed.type === 'FORM_SUBMISSION' && parsed.data) {
              recoveredSubmissions.push({
                id: parsed.data.id || Date.now(),
                name: parsed.data.name,
                email: parsed.data.email,
                phone: parsed.data.phone || 'N/A',
                petType: parsed.data.petType || 'Not specified',
                petName: parsed.data.petName || '',
                message: parsed.data.message || 'No message provided',
                date: parsed.timestamp || parsed.data.timestamp || new Date().toISOString(),
                type: parsed.data.type || 'early-access',
                language: parsed.data.language || 'EN',
                orderNumber: parsed.data.orderNumber || null,
                address: parsed.data.address || '',
                collarSize: parsed.data.collarSize || ''
              });
            }
          } catch (parseError) {
            console.error('❌ Error parsing submission log:', parseError);
          }
        }
        capturing = false;
        submissionData = '';
        continue;
      }
      
      if (capturing) {
        // This regex removes the timestamp and deployment ID from the log line
        const cleanLine = line.replace(/^[\d-T:Z\s]+[a-zA-Z0-9-]+\s*/, '');
        submissionData += cleanLine;
      }
    }

    console.log(`📊 Found ${recoveredSubmissions.length} potential submissions in logs`);

    if (recoveredSubmissions.length === 0) {
        return res.status(200).json({
            success: true,
            message: 'No new submissions found in the provided logs.',
            data: {
                submissions: [],
                count: 0,
                newCount: 0
            }
        });
    }

    // Step 2: Get current submissions from permanent storage
    const { submissions: existingSubmissions } = await getPermanentSubmissions();
    const existingSubmissionIds = new Set(existingSubmissions.map(s => s.id));
    const existingSubmissionEmails = new Set(existingSubmissions.map(s => s.email.toLowerCase()));

    // Step 3: Filter out duplicates
    const newUniqueSubmissions = recoveredSubmissions.filter(rec => {
        // Check by ID and email to be safe
        const isDuplicateId = existingSubmissionIds.has(rec.id);
        const isDuplicateEmail = existingSubmissionEmails.has(rec.email.toLowerCase());
        return !isDuplicateId && !isDuplicateEmail;
    });

    console.log(`✨ Found ${newUniqueSubmissions.length} new, unique submissions to add.`);

    if (newUniqueSubmissions.length === 0) {
        return res.status(200).json({
            success: true,
            message: 'Recovery complete. All submissions from the logs were already in the database.',
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
        console.log(`✅ Permanently saved ${newUniqueSubmissions.length} new submissions to Vercel KV.`);
    } else {
        // If KV is not available, this recovery is temporary, as we can't guarantee saving.
        // We should let the user know.
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
      message: `Successfully recovered and permanently saved ${newUniqueSubmissions.length} new submissions`,
      data: {
        submissions: combinedSubmissions,
        count: combinedSubmissions.length,
        newCount: newUniqueSubmissions.length,
      }
    });

  } catch (error) {
    console.error('❌ Error recovering submissions:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to recover submissions from logs',
      error: error.message
    });
  }
}
