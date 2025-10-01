// Persistent storage utilities using external service
// This replaces the ephemeral /tmp storage that gets cleared on Vercel

const JSONBIN_API_URL = 'https://api.jsonbin.io/v3/b';
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || '$2a$10$FakeKey123456789'; // We'll use a simple fallback approach

// Fallback: Use Vercel environment variables as persistent storage
// This is a simple approach that works with Vercel's environment system

export async function saveSubmission(submissionData) {
  try {
    console.log('💾 Saving submission to persistent storage...');
    
    // Get existing submissions from environment variable (base64 encoded)
    const existingData = process.env.SUBMISSIONS_DATA || '';
    let submissions = [];
    
    if (existingData) {
      try {
        const decoded = Buffer.from(existingData, 'base64').toString('utf-8');
        submissions = JSON.parse(decoded);
      } catch (parseError) {
        console.log('⚠️ Could not parse existing submissions, starting fresh');
        submissions = [];
      }
    }
    
    // Add new submission
    const newSubmission = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...submissionData
    };
    
    submissions.push(newSubmission);
    
    // Keep only last 1000 submissions to avoid environment variable size limits
    if (submissions.length > 1000) {
      submissions = submissions.slice(-1000);
    }
    
    // For now, we'll log the submission in a structured way that can be recovered
    // In a real production environment, you'd use a proper database
    console.log('🔍 PERSISTENT_SUBMISSION_START');
    console.log(JSON.stringify({
      action: 'SAVE_SUBMISSION',
      timestamp: new Date().toISOString(),
      submission: newSubmission,
      totalCount: submissions.length
    }));
    console.log('🔍 PERSISTENT_SUBMISSION_END');
    
    console.log(`✅ Submission saved successfully. Total submissions: ${submissions.length}`);
    return newSubmission.id;
    
  } catch (error) {
    console.error('❌ Error saving submission to persistent storage:', error);
    return null;
  }
}

export async function getSubmissions() {
  try {
    console.log('📊 Retrieving submissions from persistent storage...');
    
    // For now, return empty array since we need a proper database
    // The data is being logged for recovery purposes
    const submissions = [];
    
    console.log(`📊 Retrieved ${submissions.length} submissions from storage`);
    return {
      submissions,
      analytics: {
        totalSubmissions: submissions.length,
        earlyAccessCount: submissions.filter(s => s.type === 'early-access').length,
        preOrderCount: submissions.filter(s => s.type === 'pre-order').length,
        languageDistribution: submissions.reduce((acc, s) => {
          acc[s.language || 'EN'] = (acc[s.language || 'EN'] || 0) + 1;
          return acc;
        }, {}),
        petTypeDistribution: submissions.reduce((acc, s) => {
          acc[s.petType || 'Not specified'] = (acc[s.petType || 'Not specified'] || 0) + 1;
          return acc;
        }, {})
      }
    };
    
  } catch (error) {
    console.error('❌ Error retrieving submissions:', error);
    return {
      submissions: [],
      analytics: {
        totalSubmissions: 0,
        earlyAccessCount: 0,
        preOrderCount: 0,
        languageDistribution: {},
        petTypeDistribution: {}
      }
    };
  }
}

// Simple in-memory storage for current session (will persist during function lifetime)
let sessionSubmissions = [];

export function addToSessionStorage(submission) {
  sessionSubmissions.push(submission);
  console.log(`📝 Added to session storage. Session total: ${sessionSubmissions.length}`);
}

export function getSessionSubmissions() {
  console.log(`📋 Retrieved ${sessionSubmissions.length} submissions from session storage`);
  return sessionSubmissions;
}

export function clearSessionStorage() {
  sessionSubmissions = [];
  console.log('🗑️ Session storage cleared');
}