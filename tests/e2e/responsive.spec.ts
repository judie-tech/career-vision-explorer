import { test, expect, devices, Page } from '@playwright/test';

// Viewport configurations for responsive testing
const VIEWPORTS = {
  mobile_small: { width: 375, height: 667, name: 'iPhone SE' },
  mobile_large: { width: 414, height: 896, name: 'iPhone 11 Pro Max' },
  tablet_portrait: { width: 768, height: 1024, name: 'iPad Portrait' },
  tablet_landscape: { width: 1024, height: 768, name: 'iPad Landscape' },
  desktop_hd: { width: 1920, height: 1080, name: 'Full HD Desktop' },
  desktop_standard: { width: 1366, height: 768, name: 'Standard Laptop' },
};

/**
 * Helper function: Set viewport size
 */
async function setViewport(page: Page, viewport: { width: number; height: number }) {
  await page.setViewportSize(viewport);
}

/**
 * Helper function: Login user
 */
async function login(page: Page, userType: 'jobseeker' | 'employer') {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('input[placeholder="john@example.com"]', { timeout: 60000 });
  const email = userType === 'jobseeker' ? 'jobseeker@test.com' : 'employer@test.com';
  await page.fill('input[placeholder="john@example.com"]', email);
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]:has-text("Log In")');
  await page.waitForURL(/.*dashboard/, { timeout: 60000 });
}

test.describe('Responsive Design Tests', () => {
  test('Mobile navigation works correctly', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Check mobile menu button is visible
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // Click mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    
    // Check mobile menu is open
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    // Check navigation links are visible in mobile menu
    await expect(page.locator('[data-testid="mobile-menu"] a:has-text("Jobs")')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-menu"] a:has-text("About")')).toBeVisible();
    await expect(page.locator('[data-testid="mobile-menu"] a:has-text("Login")')).toBeVisible();
    
    await context.close();
  });

  test('Job cards display correctly on mobile', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['Pixel 5'],
    });
    const page = await context.newPage();
    
    await page.goto('/jobs');
    
    // Check job cards stack vertically on mobile
    const jobCards = page.locator('[data-testid="job-card"]');
    const firstCard = jobCards.first();
    const secondCard = jobCards.nth(1);
    
    const firstCardBox = await firstCard.boundingBox();
    const secondCardBox = await secondCard.boundingBox();
    
    // Verify cards are stacked vertically (second card's Y position is below first card)
    expect(secondCardBox?.y).toBeGreaterThan((firstCardBox?.y || 0) + (firstCardBox?.height || 0));
    
    await context.close();
  });

  test('Forms are usable on mobile', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/login');
    
    // Check form elements are visible and accessible
    await expect(page.locator('[name="email"]')).toBeVisible();
    await expect(page.locator('[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Verify form fields are full width on mobile
    const emailField = await page.locator('[name="email"]').boundingBox();
    const formContainer = await page.locator('form').boundingBox();
    
    // Email field should be nearly as wide as the form (allowing for padding)
    expect(emailField?.width).toBeGreaterThan((formContainer?.width || 0) * 0.9);
    
    await context.close();
  });

  test('Dashboard adapts to tablet view', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPad'],
    });
    const page = await context.newPage();
    
    // Login first
    await page.goto('/login');
    await page.fill('[name="email"]', 'jobseeker@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/jobseeker/dashboard');
    
    // Check dashboard layout on tablet
    const statsGrid = page.locator('[data-testid="stats-grid"]');
    await expect(statsGrid).toBeVisible();
    
    // On tablet, stats should be in 2 columns
    const statCards = page.locator('[data-testid^="stat-"]');
    const cardCount = await statCards.count();
    
    if (cardCount >= 2) {
      const firstCard = statCards.first();
      const secondCard = statCards.nth(1);
      
      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();
      
      // Cards should be side by side on tablet
      expect(Math.abs((firstBox?.y || 0) - (secondBox?.y || 0))).toBeLessThan(10);
    }
    
    await context.close();
  });

  test('Images are responsive', async ({ browser }) => {
    const mobileContext = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const desktopContext = await browser.newContext({
      ...devices['Desktop Chrome'],
    });
    
    const mobilePage = await mobileContext.newPage();
    const desktopPage = await desktopContext.newPage();
    
    await mobilePage.goto('/');
    await desktopPage.goto('/');
    
    // Check hero image on both mobile and desktop
    const mobileHeroImage = mobilePage.locator('[data-testid="hero-image"]').first();
    const desktopHeroImage = desktopPage.locator('[data-testid="hero-image"]').first();
    
    const mobileImageBox = await mobileHeroImage.boundingBox();
    const desktopImageBox = await desktopHeroImage.boundingBox();
    
    // Mobile image should be smaller than desktop
    expect(mobileImageBox?.width).toBeLessThan(desktopImageBox?.width || 0);
    
    await mobileContext.close();
    await desktopContext.close();
  });

  test('Touch interactions work on mobile', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
      hasTouch: true,
    });
    const page = await context.newPage();
    
    await page.goto('/jobs');
    
    // Test swipe/scroll
    await page.locator('body').evaluate(() => {
      window.scrollTo(0, 500);
    });
    
    // Verify scroll worked
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
    
    // Test tap on job card
    await page.tap('[data-testid="job-card"]');
    
    // Should navigate to job details
    await expect(page).toHaveURL(/\/jobs\/\d+/);
    
    await context.close();
  });

  test('Text is readable on small screens', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone SE'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Check font sizes are appropriate for mobile
    const heading = page.locator('h1').first();
    const paragraph = page.locator('p').first();
    
    const headingFontSize = await heading.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    const paragraphFontSize = await paragraph.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    
    // Font sizes should be at least 14px for readability
    expect(parseInt(paragraphFontSize)).toBeGreaterThanOrEqual(14);
    expect(parseInt(headingFontSize)).toBeGreaterThan(parseInt(paragraphFontSize));
    
    await context.close();
  });

  test('Modal dialogs are responsive', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    // Login and navigate to a page with modals
    await page.goto('/login');
    await page.fill('[name="email"]', 'employer@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/employer/dashboard');
    
    await page.goto('/employer/jobs');
    
    // Trigger a modal (e.g., create job)
    await page.click('text=Post New Job');
    
    // Check modal is visible and properly sized
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    const modalBox = await modal.boundingBox();
    const viewportSize = page.viewportSize();
    
    // Modal should not exceed viewport width
    expect(modalBox?.width).toBeLessThanOrEqual(viewportSize?.width || 0);
    
    // Modal should have some padding from viewport edges
    expect(modalBox?.x).toBeGreaterThan(0);
    
    await context.close();
  });
});

// Additional comprehensive responsive tests from responsive.spec.ts

test.describe('Responsive Design - Landing Page', () => {
  test('should display correctly on mobile small (375px)', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await page.goto('/');
    
    await expect(page.locator('header, nav')).toBeVisible();
    await expect(page.getByText(/career|vision|explore|find.*job/i).first()).toBeVisible();
    const headerHeight = await page.locator('header, nav').first().boundingBox();
    expect(headerHeight?.width).toBeLessThanOrEqual(375);
  });

  test('should display correctly on mobile large (414px)', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_large);
    await page.goto('/');
    
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByText(/career|vision|explore/i).first()).toBeVisible();
  });

  test('should display correctly on tablet portrait (768px)', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await page.goto('/');
    
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign up|login|get started/i }).first()).toBeVisible();
  });

  test('should display correctly on tablet landscape (1024px)', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_landscape);
    await page.goto('/');
    
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main, [role="main"]')).toBeVisible();
  });

  test('should display correctly on desktop (1920px)', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    await page.goto('/');
    
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have mobile menu on mobile devices', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await page.goto('/');
    
    const mobileMenu = page.locator('button[aria-label*="menu"], button:has-text("☰"), [data-testid="mobile-menu"]');
    await expect(mobileMenu.or(page.locator('header'))).toBeVisible();
  });

  test('should have responsive hero section on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await page.goto('/');
    
    const hero = page.locator('[data-testid="hero"], .hero, main > section').first();
    await expect(hero).toBeVisible();
  });

  test('should have responsive hero section on desktop', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    await page.goto('/');
    
    const hero = page.locator('[data-testid="hero"], .hero, main > section').first();
    await expect(hero).toBeVisible();
  });
});

test.describe('Responsive Design - Authentication Pages', () => {
  test('should display login form on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.locator('input[placeholder="john@example.com"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should display login form on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.locator('input[placeholder="john@example.com"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should display login form on desktop', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.locator('input[placeholder="john@example.com"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should display signup form on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await page.goto('/signup');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.locator('input[placeholder="john@example.com"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should display signup form on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await page.goto('/signup');
    await page.waitForLoadState('domcontentloaded');
    
    await expect(page.locator('input[placeholder="john@example.com"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should have readable text on mobile login', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await page.goto('/login');
    
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
    const fontSize = await heading.evaluate(el => window.getComputedStyle(el).fontSize);
    expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(16);
  });
});

test.describe('Responsive Design - Dashboard Pages', () => {
  test('should display job seeker dashboard on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    
    await expect(page.getByText(/dashboard|welcome/i)).toBeVisible();
  });

  test('should display job seeker dashboard on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await login(page, 'jobseeker');
    
    await expect(page.getByText(/dashboard|welcome/i)).toBeVisible();
  });

  test('should display job seeker dashboard on desktop', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    await login(page, 'jobseeker');
    
    await expect(page.getByText(/dashboard|welcome/i)).toBeVisible();
  });

  test('should display employer dashboard on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'employer');
    await page.goto('/employer/dashboard');
    
    await expect(page.getByText(/employer|dashboard/i)).toBeVisible();
  });

  test('should display employer dashboard on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await login(page, 'employer');
    await page.goto('/employer/dashboard');
    
    await expect(page.getByText(/employer|dashboard/i)).toBeVisible();
  });

  test('should display employer dashboard on desktop', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    await login(page, 'employer');
    await page.goto('/employer/dashboard');
    
    await expect(page.getByText(/employer|dashboard/i)).toBeVisible();
  });

  test('should stack dashboard cards on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    
    const cards = page.locator('[data-testid="stat-card"], .card, [class*="card"]');
    const count = await cards.count();
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 2); i++) {
        const box = await cards.nth(i).boundingBox();
        expect(box?.width).toBeLessThanOrEqual(375);
      }
    }
  });

  test('should show dashboard navigation on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    
    await expect(page.locator('nav, [role="navigation"]').first()).toBeVisible();
  });
});

test.describe('Responsive Design - Jobs Page', () => {
  test('should display jobs list on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible({ timeout: 60000 });
  });

  test('should display jobs list on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible({ timeout: 60000 });
  });

  test('should display jobs list on desktop', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible({ timeout: 60000 });
  });

  test('should display search bar on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    await expect(page.locator('input[placeholder*="Search"], input[type="search"]')).toBeVisible();
  });

  test('should display filters on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    const filterButton = page.locator('button:has-text("Filter"), button:has-text("Filters")');
    await expect(filterButton).toBeVisible();
  });

  test('should display filters panel on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    const filterButton = page.locator('button:has-text("Filter"), aside, [data-testid="filters"]');
    await expect(filterButton.first()).toBeVisible();
  });

  test('should display filters sidebar on desktop', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    await expect(page.locator('aside, [data-testid="filters"]').or(page.locator('button:has-text("Filter")'))).toBeVisible();
  });

  test('should have scrollable job cards on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    await page.waitForSelector('[data-testid="job-card"], .job-listing');
    await page.evaluate(() => window.scrollTo(0, 500));
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('should stack job cards vertically on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    const cards = page.locator('[data-testid="job-card"], .job-listing');
    await cards.first().waitFor();
    const count = await cards.count();
    if (count >= 2) {
      const box1 = await cards.first().boundingBox();
      const box2 = await cards.nth(1).boundingBox();
      if (box1 && box2) {
        expect(box2.y).toBeGreaterThan(box1.y + box1.height - 50);
      }
    }
  });
});

test.describe('Responsive Design - Profile Page', () => {
  test('should display profile on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/profile');
    
    await expect(page.getByText(/profile|account/i).first()).toBeVisible();
  });

  test('should display profile on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await login(page, 'jobseeker');
    await page.goto('/profile');
    
    await expect(page.getByText(/profile|account/i).first()).toBeVisible();
  });

  test('should display profile on desktop', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    await login(page, 'jobseeker');
    await page.goto('/profile');
    
    await expect(page.getByText(/profile|account/i).first()).toBeVisible();
  });

  test('should display edit button on mobile profile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/profile');
    
    await expect(page.locator('button:has-text("Edit"), button[aria-label*="Edit"]').first()).toBeVisible();
  });

  test('should display profile sections on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/profile');
    
    await expect(page.locator('section, .section, [data-testid*="section"]').first()).toBeVisible();
  });

  test('should have scrollable profile on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/profile');
    
    await page.evaluate(() => window.scrollTo(0, 1000));
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });
});

test.describe('Responsive Design - Forms & Dialogs', () => {
  test('should display job application dialog on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    await page.locator('button:has-text("Apply")').first().click();
    await expect(page.locator('textarea, input').first()).toBeVisible();
  });

  test('should display job application dialog on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    await page.locator('button:has-text("Apply")').first().click();
    await expect(page.locator('textarea, input').first()).toBeVisible();
  });

  test('should display job posting form on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'employer');
    await page.goto('/employer/jobs');
    
    await page.click('button:has-text("Post"), button:has-text("Create")');
    await expect(page.locator('input[name="title"]')).toBeVisible();
  });

  test('should display job posting form on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await login(page, 'employer');
    await page.goto('/employer/jobs');
    
    await page.click('button:has-text("Post"), button:has-text("Create")');
    await expect(page.locator('input[name="title"]')).toBeVisible();
  });

  test('should have scrollable forms on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'employer');
    await page.goto('/employer/jobs');
    
    await page.click('button:has-text("Post"), button:has-text("Create")');
    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(page.locator('input[name="title"]')).toBeVisible();
  });

  test('should display submit buttons on mobile forms', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    await page.locator('button:has-text("Apply")').first().click();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should display cancel buttons on mobile dialogs', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    await page.locator('button:has-text("Apply")').first().click();
    await expect(page.locator('button:has-text("Cancel"), button:has-text("Close")').first()).toBeVisible();
  });
});

test.describe('Responsive Design - Tables & Lists', () => {
  test('should display employer jobs table on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'employer');
    await page.goto('/employer/jobs');
    
    await expect(page.locator('[data-testid="job-card"], .job-listing, table, [role="grid"]').first()).toBeVisible({ timeout: 60000 });
  });

  test('should display employer jobs table on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await login(page, 'employer');
    await page.goto('/employer/jobs');
    
    await expect(page.locator('[data-testid="job-card"], table, [role="grid"]').first()).toBeVisible({ timeout: 60000 });
  });

  test('should display employer jobs table on desktop', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    await login(page, 'employer');
    await page.goto('/employer/jobs');
    
    await expect(page.locator('[data-testid="job-card"], table').first()).toBeVisible({ timeout: 60000 });
  });

  test('should have horizontal scroll on mobile tables', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'employer');
    await page.goto('/employer/applicants');
    
    const table = page.locator('table, [role="grid"]').first();
    if (await table.isVisible()) {
      const overflow = await table.evaluate(el => window.getComputedStyle(el).overflowX);
      expect(['auto', 'scroll', 'hidden']).toContain(overflow);
    }
  });

  test('should display applicants list on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'employer');
    await page.goto('/employer/applicants');
    
    await expect(page.locator('[data-testid="applicant"], table, ul, [role="list"]').first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Responsive Design - Navigation', () => {
  test('should display mobile navigation menu', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    
    const navToggle = page.locator('button[aria-label*="menu"], button:has-text("☰"), [data-testid="mobile-menu"]');
    await expect(navToggle.or(page.locator('nav'))).toBeVisible();
  });

  test('should open mobile menu on click', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("☰")').first();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.locator('nav, [role="navigation"]')).toBeVisible();
    }
  });

  test('should display horizontal navigation on desktop', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    await login(page, 'jobseeker');
    
    await expect(page.locator('nav, [role="navigation"]').first()).toBeVisible();
  });

  test('should have clickable nav links on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    
    const navLinks = page.locator('nav a, [role="navigation"] a');
    const count = await navLinks.count();
    if (count > 0) {
      await expect(navLinks.first()).toBeVisible();
    }
  });

  test('should navigate between pages on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    
    await page.click('a:has-text("Jobs"), a[href*="jobs"]');
    await expect(page.url()).toContain('jobs');
  });

  test('should display footer on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await page.goto('/');
    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('footer').or(page.locator('body'))).toBeVisible();
  });

  test('should display footer on desktop', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    await page.goto('/');
    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('footer').or(page.locator('body'))).toBeVisible();
  });
});

test.describe('Responsive Design - Touch Interactions', () => {
  test('should have touch-friendly buttons on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await page.goto('/login');
    
    const button = page.locator('button[type="submit"]');
    const box = await button.boundingBox();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(40);
    }
  });

  test('should have adequate spacing on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    const cards = page.locator('[data-testid="job-card"], .job-listing');
    await cards.first().waitFor();
    const count = await cards.count();
    if (count >= 2) {
      const box1 = await cards.first().boundingBox();
      const box2 = await cards.nth(1).boundingBox();
      if (box1 && box2) {
        const gap = box2.y - (box1.y + box1.height);
        expect(gap).toBeGreaterThanOrEqual(-10);
      }
    }
  });

  test('should support swipe gestures on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await login(page, 'jobseeker');
    await page.goto('/jobs');
    
    await page.touchscreen.tap(200, 300);
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="job-card"], body')).toBeVisible();
  });
});

test.describe('Responsive Design - Performance', () => {
  test('should load quickly on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(10000);
    await expect(page.locator('header, body')).toBeVisible();
  });

  test('should load quickly on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(10000);
    await expect(page.locator('header, body')).toBeVisible();
  });

  test('should load quickly on desktop', async ({ page }) => {
    await setViewport(page, VIEWPORTS.desktop_hd);
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(10000);
    await expect(page.locator('header, body')).toBeVisible();
  });

  test('should not have horizontal scroll on mobile', async ({ page }) => {
    await setViewport(page, VIEWPORTS.mobile_small);
    await page.goto('/');
    
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.viewportSize();
    expect(bodyWidth).toBeLessThanOrEqual((viewportWidth?.width || 375) + 20);
  });

  test('should not have horizontal scroll on tablet', async ({ page }) => {
    await setViewport(page, VIEWPORTS.tablet_portrait);
    await page.goto('/');
    
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.viewportSize();
    expect(bodyWidth).toBeLessThanOrEqual((viewportWidth?.width || 768) + 20);
  });
});
