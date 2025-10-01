import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { getPermanentSubmissions } from './permanent-storage.mjs';

// Simple file-based storage for submissions
const SUBMISSIONS_FILE = '/tmp/submissions.json';

function getStoredSubmissions() {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('❌ Error reading submissions:', error);
    return [];
  }
}

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      message: 'Method not allowed',
      error: 'only_get_allowed' 
    });
  }

  try {
    // For now, since we don't have a database, we'll return the data that would be stored
    // In a real implementation, you would fetch this from your database
    
    // Check if this is an admin request (you might want to add authentication here)
    const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
    
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({
        message: 'Unauthorized - Admin access required',
        error: 'unauthorized'
      });
    }

    // Get real stored submissions
      console.log('📊 Fetching stored submissions from permanent storage...');
  
  // Get submissions from permanent database
  const databaseData = await getPermanentSubmissions();
  const storedSubmissions = databaseData.submissions;
    
    // Format the submissions for the admin panel
    const formattedSubmissions = storedSubmissions.map((submission, index) => ({
      id: submission.id || index + 1,
      name: submission.name,
      email: submission.email,
      phone: submission.phone || 'N/A',
      petType: submission.petType || 'Not specified',
      petName: submission.petName || '',
      message: submission.message || 'No message provided',
      date: submission.timestamp || submission.date || new Date().toISOString(),
      type: submission.type || 'early-access',
      language: submission.language || (submission.petType === 'Hund' || submission.petType === 'Katze' ? 'DE' : 'EN'),
      orderNumber: submission.orderNumber || null,
      address: submission.address || '',
      collarSize: submission.collarSize || ''
    }));
    
    console.log(`📊 Found ${formattedSubmissions.length} stored submissions`);
    
    const mockSubmissions = formattedSubmissions;

    // Use analytics from database
    const analytics = databaseData.analytics || {
      totalSubmissions: formattedSubmissions.length,
      earlyAccessCount: formattedSubmissions.filter(s => s.type === 'early-access').length,
      preOrderCount: formattedSubmissions.filter(s => s.type === 'pre-order').length,
      germanUsers: formattedSubmissions.filter(s => s.language === 'DE').length,
      englishUsers: formattedSubmissions.filter(s => s.language === 'EN').length,
      thisWeekCount: formattedSubmissions.filter(s => {
        const submissionDate = new Date(s.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return submissionDate >= weekAgo;
      }).length,
      petTypeBreakdown: {
        dogs: formattedSubmissions.filter(s => s.petType === 'Dog' || s.petType === 'Hund').length,
        cats: formattedSubmissions.filter(s => s.petType === 'Cat' || s.petType === 'Katze').length,
        others: formattedSubmissions.filter(s => s.petType === 'Other' || s.petType === 'Andere').length
      }
    };

    console.log('📊 Admin fetching submissions data...');

    return res.status(200).json({
      success: true,
      data: {
        submissions: mockSubmissions,
        analytics: analytics
      },
      message: 'Submissions data retrieved successfully'
    });

  } catch (error) {
    console.error('❌ Error fetching submissions:', error);
    
    return res.status(500).json({
      message: 'Internal server error while fetching submissions',
      error: 'fetch_submissions_failed'
    });
  }
}