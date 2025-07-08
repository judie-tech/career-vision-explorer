#!/usr/bin/env node

/**
 * Cleanup script to remove duplicate files in the frontend
 * Run with: node cleanup-duplicates.js
 */

const fs = require('fs');
const path = require('path');

const duplicatesToRemove = [
  // Deprecated core hooks (keeping main hooks in src/hooks/)
  'src/core/hooks/use-admin-jobs.tsx',
  'src/core/hooks/use-admin-skills.tsx',
  'src/core/hooks/use-applicants.tsx',
  'src/core/hooks/use-auth.tsx',
  
  // Duplicate route files (keeping main routes in src/routes/)
  'src/core/routes/AppRoutes.tsx',
  
  // Any other identified duplicates
];

console.log('🧹 Starting cleanup of duplicate files...\n');

duplicatesToRemove.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`✅ Removed: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error removing ${filePath}:`, error.message);
    }
  } else {
    console.log(`⏭️  Skipped (not found): ${filePath}`);
  }
});

// Check if core directories are empty and remove them
const coreHooksDir = path.join(__dirname, 'src/core/hooks');
const coreRoutesDir = path.join(__dirname, 'src/core/routes');

[coreHooksDir, coreRoutesDir].forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    if (files.length === 0) {
      fs.rmdirSync(dir);
      console.log(`📁 Removed empty directory: ${dir}`);
    }
  }
});

console.log('\n✨ Cleanup completed!');
console.log('\nNext steps:');
console.log('1. Update any imports that referenced the removed files');
console.log('2. Test the application to ensure everything works correctly');
console.log('3. Commit these changes to version control');