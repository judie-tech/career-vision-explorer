import { chromium, FullConfig } from '@playwright/test';

/**
 * Global Setup - Shared Authentication
 * 
 * This setup runs once before all tests to create authenticated sessions.
 * Saves authentication state to files that tests can reuse, eliminating
 * the need to login in every test.
 */
async function globalSetup(config: FullConfig) {
  const baseURL = 'http://localhost:5173';
  
  // Create browser instance
  const browser = await chromium.launch({ headless: true });
  
  try {
    // ==================== Employer Authentication ====================
    console.log('Setting up employer authentication...');
    const employerContext = await browser.newContext({ 
      baseURL,
      viewport: { width: 1920, height: 1080 }
    });
    const employerPage = await employerContext.newPage();
    
    // Enable console logging for debugging
    employerPage.on('console', msg => console.log('EMPLOYER PAGE:', msg.text()));
    
    // Navigate to login page
    await employerPage.goto('/login', { waitUntil: 'networkidle' });
    console.log('Employer: Navigated to login page');
    
    // Wait for form to load with extended timeout
    await employerPage.waitForSelector('input[placeholder="john@example.com"]', { timeout: 30000 });
    console.log('Employer: Login form loaded');
    
    // Fill login credentials
    await employerPage.fill('input[placeholder="john@example.com"]', 'employer@test.com');
    await employerPage.fill('input[type="password"]', 'password123');
    console.log('Employer: Credentials filled');
    
    // Submit login and wait for navigation
    await Promise.all([
      employerPage.waitForURL(/\/(employer\/dashboard|dashboard)/, { timeout: 30000 }),
      employerPage.click('button[type="submit"]:has-text("Log In")')
    ]);
    console.log('Employer: Login successful, URL:', employerPage.url());
    
    // Wait a bit for any additional state to settle
    await employerPage.waitForTimeout(2000);
    
    // Verify localStorage has tokens
    const employerTokens = await employerPage.evaluate(() => {
      return {
        access_token: localStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token'),
        user: localStorage.getItem('user')
      };
    });
    
    if (!employerTokens.access_token) {
      throw new Error('Employer authentication failed: No access token in localStorage');
    }
    console.log('Employer: Tokens verified in localStorage');
    
    // Save authentication state
    await employerContext.storageState({ path: 'tests/.auth/employer.json' });
    await employerContext.close();
    console.log('✓ Employer authentication saved to: tests/.auth/employer.json');
    
    // ==================== Job Seeker Authentication ====================
    console.log('\nSetting up job seeker authentication...');
    const jobseekerContext = await browser.newContext({ 
      baseURL,
      viewport: { width: 1920, height: 1080 }
    });
    const jobseekerPage = await jobseekerContext.newPage();
    
    // Enable console logging for debugging
    jobseekerPage.on('console', msg => console.log('JOBSEEKER PAGE:', msg.text()));
    
    // Navigate to login page
    await jobseekerPage.goto('/login', { waitUntil: 'networkidle' });
    console.log('Job Seeker: Navigated to login page');
    
    // Wait for form to load with extended timeout
    await jobseekerPage.waitForSelector('input[placeholder="john@example.com"]', { timeout: 30000 });
    console.log('Job Seeker: Login form loaded');
    
    // Fill login credentials
    await jobseekerPage.fill('input[placeholder="john@example.com"]', 'jobseeker@test.com');
    await jobseekerPage.fill('input[type="password"]', 'password123');
    console.log('Job Seeker: Credentials filled');
    
    // Submit login and wait for navigation
    await Promise.all([
      jobseekerPage.waitForURL(/\/(jobseeker\/dashboard|dashboard)/, { timeout: 30000 }),
      jobseekerPage.click('button[type="submit"]:has-text("Log In")')
    ]);
    console.log('Job Seeker: Login successful, URL:', jobseekerPage.url());
    
    // Wait a bit for any additional state to settle
    await jobseekerPage.waitForTimeout(2000);
    
    // Verify localStorage has tokens
    const jobseekerTokens = await jobseekerPage.evaluate(() => {
      return {
        access_token: localStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token'),
        user: localStorage.getItem('user')
      };
    });
    
    if (!jobseekerTokens.access_token) {
      throw new Error('Job Seeker authentication failed: No access token in localStorage');
    }
    console.log('Job Seeker: Tokens verified in localStorage');
    
    // Save authentication state
    await jobseekerContext.storageState({ path: 'tests/.auth/jobseeker.json' });
    await jobseekerContext.close();
    console.log('✓ Job seeker authentication saved to: tests/.auth/jobseeker.json');
    
    console.log('\n✅ Global setup completed successfully');
    
  } catch (error) {
    console.error('\n❌ Global setup failed:', error);
    console.error('Make sure:');
    console.error('  1. The dev server is running on', baseURL);
    console.error('  2. Test users exist: employer@test.com and jobseeker@test.com');
    console.error('  3. User passwords are: password123');
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
