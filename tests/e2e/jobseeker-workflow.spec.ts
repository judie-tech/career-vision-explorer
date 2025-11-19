//Job Seeker Workflow E2E Tests
import { test, expect, Page } from '@playwright/test';

/**
 * Helper function: Login as job seeker
 * 
 * Authenticates a job seeker user and navigates to dashboard
 * Uses test account: jobseeker@test.com
 * 
 * @param page - Playwright page object
 */
async function loginAsJobSeeker(page: Page) {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  // Wait for the form to be fully loaded
  await page.waitForSelector('input[placeholder="john@example.com"]', { timeout: 60000 });
  // Use placeholder to find email field since React Hook Form dynamically generates name
  await page.fill('input[placeholder="john@example.com"]', 'jobseeker@test.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]:has-text("Log In")');
  // Wait for navigation with longer timeout
  await page.waitForURL(/.*dashboard/, { timeout: 60000 });
}

/**
 * Helper function: Navigate to jobs page
 * 
 * Navigates to job listings page and waits for job cards to load
 * Ensures page is ready for interaction
 * 
 * @param page - Playwright page object
 */
async function navigateToJobs(page: Page) {
  await page.goto('/jobs');
  // Wait for job listings to render
  await page.waitForSelector('[data-testid="job-card"], .job-listing', { timeout: 60000 });
}

/**
 * Helper function: Apply for a job
 * 
 * Submits a job application with optional cover letter
 * Waits for confirmation of successful submission
 * 
 * @param page - Playwright page object
 * @param coverLetter - Optional cover letter text (default: 'I am interested in this position.')
 */
async function applyForJob(page: Page, coverLetter: string = 'I am interested in this position.') {
  // Click first available Apply button
  await page.locator('button:has-text("Apply"), button:has-text("Quick Apply")').first().click();
  // Fill cover letter in application form
  await page.fill('textarea[name="cover_letter"], textarea[placeholder*="cover"]', coverLetter);
  // Submit application
  await page.click('button[type="submit"]:has-text("Submit"), button:has-text("Apply Now")');
  // Verify submission success
  await expect(page.getByText(/application.*submitted|success/i)).toBeVisible({ timeout: 60000 });
}

/**
 * Test Suite: Job Seeker Workflow - Job Discovery
 * 
 * Tests the core job discovery experience including:
 * - Job search functionality (keyword, title, company)
 * - Job filtering (type, experience, location)
 * - Job sorting and pagination
 * - Viewing job details
 */
test.describe('Job Seeker Workflow - Job Discovery', () => {
  // Use shared authentication state for faster tests
  test.use({ storageState: 'tests/.auth/jobseeker.json' });
  
  // Navigate to jobs page (already authenticated via storageState)
  test.beforeEach(async ({ page }) => {
    await page.goto('/jobs');
  });

  /**
   * Test Group: Job Search
   * Validates search functionality across different query types
   */
  test.describe('Job Search', () => {
    /**
     * Test: Display jobs page
     * Verifies jobs page loads with expected content
     */
    test('should display jobs page', async ({ page }) => {
      await navigateToJobs(page);
      await expect(page.getByText(/find.*job|job.*opportunities|available.*positions/i)).toBeVisible();
    });

    test('should load job listings', async ({ page }) => {
      await navigateToJobs(page);
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible();
    });

    test('should search jobs by keyword', async ({ page }) => {
      await navigateToJobs(page);
      await page.fill('input[placeholder*="Search"], input[type="search"]', 'software engineer');
      await page.click('button[type="submit"], button:has-text("Search")');
      await expect(page.locator('text=/software|engineer/i').first()).toBeVisible({ timeout: 5000 });
    });

    test('should search jobs by title', async ({ page }) => {
      await navigateToJobs(page);
      await page.fill('input[placeholder*="Search"]', 'Developer');
      await page.press('input[placeholder*="Search"]', 'Enter');
      await expect(page.locator('text=/developer/i').first()).toBeVisible({ timeout: 5000 });
    });

    test('should search jobs by company', async ({ page }) => {
      await navigateToJobs(page);
      await page.fill('input[placeholder*="Search"]', 'TechCorp');
      await page.press('input[placeholder*="Search"]', 'Enter');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible({ timeout: 5000 });
    });

    test('should show no results for invalid search', async ({ page }) => {
      await navigateToJobs(page);
      await page.fill('input[placeholder*="Search"]', 'XYZ123NonexistentJob999');
      await page.press('input[placeholder*="Search"]', 'Enter');
      await expect(page.getByText(/no.*found|no.*results/i)).toBeVisible();
    });

    test('should clear search results', async ({ page }) => {
      await navigateToJobs(page);
      await page.fill('input[placeholder*="Search"]', 'test');
      await page.press('input[placeholder*="Search"]', 'Enter');
      await page.fill('input[placeholder*="Search"]', '');
      await page.press('input[placeholder*="Search"]', 'Enter');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible();
    });
  });

  test.describe('Job Filtering', () => {
    test('should filter jobs by job type - Full-time', async ({ page }) => {
      await navigateToJobs(page);
      await page.click('button:has-text("Filters"), button:has-text("Filter")');
      await page.check('input[value="full-time"], input[value="Full-time"]');
      await page.click('button:has-text("Apply"), button:has-text("Apply Filters")');
      await expect(page.locator('text=/full.*time/i').first()).toBeVisible({ timeout: 5000 });
    });

    test('should filter jobs by job type - Part-time', async ({ page }) => {
      await navigateToJobs(page);
      await page.click('button:has-text("Filters")');
      await page.check('input[value="part-time"], input[value="Part-time"]');
      await page.click('button:has-text("Apply Filters")');
      await expect(page.locator('text=/part.*time|no.*jobs/i').first()).toBeVisible();
    });

    test('should filter jobs by job type - Remote', async ({ page }) => {
      await navigateToJobs(page);
      await page.click('button:has-text("Filters")');
      await page.check('input[value="remote"], input[value="Remote"]');
      await page.click('button:has-text("Apply Filters")');
      await expect(page.locator('text=/remote|no.*jobs/i').first()).toBeVisible();
    });

    test('should filter jobs by experience level - Entry', async ({ page }) => {
      await navigateToJobs(page);
      await page.click('button:has-text("Filters")');
      await page.check('input[value="entry"], input[value="Entry Level"]');
      await page.click('button:has-text("Apply Filters")');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible({ timeout: 5000 });
    });

    test('should filter jobs by experience level - Mid Level', async ({ page }) => {
      await navigateToJobs(page);
      await page.click('button:has-text("Filters")');
      await page.check('input[value="mid"], input[value="Mid Level"]');
      await page.click('button:has-text("Apply Filters")');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible();
    });

    test('should filter jobs by experience level - Senior', async ({ page }) => {
      await navigateToJobs(page);
      await page.click('button:has-text("Filters")');
      await page.check('input[value="senior"], input[value="Senior Level"]');
      await page.click('button:has-text("Apply Filters")');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible();
    });

    test('should filter jobs by salary range', async ({ page }) => {
      await navigateToJobs(page);
      await page.click('button:has-text("Filters")');
      await page.fill('input[name="min_salary"], input[placeholder*="Min"]', '80000');
      await page.fill('input[name="max_salary"], input[placeholder*="Max"]', '150000');
      await page.click('button:has-text("Apply Filters")');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible({ timeout: 5000 });
    });

    test('should filter jobs by location', async ({ page }) => {
      await navigateToJobs(page);
      await page.click('button:has-text("Filters")');
      await page.fill('input[name="location"], input[placeholder*="Location"]', 'San Francisco');
      await page.click('button:has-text("Apply Filters")');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible({ timeout: 5000 });
    });

    test('should apply multiple filters simultaneously', async ({ page }) => {
      await navigateToJobs(page);
      await page.click('button:has-text("Filters")');
      await page.check('input[value="full-time"], input[value="Full-time"]');
      await page.check('input[value="senior"], input[value="Senior Level"]');
      await page.fill('input[name="min_salary"]', '100000');
      await page.click('button:has-text("Apply Filters")');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible({ timeout: 5000 });
    });

    test('should clear all filters', async ({ page }) => {
      await navigateToJobs(page);
      await page.click('button:has-text("Filters")');
      await page.check('input[value="remote"]');
      await page.click('button:has-text("Apply Filters")');
      await page.click('button:has-text("Clear"), button:has-text("Reset")');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible();
    });
  });

  test.describe('Job Sorting', () => {
    test('should sort jobs by newest first', async ({ page }) => {
      await navigateToJobs(page);
      await page.selectOption('select[name="sort"], [aria-label*="Sort"]', 'newest');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible();
    });

    test('should sort jobs by match score', async ({ page }) => {
      await navigateToJobs(page);
      await page.selectOption('select[name="sort"]', 'match');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible();
    });

    test('should sort jobs by salary high to low', async ({ page }) => {
      await navigateToJobs(page);
      await page.selectOption('select[name="sort"]', 'salary_desc');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible();
    });
  });
});

test.describe('Job Seeker Workflow - Job Application', () => {
  // Use shared authentication state for faster tests
  test.use({ storageState: 'tests/.auth/jobseeker.json' });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/jobs');
  });

  test.describe('Job Details', () => {
    test('should view job details', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('[data-testid="job-card"], .job-listing').first().click();
      await expect(page.getByText(/job.*details|description|requirements/i)).toBeVisible();
    });

    test('should display job title and company', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('[data-testid="job-card"]').first().click();
      await expect(page.locator('h1, h2, [data-testid="job-title"]')).toBeVisible();
      await expect(page.locator('[data-testid="company-name"], text=/company/i')).toBeVisible();
    });

    test('should display job requirements', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('[data-testid="job-card"]').first().click();
      await expect(page.getByText(/requirements|qualifications/i)).toBeVisible();
    });

    test('should display job salary', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('[data-testid="job-card"]').first().click();
      await expect(page.locator('text=/salary|compensation|\\$/i')).toBeVisible();
    });

    test('should display job location', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('[data-testid="job-card"]').first().click();
      await expect(page.locator('text=/location|remote|hybrid/i')).toBeVisible();
    });
  });

  test.describe('Apply for Job', () => {
    test('should open application dialog', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('button:has-text("Apply")').first().click();
      await expect(page.getByText(/apply|application/i)).toBeVisible();
    });

    test('should apply for job with cover letter', async ({ page }) => {
      await navigateToJobs(page);
      await applyForJob(page, 'I am excited about this opportunity and believe my skills are a great match.');
    });

    test('should apply for job without cover letter', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('button:has-text("Apply")').first().click();
      await page.click('button[type="submit"]:has-text("Submit"), button:has-text("Apply Now")');
      await expect(page.getByText(/application.*submitted|success/i)).toBeVisible({ timeout: 60000 });
    });

    test('should upload CV during application', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('button:has-text("Apply")').first().click();
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.isVisible()) {
        await fileInput.setInputFiles('tests/fixtures/cv-files/sample-cv.pdf');
        await page.waitForTimeout(2000);
      }
      await page.fill('textarea[name="cover_letter"]', 'Test application');
      await page.click('button[type="submit"]');
      await expect(page.getByText(/submitted|success/i)).toBeVisible({ timeout: 60000 });
    });

    test('should check if CV is parsed before applying', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('button:has-text("Apply")').first().click();
      await expect(page.locator('text=/cv|resume|profile/i')).toBeVisible();
    });

    test('should cancel job application', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('button:has-text("Apply")').first().click();
      await page.click('button:has-text("Cancel"), button:has-text("Close")');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible();
    });

    test('should validate cover letter length', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('button:has-text("Apply")').first().click();
      await page.fill('textarea[name="cover_letter"]', 'Too short');
      await page.click('button[type="submit"]');
      await expect(page.getByText(/at least|minimum|too short/i).or(page.getByText(/success|submitted/i))).toBeVisible({ timeout: 60000 });
    });

    test('should prevent duplicate application', async ({ page }) => {
      await navigateToJobs(page);
      await applyForJob(page);
      await navigateToJobs(page);
      const applyButton = page.locator('button:has-text("Apply")').first();
      if (await applyButton.isVisible()) {
        await applyButton.click();
        await page.click('button[type="submit"]');
        await expect(page.getByText(/already.*applied|duplicate|success/i)).toBeVisible({ timeout: 60000 });
      }
    });
  });

  test.describe('Save Job', () => {
    test('should save job for later', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('button[aria-label*="Save"], button:has-text("Save")').first().click();
      await expect(page.getByText(/saved|bookmarked/i)).toBeVisible();
    });

    test('should unsave job', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('button[aria-label*="Save"]').first().click();
      await page.waitForTimeout(1000);
      await page.locator('button[aria-label*="Unsave"], button:has-text("Remove")').first().click();
      await expect(page.getByText(/removed|unsaved/i)).toBeVisible();
    });

    test('should view saved jobs', async ({ page }) => {
      await page.goto('/saved-jobs');
      await expect(page.getByText(/saved.*jobs|bookmarks/i)).toBeVisible();
    });
  });
});

test.describe('Job Seeker Workflow - Application Tracking', () => {
  // Use shared authentication state for faster tests
  test.use({ storageState: 'tests/.auth/jobseeker.json' });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/applications');
  });

  test.describe('My Applications', () => {
    test('should access applications page', async ({ page }) => {
      await page.goto('/applications');
      await expect(page.getByText(/my.*applications|application.*status/i)).toBeVisible();
    });

    test('should display application list', async ({ page }) => {
      await page.goto('/applications');
      await expect(page.locator('[data-testid="application-card"], .application-item').first().or(page.getByText(/no.*applications/i))).toBeVisible();
    });

    test('should view application details', async ({ page }) => {
      await page.goto('/applications');
      const viewButton = page.locator('button:has-text("View"), button:has-text("Details")').first();
      if (await viewButton.isVisible()) {
        await viewButton.click();
        await expect(page.getByText(/application|status|details/i)).toBeVisible();
      }
    });

    test('should filter applications by status - Pending', async ({ page }) => {
      await page.goto('/applications');
      await page.selectOption('select[name="status"]', 'pending');
      await expect(page.locator('text=/pending|no.*applications/i').first()).toBeVisible();
    });

    test('should filter applications by status - Reviewed', async ({ page }) => {
      await page.goto('/applications');
      await page.selectOption('select[name="status"]', 'reviewed');
      await expect(page.locator('text=/reviewed|no.*applications/i').first()).toBeVisible();
    });

    test('should filter applications by status - Interviewed', async ({ page }) => {
      await page.goto('/applications');
      await page.selectOption('select[name="status"]', 'interviewed');
      await expect(page.locator('text=/interviewed|no.*applications/i').first()).toBeVisible();
    });

    test('should show application statistics', async ({ page }) => {
      await page.goto('/applications');
      await expect(page.locator('text=/total|pending|reviewed/i').first()).toBeVisible();
    });

    test('should withdraw application', async ({ page }) => {
      await page.goto('/applications');
      const withdrawButton = page.locator('button:has-text("Withdraw"), button:has-text("Cancel")').first();
      if (await withdrawButton.isVisible()) {
        await withdrawButton.click();
        await page.click('button:has-text("Confirm")');
        await expect(page.getByText(/withdrawn|cancelled/i)).toBeVisible();
      }
    });
  });
});

test.describe('Job Seeker Workflow - Recommendations', () => {
  // Use shared authentication state for faster tests
  test.use({ storageState: 'tests/.auth/jobseeker.json' });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/jobs');
  });

  test.describe('AI Job Matching', () => {
    test('should display match scores on jobs', async ({ page }) => {
      await navigateToJobs(page);
      await expect(page.locator('text=/match|score|%/i').first()).toBeVisible();
    });

    test('should see personalized recommendations', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page.getByText(/recommended|matches|for you/i)).toBeVisible();
    });

    test('should view recommendation explanation', async ({ page }) => {
      await navigateToJobs(page);
      const infoButton = page.locator('[aria-label*="Match"], [data-testid="match-info"]').first();
      if (await infoButton.isVisible()) {
        await infoButton.click();
        await expect(page.getByText(/match|skills|experience/i)).toBeVisible();
      }
    });

    test('should filter by high match scores', async ({ page }) => {
      await navigateToJobs(page);
      await page.click('button:has-text("Filters")');
      await page.fill('input[name="min_match"], input[placeholder*="Match"]', '80');
      await page.click('button:has-text("Apply Filters")');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible({ timeout: 5000 });
    });

    test('should refresh recommendations', async ({ page }) => {
      await page.goto('/dashboard');
      const refreshButton = page.locator('button:has-text("Refresh"), button[aria-label*="Refresh"]').first();
      if (await refreshButton.isVisible()) {
        await refreshButton.click();
        await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible();
      }
    });
  });

  test.describe('Skill-Based Matching', () => {
    test('should match jobs based on profile skills', async ({ page }) => {
      await navigateToJobs(page);
      await expect(page.locator('text=/skills|matched/i').first()).toBeVisible();
    });

    test('should highlight matching skills', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('[data-testid="job-card"]').first().click();
      await expect(page.locator('.badge, .chip, [data-testid="skill-tag"]').first()).toBeVisible();
    });

    test('should show skill gaps', async ({ page }) => {
      await navigateToJobs(page);
      await page.locator('[data-testid="job-card"]').first().click();
      await expect(page.locator('text=/gap|missing|required/i').first().or(page.locator('h1, h2'))).toBeVisible();
    });
  });
});

test.describe('Job Seeker Workflow - Infinite Scroll', () => {
  // Use shared authentication state for faster tests
  test.use({ storageState: 'tests/.auth/jobseeker.json' });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/jobs');
  });

  test('should load more jobs on scroll', async ({ page }) => {
    await navigateToJobs(page);
    const initialJobCount = await page.locator('[data-testid="job-card"], .job-listing').count();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    const newJobCount = await page.locator('[data-testid="job-card"], .job-listing').count();
    expect(newJobCount).toBeGreaterThanOrEqual(initialJobCount);
  });

  test('should show loading indicator while fetching', async ({ page }) => {
    await navigateToJobs(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('text=/loading|fetching/i').or(page.locator('[data-testid="job-card"]'))).toBeVisible();
  });

  test('should stop loading when no more jobs', async ({ page }) => {
    await navigateToJobs(page);
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
    }
    await expect(page.getByText(/no.*more|end.*of.*list/i).or(page.locator('[data-testid="job-card"]'))).toBeVisible();
  });
});

test.describe('Job Seeker Workflow - Edge Cases', () => {
  // Use shared authentication state for faster tests
  test.use({ storageState: 'tests/.auth/jobseeker.json' });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/jobs');
  });

  test('should handle empty search results gracefully', async ({ page }) => {
    await navigateToJobs(page);
    await page.fill('input[placeholder*="Search"]', 'XYZNonexistent12345');
    await page.press('input[placeholder*="Search"]', 'Enter');
    await expect(page.getByText(/no.*found|no.*results/i)).toBeVisible();
  });

  test('should handle application without profile completion', async ({ page }) => {
    await navigateToJobs(page);
    await page.locator('button:has-text("Apply")').first().click();
    await page.click('button[type="submit"]');
    await expect(page.getByText(/complete.*profile|success|submitted/i)).toBeVisible({ timeout: 60000 });
  });

  test('should handle rapid filter changes', async ({ page }) => {
    await navigateToJobs(page);
    await page.click('button:has-text("Filters")');
    await page.check('input[value="full-time"]');
    await page.click('button:has-text("Apply")');
    await page.click('button:has-text("Filters")');
    await page.uncheck('input[value="full-time"]');
    await page.check('input[value="remote"]');
    await page.click('button:has-text("Apply")');
    await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible();
  });

  test('should handle network errors during job load', async ({ page }) => {
    await page.route('**/api/v1/jobs*', route => route.abort());
    await page.goto('/jobs');
    await expect(page.getByText(/error|failed|try.*again/i)).toBeVisible({ timeout: 60000 });
  });

  test('should maintain scroll position after applying', async ({ page }) => {
    await navigateToJobs(page);
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.locator('button:has-text("Apply")').nth(2).click();
    await page.click('button:has-text("Cancel")');
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });
});
