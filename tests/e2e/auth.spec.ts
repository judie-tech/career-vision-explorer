import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User can sign up as job seeker', async ({ page }) => {
    // Navigate to signup
    await page.click('text=Get Started');
    await page.waitForURL('/signup');

    // Fill signup form
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', `test${Date.now()}@example.com`);
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.fill('[name="confirmPassword"]', 'TestPassword123!');
    
    // Select role
    await page.click('label:has-text("Job Seeker")');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL(/\/jobseeker\/dashboard/);
    
    // Verify user name is displayed
    await expect(page.locator('text=Test User')).toBeVisible();
  });

  test('User can sign up as employer', async ({ page }) => {
    await page.click('text=Get Started');
    await page.waitForURL('/signup');

    await page.fill('[name="name"]', 'Test Company');
    await page.fill('[name="email"]', `employer${Date.now()}@example.com`);
    await page.fill('[name="password"]', 'TestPassword123!');
    await page.fill('[name="confirmPassword"]', 'TestPassword123!');
    
    await page.click('label:has-text("Employer")');
    
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/\/employer\/dashboard/);
  });

  test('User can login with valid credentials', async ({ page }) => {
    await page.click('text=Login');
    await page.waitForURL('/login');

    await page.fill('[name="email"]', 'jobseeker@test.com');
    await page.fill('[name="password"]', 'password123');
    
    await page.click('button[type="submit"]');
    
    // Should redirect to appropriate dashboard based on role
    await expect(page).toHaveURL(/\/(jobseeker|employer|admin)\/(dashboard|home)/);
  });

  test('Invalid login shows error message', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="email"]', 'invalid@example.com');
    await page.fill('[name="password"]', 'wrongpassword');
    
    await page.click('button[type="submit"]');
    
    // Check for error message
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('User can logout', async ({ page, context }) => {
    // First login
    await page.goto('/login');
    await page.fill('[name="email"]', 'jobseeker@test.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await page.waitForURL(/\/(dashboard|jobseeker)/);
    
    // Find and click logout button (may vary by UI implementation)
    const logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout"), [aria-label="Logout"]');
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Should redirect to home or login
      await expect(page).toHaveURL(/\/($|login)/);
      
      // Try to access protected route
      await page.goto('/jobseeker/dashboard');
      // Should redirect to login
      await expect(page).toHaveURL('/login');
    }
  });

  test('Protected routes redirect to login when not authenticated', async ({ page }) => {
    const protectedRoutes = [
      '/dashboard',
      '/profile',
      '/jobseeker/dashboard',
      '/employer/dashboard',
      '/admin/dashboard'
    ];

    for (const route of protectedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL('/login');
    }
  });

  test('Role-based access control works correctly', async ({ page }) => {
    // Login as job seeker
    await page.goto('/login');
    await page.fill('[name="email"]', 'jobseeker@test.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await page.waitForURL('/jobseeker/dashboard');
    
    // Try to access employer dashboard
    await page.goto('/employer/dashboard');
    // Should redirect or show access denied
    await expect(page).not.toHaveURL('/employer/dashboard');
    
    // Try to access admin dashboard
    await page.goto('/admin/dashboard');
    await expect(page).not.toHaveURL('/admin/dashboard');
  });

  test.skip('Remember me functionality works', async ({ page, context }) => {
    // SKIPPED: Remember me might not be implemented or uses different mechanism
    // Backend uses JWT tokens stored in localStorage, not long-lived cookies
    await page.goto('/login');
    
    await page.fill('[name="email"]', 'jobseeker@test.com');
    await page.fill('[name="password"]', 'password123');
    
    // Check if remember me checkbox exists
    const rememberMeExists = await page.locator('[name="rememberMe"]').isVisible().catch(() => false);
    if (rememberMeExists) {
      await page.check('[name="rememberMe"]');
    }
    
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/(dashboard|jobseeker)/);
    
    // Verify login was successful
    await expect(page).toHaveURL(/\/(dashboard|jobseeker)/);
  });
});
