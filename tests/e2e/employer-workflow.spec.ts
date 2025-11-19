import { test, expect, Page } from '@playwright/test';

// Helper: Login as employer 
async function loginAsEmployer(page: Page) {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  // Wait for the form to be fully loaded
  await page.waitForSelector('input[placeholder="john@example.com"]', { timeout: 60000 });
  
  await page.fill('input[placeholder="john@example.com"]', 'employer@test.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]:has-text("Log In")');
  // Wait for navigation with longer timeout
  await page.waitForURL(/.*dashboard/, { timeout: 60000 });
}

// Helper: Create test job
async function createTestJob(page: Page, jobData: Partial<{
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  jobType: string;
  salaryRange: string;
  experienceLevel: string;
}> = {}) {
  const defaultJob = {
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc',
    location: 'San Francisco, CA',
    description: 'We are looking for an experienced software engineer to join our team.',
    requirements: 'Bachelor\'s degree in Computer Science, 5+ years of experience',
    jobType: 'full-time',
    salaryRange: '$120,000 - $180,000',
    experienceLevel: 'senior',
    ...jobData
  };

  // Click the "Post New Job" button to open the job creation dialog
  await page.locator('button:has-text("Post New Job"), button:has-text("Create Job")').first().click();
  
  // Fill in basic job information
  await page.fill('input[name="title"]', defaultJob.title);
  await page.fill('input[name="company"]', defaultJob.company);
  await page.fill('input[name="location"]', defaultJob.location);
  await page.fill('textarea[name="description"]', defaultJob.description);
  await page.fill('textarea[name="requirements"]', defaultJob.requirements);
  
  // Select job type using Shadcn UI Select component
  await page.getByRole('combobox').filter({ hasText: /select type|full-time|part-time/i }).first().click();
  await page.getByRole('option', { name: new RegExp(defaultJob.jobType, 'i') }).click();
  
  await page.fill('input[name="salary_range"]', defaultJob.salaryRange);
  
  // Select experience level using Shadcn UI Select  
  await page.getByRole('combobox').filter({ hasText: /select.*level|entry|mid|senior/i }).first().click();
  await page.getByRole('option', { name: new RegExp(defaultJob.experienceLevel, 'i') }).click();
  
  // Submit the job posting form
  await page.click('button[type="submit"]:has-text("Post Job"), button[type="submit"]:has-text("Create")');
  
  // Wait for dialog to close and job to appear in the listlist
  await page.waitForTimeout(2000);
  // Verify the job appears in the employer's job list
  await expect(page.getByText(defaultJob.title).first()).toBeVisible({ timeout: 5000 });
}

/**
 * Test Suite: Employer Workflow - Job Posting
 * Tests all functionality related to creating, editing, and managing job postings
 */
test.describe('Employer Workflow - Job Posting', () => {
  // Use shared authentication state for faster tests
  test.use({ storageState: 'tests/.auth/employer.json' });
  
  // Navigate to employer dashboard (already authenticated via storageState)
  test.beforeEach(async ({ page }) => {
    await page.goto('/employer/dashboard');
  });

  /**
   * Test Group: Create Job Posting
   * Validates job creation with various configurations and field validations
   */
  test.describe('Create Job Posting', () => {
    /**
     * Test: Access job posting page
     * Verifies employer can navigate to jobs page and see posting controls
     */
    test('should access job posting page', async ({ page }) => {
      await page.goto('/employer/jobs');
      await expect(page.getByText(/recruitment hub|my jobs|job postings/i)).toBeVisible();
      await expect(page.locator('button:has-text("Post New Job"), button:has-text("Create Job")').first()).toBeVisible();
    });

    /**
     * Test: Create basic job posting
     * Validates successful job creation with default values
     * Expected: Job appears in employer's job list
     */
    test('should create basic job posting successfully', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page);
      // Verify job title appears in the list after creation
      await expect(page.getByText('Senior Software Engineer')).toBeVisible();
    });

    /**
     * Test: Create job with all required fields
     * Tests job creation with custom values for all fields
     * Validates form accepts and persists all field types
     */
    test('should create job with all required fields', async ({ page }) => {
      await page.goto('/employer/jobs');
      // Create job with custom values to test all fields
      await createTestJob(page, {
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        location: 'Remote',
        description: 'Join our innovative team building next-gen web applications',
        requirements: '3+ years experience with React, Node.js, PostgreSQL',
        jobType: 'full-time',
        salaryRange: '$90,000 - $130,000',
        experienceLevel: 'mid'
      });
      await expect(page.getByText('Full Stack Developer').first()).toBeVisible();
    });

    test('should validate required fields on job creation', async ({ page }) => {
      await page.goto('/employer/jobs');
      await page.click('button:has-text("Post New Job"), button:has-text("Create Job")');
      await page.click('button[type="submit"]');
      await expect(page.getByText(/required|must be at least/i).first()).toBeVisible();
    });

    /**
     * Test: Create part-time job posting
     * Validates job creation with part-time employment type
     */
    test('should create part-time job posting', async ({ page }) => {
      await page.goto('/employer/jobs');
      // Create part-time position
      await createTestJob(page, {
        title: 'Part-Time Frontend Developer',
        jobType: 'part-time',
        experienceLevel: 'entry'
      });
      await expect(page.getByText('Part-Time Frontend Developer')).toBeVisible();
    });

    test('should create contract job posting', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, {
        title: 'Contract DevOps Engineer',
        jobType: 'contract',
        salaryRange: '$80/hour',
        experienceLevel: 'senior'
      });
      await expect(page.getByText('Contract DevOps Engineer')).toBeVisible();
    });

    test('should create internship posting', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, {
        title: 'Software Engineering Intern',
        jobType: 'internship',
        salaryRange: '$25/hour',
        experienceLevel: 'entry'
      });
      await expect(page.getByText('Software Engineering Intern').first()).toBeVisible();
    });

    /**
     * Test: Create remote job posting
     * Validates job creation with remote work type
     */
    test('should create remote job posting', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, {
        title: 'Remote Backend Engineer',
        location: 'Remote Worldwide',
        jobType: 'remote',
        experienceLevel: 'mid'
      });
      await expect(page.getByText('Remote Backend Engineer')).toBeVisible();
    });
  });

  test.describe('Edit Job Posting', () => {
    test('should edit existing job title', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, { title: 'Original Job Title' });
      await page.getByRole('button', { name: /edit/i }).first().click();
      await page.fill('input[name="title"]', 'Updated Job Title');
      await page.click('button[type="submit"]');
      await expect(page.getByText('Updated Job Title')).toBeVisible();
    });

    test('should edit job description', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page);
      await page.locator('[aria-label="Job actions"], button:has-text("Edit")').first().click();
      await page.fill('textarea[name="description"]', 'Updated job description with more details');
      await page.click('button[type="submit"]');
      await expect(page.getByText(/updated.*success/i)).toBeVisible();
    });

    test('should edit job salary range', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page);
      await page.getByRole('button', { name: /edit/i }).first().click();
      await page.fill('input[name="salary_range"]', '$150,000 - $200,000');
      await page.click('button[type="submit"]');
      await expect(page.getByText(/updated.*success/i)).toBeVisible();
    });

    test('should edit job type', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, { jobType: 'full-time' });
      await page.getByRole('button', { name: /edit/i }).first().click();
      await page.selectOption('select[name="job_type"], [name="job_type"] select', 'remote');
      await page.click('button[type="submit"]');
      await expect(page.getByText(/updated.*success/i)).toBeVisible();
    });

    test('should edit experience level', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, { experienceLevel: 'mid' });
      await page.getByRole('button', { name: /edit/i }).first().click();
      await page.selectOption('select[name="experience_level"], [name="experience_level"] select', 'senior');
      await page.click('button[type="submit"]');
      await expect(page.getByText(/updated.*success/i)).toBeVisible();
    });
  });

  test.describe('Delete Job Posting', () => {
    test('should delete job posting', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, { title: 'Job To Delete' });
      await page.getByRole('button', { name: /delete|remove/i }).first().click();
      await page.click('button:has-text("Confirm"), button:has-text("Delete")');
      await expect(page.getByText('Job To Delete')).not.toBeVisible();
    });

    test('should cancel job deletion', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, { title: 'Job To Keep' });
      await page.getByRole('button', { name: /delete|remove/i }).first().click();
      await page.click('button:has-text("Cancel")');
      await expect(page.getByText('Job To Keep')).toBeVisible();
    });
  });

  test.describe('Duplicate Job Posting', () => {
    test('should duplicate existing job', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, { title: 'Original Position' });
      await page.getByRole('button', { name: /duplicate|copy/i }).first().click();
      await expect(page.getByText('Original Position').nth(1)).toBeVisible();
    });

    test('should allow editing duplicated job', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, { title: 'Position to Duplicate' });
      await page.locator('[aria-label="Job actions"], button:has-text("Duplicate")').first().click();
      await page.locator('[aria-label="Job actions"], button:has-text("Edit")').nth(1).click();
      await page.fill('input[name="title"]', 'Duplicated and Modified Position');
      await page.click('button[type="submit"]');
      await expect(page.getByText('Duplicated and Modified Position')).toBeVisible();
    });
  });
});

test.describe('Employer Workflow - Job Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsEmployer(page);
  });

  test.describe('Job Status Management', () => {
    test('should activate job posting', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page);
      await page.locator('[aria-label="Job actions"], button:has-text("Activate")').first().click();
      await expect(page.getByText(/active/i).first()).toBeVisible();
    });

    test('should deactivate job posting', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page);
      await page.locator('[aria-label="Job actions"], button:has-text("Deactivate"), button:has-text("Close")').first().click();
      await expect(page.getByText(/closed|inactive/i).first()).toBeVisible();
    });

    test('should filter jobs by active status', async ({ page }) => {
      await page.goto('/employer/jobs');
      await page.click('button:has-text("Active"), [role="tab"]:has-text("Active")');
      const activeJobs = page.locator('[data-status="active"], .badge:has-text("Active")');
      await expect(activeJobs.first()).toBeVisible({ timeout: 5000 });
    });

    test('should filter jobs by draft status', async ({ page }) => {
      await page.goto('/employer/jobs');
      await page.click('button:has-text("Draft"), [role="tab"]:has-text("Draft")');
      await expect(page.locator('text=/draft|no.*jobs/i').first()).toBeVisible();
    });

    test('should filter jobs by expired status', async ({ page }) => {
      await page.goto('/employer/jobs');
      await page.click('button:has-text("Expired"), [role="tab"]:has-text("Expired")');
      await expect(page.locator('text=/expired|no.*jobs/i').first()).toBeVisible();
    });

    test('should show all jobs', async ({ page }) => {
      await page.goto('/employer/jobs');
      await page.click('button:has-text("All Jobs"), [role="tab"]:has-text("All")');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Job Search & Filter', () => {
    test('should search jobs by title', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, { title: 'Unique Search Title' });
      await page.fill('input[placeholder*="Search"], input[type="search"]', 'Unique Search');
      await expect(page.getByText('Unique Search Title')).toBeVisible();
    });

    test('should show no results for invalid search', async ({ page }) => {
      await page.goto('/employer/jobs');
      await page.fill('input[placeholder*="Search"], input[type="search"]', 'NonexistentJobTitle12345');
      await expect(page.getByText(/no.*found|no.*results/i)).toBeVisible();
    });

    test('should clear search filter', async ({ page }) => {
      await page.goto('/employer/jobs');
      await page.fill('input[placeholder*="Search"], input[type="search"]', 'test');
      await page.fill('input[placeholder*="Search"], input[type="search"]', '');
      await expect(page.locator('[data-testid="job-card"], .job-listing').first()).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Job Sharing', () => {
    test('should copy job link to clipboard', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page);
      await page.locator('[aria-label="Job actions"], button:has-text("Share")').first().click();
      await expect(page.getByText(/copied|clipboard/i)).toBeVisible();
    });
  });

  test.describe('View Job Details', () => {
    test('should view job details from employer jobs list', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page, { title: 'View Details Test Job' });
      await page.locator('button:has-text("View"), [aria-label="View job"]').first().click();
      await expect(page.getByText('View Details Test Job')).toBeVisible();
    });
  });
});

test.describe('Employer Workflow - Applicant Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsEmployer(page);
  });

  test.describe('Applicant Dashboard', () => {
    test('should access employer dashboard', async ({ page }) => {
      await page.goto('/employer/dashboard');
      await expect(page.getByText(/employer.*dashboard|welcome.*back/i)).toBeVisible();
    });

    test('should display job statistics', async ({ page }) => {
      await page.goto('/employer/dashboard');
      await expect(page.locator('text=/active.*jobs|total.*jobs/i').first()).toBeVisible();
    });

    test('should display recent applicants', async ({ page }) => {
      await page.goto('/employer/dashboard');
      await expect(page.getByText(/recent.*applicant|applications/i)).toBeVisible();
    });

    test('should navigate to all applicants', async ({ page }) => {
      await page.goto('/employer/dashboard');
      await page.click('button:has-text("View All"), a:has-text("All Applicants")');
      await expect(page.url()).toContain('/applicants');
    });

    test('should navigate to job listings from dashboard', async ({ page }) => {
      await page.goto('/employer/dashboard');
      await page.click('a:has-text("Jobs"), a:has-text("My Jobs")');
      await expect(page.url()).toContain('/jobs');
    });
  });

  test.describe('Applicant Review', () => {
    test('should view job applicants', async ({ page }) => {
      await page.goto('/employer/jobs');
      await createTestJob(page);
      await page.locator('button:has-text("View Applicants"), button:has-text("Applicants")').first().click();
      await expect(page.getByText(/applicants|applications/i)).toBeVisible();
    });

    test('should filter applicants by status', async ({ page }) => {
      await page.goto('/employer/applicants');
      await page.selectOption('select[name="status"]', 'pending');
      await expect(page.locator('text=/pending|no.*applicants/i').first()).toBeVisible();
    });

    test('should view applicant profile', async ({ page }) => {
      await page.goto('/employer/applicants');
      const viewButton = page.locator('button:has-text("View Profile"), button:has-text("View")').first();
      if (await viewButton.isVisible()) {
        await viewButton.click();
        await expect(page.getByText(/profile|candidate|applicant/i)).toBeVisible();
      }
    });

    test('should update applicant status', async ({ page }) => {
      await page.goto('/employer/applicants');
      const statusButton = page.locator('button:has-text("Update Status"), select[name="status"]').first();
      if (await statusButton.isVisible()) {
        await statusButton.click();
        await expect(page.getByText(/status.*updated|success/i)).toBeVisible({ timeout: 5000 });
      }
    });
  });

  test.describe('Interview Management', () => {
    test('should access interview schedule', async ({ page }) => {
      await page.goto('/employer/interviews');
      await expect(page.getByText(/interview|schedule/i)).toBeVisible();
    });

    test('should schedule new interview', async ({ page }) => {
      await page.goto('/employer/interviews');
      const scheduleButton = page.locator('button:has-text("Schedule"), button:has-text("New Interview")').first();
      if (await scheduleButton.isVisible()) {
        await scheduleButton.click();
        await expect(page.locator('input[type="datetime-local"], input[type="date"]')).toBeVisible();
      }
    });
  });
});

test.describe('Employer Workflow - Analytics', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsEmployer(page);
  });

  test('should display analytics overview', async ({ page }) => {
    await page.goto('/employer/dashboard');
    await expect(page.locator('text=/views|applications|impressions/i').first()).toBeVisible();
  });

  test('should show job posting statistics', async ({ page }) => {
    await page.goto('/employer/dashboard');
    await expect(page.locator('text=/active|draft|total/i').first()).toBeVisible();
  });

  test('should display applicant statistics', async ({ page }) => {
    await page.goto('/employer/dashboard');
    await expect(page.locator('text=/pending|reviewed|interviewed/i').first()).toBeVisible();
  });
});

test.describe('Employer Workflow - Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsEmployer(page);
  });

  test('should handle job creation with minimum required fields', async ({ page }) => {
    await page.goto('/employer/jobs');
    await page.click('button:has-text("Post New Job"), button:has-text("Create Job")');
    await page.fill('input[name="title"]', 'Min Job');
    await page.fill('input[name="company"]', 'Co');
    await page.fill('input[name="location"]', 'NY');
    await page.fill('textarea[name="description"]', 'Twenty char description');
    await page.fill('textarea[name="requirements"]', 'Ten chars.');
    await page.fill('input[name="salary_range"]', '$');
    await page.click('button[type="submit"]');
    await expect(page.getByText(/job.*posted|success/i)).toBeVisible({ timeout: 60000 });
  });

  test('should handle special characters in job title', async ({ page }) => {
    await page.goto('/employer/jobs');
    await createTestJob(page, { title: 'C++ & C# Developer (Senior Level)' });
    await expect(page.getByText('C++ & C# Developer')).toBeVisible();
  });

  test('should handle very long job descriptions', async ({ page }) => {
    await page.goto('/employer/jobs');
    const longDescription = 'A'.repeat(2000);
    await createTestJob(page, { description: longDescription });
    await expect(page.getByText(/success/i)).toBeVisible();
  });

  test('should handle rapid job creation', async ({ page }) => {
    await page.goto('/employer/jobs');
    await createTestJob(page, { title: 'Rapid Job 1' });
    await createTestJob(page, { title: 'Rapid Job 2' });
    await createTestJob(page, { title: 'Rapid Job 3' });
    await expect(page.getByText('Rapid Job 3')).toBeVisible();
  });
});
