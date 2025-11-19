import { test, expect } from '@playwright/test';

test.describe('Login Verification', () => {
  test('should successfully login as job seeker', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for form to load
    await page.waitForSelector('input[placeholder="john@example.com"]', { timeout: 60000 });
    
    // Take screenshot of login page for debugging
    await page.screenshot({ path: 'test-results/login-page.png' });
    
    // Fill in credentials using placeholder selectors
    await page.fill('input[placeholder="john@example.com"]', 'jobseeker@test.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Click login button
    await page.click('button[type="submit"]:has-text("Log In")');
    
    // Wait for redirect to dashboard
    await page.waitForURL(/.*dashboard/, { timeout: 60000 });
    
    // Verify we're on dashboard
    expect(page.url()).toContain('dashboard');
    
    // Take screenshot of dashboard
    await page.screenshot({ path: 'test-results/dashboard-after-login.png' });
  });

  test('should successfully login as employer', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for form to load
    await page.waitForSelector('input[placeholder="john@example.com"]', { timeout: 60000 });
    
    // Fill in credentials
    await page.fill('input[placeholder="john@example.com"]', 'employer@test.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Click login button
    await page.click('button[type="submit"]:has-text("Log In")');
    
    // Wait for redirect to dashboard
    await page.waitForURL(/.*dashboard/, { timeout: 60000 });
    
    // Verify we're on dashboard
    expect(page.url()).toContain('dashboard');
  });

  test('should display login page correctly', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for form to load
    await page.waitForSelector('input[placeholder="john@example.com"]', { timeout: 60000 });
    
    // Check that all login elements are visible
    await expect(page.locator('input[placeholder="john@example.com"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]:has-text("Log In")')).toBeVisible();
    
    // Check for "Sign up" link (use more specific selector to avoid duplicate match)
    await expect(page.locator('main a[href="/signup"]:has-text("Sign up")')).toBeVisible();
  });
});
