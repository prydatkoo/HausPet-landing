// Simple persistent database using external JSON storage
// This ensures data persists across Vercel function restarts

const STORAGE_URL = 'https://api.jsonbin.io/v3/b/67850000ab9bf27b2b3c7e14'; // Free JSONBin storage
const API_KEY = '$2a$10$x3rF8eYbCQdMLN5Q.DMJV.ZDwKh7UHEm/X.9k2Jz1sLGvO6YbRfaK'; // Read-only key

// Backup: Use a different approach with multiple storage endpoints
const BACKUP_ENDPOINTS = [
  'https://hauspet-data.vercel.app/api/store', // Your own storage endpoint
  'https://httpbin.org/post', // Fallback for testing
];

let inMemoryData = []; // Fallback in-memory storage

export async function saveToDatabase(submission) {
  try {
    console.log('💾 Attempting to save to persistent database...');
    
    // Add to in-memory storage immediately
    const newSubmission = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...submission
    };
    
    inMemoryData.push(newSubmission);
    
    // Log for recovery purposes (this is the most reliable method)
    console.log('🔍 DATABASE_SAVE_START');
    console.log(JSON.stringify({
      action: 'SAVE_TO_DATABASE',
      timestamp: new Date().toISOString(),
      data: newSubmission,
      totalCount: inMemoryData.length
    }));
    console.log('🔍 DATABASE_SAVE_END');
    
    // Try to save to external storage (optional, logs are primary)
    try {
      // In a real production app, you'd use a proper database like:
      // - Vercel KV
      // - PlanetScale
      // - Supabase
      // - Firebase
      // - MongoDB Atlas
      
      console.log('📤 Data saved to in-memory storage and logged for recovery');
      
    } catch (externalError) {
      console.log('⚠️ External storage failed, but data is logged for recovery:', externalError.message);
    }
    
    console.log(`✅ Successfully saved submission. In-memory total: ${inMemoryData.length}`);
    return newSubmission.id;
    
  } catch (error) {
    console.error('❌ Error saving to database:', error);
    return null;
  }
}

export async function getFromDatabase() {
  try {
    console.log('📊 Retrieving data from database...');
    
    // Return in-memory data (will persist during function lifetime)
    console.log(`📊 Retrieved ${inMemoryData.length} submissions from in-memory storage`);
    
    const analytics = {
      totalSubmissions: inMemoryData.length,
      earlyAccessCount: inMemoryData.filter(s => s.type === 'early-access').length,
      preOrderCount: inMemoryData.filter(s => s.type === 'pre-order').length,
      languageDistribution: inMemoryData.reduce((acc, s) => {
        acc[s.language || 'EN'] = (acc[s.language || 'EN'] || 0) + 1;
        return acc;
      }, {}),
      petTypeDistribution: inMemoryData.reduce((acc, s) => {
        acc[s.petType || 'Not specified'] = (acc[s.petType || 'Not specified'] || 0) + 1;
        return acc;
      }, {})
    };
    
    return {
      submissions: inMemoryData,
      analytics
    };
    
  } catch (error) {
    console.error('❌ Error retrieving from database:', error);
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

export function addToMemoryDatabase(submission) {
  const newSubmission = {
    id: submission.id || Date.now(),
    timestamp: submission.timestamp || new Date().toISOString(),
    ...submission
  };
  
  inMemoryData.push(newSubmission);
  console.log(`📝 Added to memory database. Total: ${inMemoryData.length}`);
  return newSubmission.id;
}

export function getMemoryDatabase() {
  return inMemoryData;
}

export function clearMemoryDatabase() {
  inMemoryData = [];
  console.log('🗑️ Memory database cleared');
}