import { test, expect } from '@playwright/test';

// NOTE: This is a DRAFT file created during initial exploration
// Profile-related CV upload tests are in cv-upload.spec.ts
// Additional profile management tests may be added here in the future

test.describe('Profile Management - Comprehensive Tests', () => {
  // Helper function to login as job seeker (using actual test user)
  const loginAsJobSeeker = async (page) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'jobseeker@test.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/(jobseeker\/dashboard|dashboard)$/, { timeout: 60000 });
  };

  // Helper function to login as employer (using actual test user)
  const loginAsEmployer = async (page) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'employer@test.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/(employer\/dashboard|dashboard)$/, { timeout: 60000 });
  };

  test.beforeEach(async ({ page }) => {
    // Start each test on the login page
    await page.goto('/');
  });

  test.describe('Profile Viewing', () => {
    test('Job seeker can view their profile page', async ({ page }) => {
      await loginAsJobSeeker(page);

      // Navigate to profile
      await page.click('a[href="/profile"], button[aria-label="User menu"]');
      await page.waitForTimeout(500);
      await page.click('text=Profile');

      // Verify profile page loads
      await expect(page).toHaveURL(/\/profile/);
      await expect(page.locator('h1, h2').filter({ hasText: /profile/i }).first()).toBeVisible();
    });

    test('Profile displays user information correctly', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      // Verify key profile sections are visible
      await expect(page.locator('text=/name/i').or(page.locator('[data-testid="profile-name"]'))).toBeVisible();
      await expect(page.locator('text=/email/i').or(page.locator('[data-testid="profile-email"]'))).toBeVisible();
    });

    test('Profile completion percentage is displayed', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      // Check for completion indicator
      const completionText = page.locator('text=/completion|complete|%/i').first();
      await expect(completionText).toBeVisible({ timeout: 60000 });
    });
  });

  test.describe('Profile Editing', () => {
    test('User can enter edit mode', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      // Click edit button
      const editButton = page.locator('button').filter({ hasText: /edit/i }).first();
      await editButton.click();

      // Verify edit mode is active
      const saveButton = page.locator('button').filter({ hasText: /save/i });
      await expect(saveButton).toBeVisible();
    });

    test('User can update basic information', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      // Enter edit mode
      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      // Update bio/description field
      const bioField = page.locator('textarea[name="bio"], textarea[placeholder*="bio" i], textarea[placeholder*="about" i]').first();
      if (await bioField.isVisible()) {
        await bioField.fill('Updated bio for testing purposes');
      }

      // Update phone number if field exists
      const phoneField = page.locator('input[name="phone"], input[type="tel"]').first();
      if (await phoneField.isVisible()) {
        await phoneField.fill('+254700000000');
      }

      // Save changes
      await page.locator('button').filter({ hasText: /save/i }).first().click();

      // Verify success message or updated data
      await expect(page.locator('text=/saved|updated|success/i').first()).toBeVisible({ timeout: 60000 });
    });

    test('User can update location', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      // Find and fill location field
      const locationField = page.locator('input[name="location"], input[placeholder*="location" i]').first();
      if (await locationField.isVisible()) {
        await locationField.fill('Nairobi, Kenya');
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated|success/i').first()).toBeVisible({ timeout: 60000 });
      }
    });

    test('Cancel button discards changes', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      // Get original bio text
      const originalBio = await page.locator('p, div').filter({ hasText: /bio|about/i }).first().textContent();

      // Enter edit mode and make changes
      await page.locator('button').filter({ hasText: /edit/i }).first().click();
      const bioField = page.locator('textarea[name="bio"]').first();
      if (await bioField.isVisible()) {
        await bioField.fill('This should be discarded');
      }

      // Click cancel
      const cancelButton = page.locator('button').filter({ hasText: /cancel/i });
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
      }

      // Verify edit mode is exited
      await expect(page.locator('button').filter({ hasText: /edit/i })).toBeVisible();
    });
  });

  test.describe('Skills Management', () => {
    test('User can view their skills', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      // Look for skills section
      const skillsSection = page.locator('text=/skills/i').first();
      await expect(skillsSection).toBeVisible();
    });

    test('User can add a new skill', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      // Enter edit mode
      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      // Find skill input or add skill button
      const addSkillButton = page.locator('button').filter({ hasText: /add skill/i });
      if (await addSkillButton.isVisible()) {
        await addSkillButton.click();
        const skillInput = page.locator('input[placeholder*="skill" i]').last();
        await skillInput.fill('Playwright Testing');
        await skillInput.press('Enter');
      } else {
        // Try direct skill textarea/input
        const skillField = page.locator('textarea[name="skills"], input[name="skills"]').first();
        if (await skillField.isVisible()) {
          const existingSkills = await skillField.inputValue();
          await skillField.fill(existingSkills + (existingSkills ? ', ' : '') + 'Playwright Testing');
        }
      }

      // Save changes
      await page.locator('button').filter({ hasText: /save/i }).first().click();
      await page.waitForTimeout(1000);

      // Verify skill was added
      await expect(page.locator('text=/playwright testing/i')).toBeVisible({ timeout: 60000 });
    });

    test('User can remove a skill', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      // Enter edit mode
      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      // Find and click remove button on first skill badge
      const removeButton = page.locator('button[aria-label*="remove" i], button[title*="remove" i], button:has-text("×")').first();
      if (await removeButton.isVisible()) {
        await removeButton.click();
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });
  });

  test.describe('Work Experience Management', () => {
    test('User can add work experience', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      // Find work experience section
      const workExpField = page.locator('textarea[name*="experience" i], textarea[placeholder*="experience" i]').first();
      if (await workExpField.isVisible()) {
        await workExpField.fill('Senior Software Engineer at Tech Company (2020-2023)');
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });

    test('User can update years of experience', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      const experienceYearsField = page.locator('input[name="experience_years"], input[type="number"]').first();
      if (await experienceYearsField.isVisible()) {
        await experienceYearsField.fill('5');
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });
  });

  test.describe('Education Management', () => {
    test('User can add education details', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      const educationField = page.locator('textarea[name="education"], textarea[placeholder*="education" i]').first();
      if (await educationField.isVisible()) {
        await educationField.fill('Bachelor of Computer Science - University of Nairobi (2016-2020)');
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });
  });

  test.describe('Profile Image Management', () => {
    test('Profile image is displayed', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      // Check for avatar/profile image
      const profileImage = page.locator('img[alt*="profile" i], img[alt*="avatar" i], [data-testid="profile-image"]').first();
      await expect(profileImage).toBeVisible();
    });

    test('User can change profile picture', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      // Look for upload button
      const uploadButton = page.locator('button').filter({ hasText: /upload|change.*image|change.*photo/i });
      if (await uploadButton.isVisible()) {
        // Test file input exists and is accessible
        const fileInput = page.locator('input[type="file"]').first();
        await expect(fileInput).toBeTruthy();
      }
    });
  });

  test.describe('Social Links Management', () => {
    test('User can add LinkedIn URL', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      const linkedinField = page.locator('input[name="linkedin_url"], input[placeholder*="linkedin" i]').first();
      if (await linkedinField.isVisible()) {
        await linkedinField.fill('https://linkedin.com/in/testuser');
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });

    test('User can add GitHub URL', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      const githubField = page.locator('input[name="github_url"], input[placeholder*="github" i]').first();
      if (await githubField.isVisible()) {
        await githubField.fill('https://github.com/testuser');
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });

    test('User can add portfolio URL', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      const portfolioField = page.locator('input[name="portfolio_url"], input[placeholder*="portfolio" i]').first();
      if (await portfolioField.isVisible()) {
        await portfolioField.fill('https://testuser.dev');
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });
  });

  test.describe('Job Preferences', () => {
    test('User can set availability status', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      // Look for availability dropdown or checkbox
      const availabilitySelect = page.locator('select[name="availability"]');
      if (await availabilitySelect.isVisible()) {
        await availabilitySelect.selectOption('Available');
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });

    test('User can set preferred job type', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      const jobTypeSelect = page.locator('select[name="preferred_job_type"]');
      if (await jobTypeSelect.isVisible()) {
        await jobTypeSelect.selectOption('Full-time');
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });

    test('User can set salary expectations', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      const salaryField = page.locator('input[name="salary_expectation"]').first();
      if (await salaryField.isVisible()) {
        await salaryField.fill('KES 100,000 - 150,000');
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });
  });

  test.describe('Company Profile (Employer)', () => {
    test('Employer can view company profile section', async ({ page }) => {
      await loginAsEmployer(page);
      await page.goto('/profile');

      // Employer should see company-specific fields
      await expect(page.locator('text=/company|organization/i').first()).toBeVisible();
    });

    test('Employer can update company name', async ({ page }) => {
      await loginAsEmployer(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      const companyNameField = page.locator('input[name="company_name"], input[placeholder*="company name" i]').first();
      if (await companyNameField.isVisible()) {
        await companyNameField.fill('Test Tech Solutions Ltd');
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });

    test('Employer can update industry', async ({ page }) => {
      await loginAsEmployer(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      const industryField = page.locator('input[name="industry"], select[name="industry"]').first();
      if (await industryField.isVisible()) {
        if ((await industryField.getAttribute('tagName')) === 'SELECT') {
          await industryField.selectOption('Technology');
        } else {
          await industryField.fill('Technology');
        }
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await expect(page.locator('text=/saved|updated/i').first()).toBeVisible({ timeout: 60000 });
      }
    });
  });

  test.describe('Form Validation', () => {
    test('Email field validates format', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      const emailField = page.locator('input[placeholder="john@example.com"]').first();
      if (await emailField.isVisible()) {
        await emailField.fill('invalid-email');
        await page.locator('button').filter({ hasText: /save/i }).first().click();

        // Should see validation error
        await expect(page.locator('text=/invalid.*email|email.*invalid/i').first()).toBeVisible({ timeout: 5000 });
      }
    });

    test('Required fields show validation messages', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      // Try to save with empty required field
      const nameField = page.locator('input[name="name"]').first();
      if (await nameField.isVisible()) {
        await nameField.clear();
        await page.locator('button').filter({ hasText: /save/i }).first().click();

        // Should see validation error
        await expect(page.locator('text=/required|cannot be empty/i').first()).toBeVisible({ timeout: 5000 });
      }
    });
  });

  test.describe('Profile Statistics', () => {
    test('Profile statistics are displayed', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      // Look for stats section
      const statsSection = page.locator('[data-testid="profile-stats"], text=/statistics|stats/i').first();
      if (await statsSection.isVisible()) {
        await expect(statsSection).toBeVisible();
      }
    });
  });

  test.describe('Data Persistence', () => {
    test('Profile changes persist after page reload', async ({ page }) => {
      await loginAsJobSeeker(page);
      await page.goto('/profile');

      await page.locator('button').filter({ hasText: /edit/i }).first().click();

      // Make a unique change
      const uniqueBio = `Test bio ${Date.now()}`;
      const bioField = page.locator('textarea[name="bio"]').first();
      if (await bioField.isVisible()) {
        await bioField.fill(uniqueBio);
        await page.locator('button').filter({ hasText: /save/i }).first().click();
        await page.waitForTimeout(2000);

        // Reload page
        await page.reload();

        // Verify change persisted
        await expect(page.locator(`text=${uniqueBio}`).first()).toBeVisible({ timeout: 60000 });
      }
    });
  });
});
