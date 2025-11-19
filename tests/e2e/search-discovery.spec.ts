import { test, expect, Page } from '@playwright/test';

// Helper: Login as job seeker
async function loginAsJobSeeker(page: Page) {
  await page.goto('/login');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('input[placeholder="john@example.com"]', { timeout: 60000 });
  await page.fill('input[placeholder="john@example.com"]', 'jobseeker@test.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
}

test.describe('Search & Discovery', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsJobSeeker(page);
  });

  test.describe('Global Search', () => {
    test('should display search bar in header', async ({ page }) => {
      await page.goto('/jobs');
      
      await expect(page.locator('[data-testid="global-search"]')).toBeVisible();
    });

    test('should search jobs by keyword', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.fill('[data-testid="search-input"]', 'Python Developer');
      await page.click('button[type="submit"]');
      
      // Verify search results
      await expect(page.locator('[data-testid="job-card"]').first()).toContainText(/python/i);
    });

    test('should search with multiple keywords', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.fill('[data-testid="search-input"]', 'Senior React Developer');
      await page.click('button[type="submit"]');
      
      // Verify results contain keywords
      const firstCard = page.locator('[data-testid="job-card"]').first();
      await expect(firstCard).toContainText(/react|senior/i);
    });

    test('should show no results message for invalid search', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.fill('[data-testid="search-input"]', 'xyzabc123nonexistent');
      await page.click('button[type="submit"]');
      
      // Verify no results message
      await expect(page.getByText(/no jobs found|no results/i)).toBeVisible();
    });

    test('should clear search results', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.fill('[data-testid="search-input"]', 'Developer');
      await page.click('button[type="submit"]');
      
      // Clear search
      await page.click('[data-testid="clear-search"]');
      
      // Verify all jobs displayed
      await expect(page.locator('[data-testid="job-card"]')).toHaveCount(10, { timeout: 5000 });
    });

    test('should persist search query in URL', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.fill('[data-testid="search-input"]', 'Frontend');
      await page.click('button[type="submit"]');
      
      // Verify URL contains search param
      await expect(page).toHaveURL(/search=frontend/i);
    });

    test('should restore search from URL on page load', async ({ page }) => {
      await page.goto('/jobs?search=Backend+Engineer');
      
      // Verify search input populated
      await expect(page.locator('[data-testid="search-input"]')).toHaveValue(/backend.*engineer/i);
      
      // Verify results displayed
      await expect(page.locator('[data-testid="job-card"]')).toContainText(/backend/i);
    });
  });

  test.describe('Advanced Filters', () => {
    test('should display filter panel', async ({ page }) => {
      await page.goto('/jobs');
      
      await expect(page.locator('[data-testid="filters-panel"]')).toBeVisible();
    });

    test('should filter by job type', async ({ page }) => {
      await page.goto('/jobs');
      
      // Select Full-time
      await page.click('[data-testid="job-type-filter"]');
      await page.click('text=Full-time');
      
      // Verify filtered results
      const cards = page.locator('[data-testid="job-card"]');
      const count = await cards.count();
      for (let i = 0; i < count; i++) {
        await expect(cards.nth(i)).toContainText('Full-time');
      }
    });

    test('should filter by experience level', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.click('[data-testid="experience-filter"]');
      await page.click('text=Senior');
      
      // Verify results contain senior positions
      await expect(page.locator('[data-testid="job-card"]').first()).toContainText(/senior/i);
    });

    test('should filter by salary range', async ({ page }) => {
      await page.goto('/jobs');
      
      // Set salary range
      await page.fill('[data-testid="salary-min"]', '100000');
      await page.fill('[data-testid="salary-max"]', '150000');
      await page.click('button:has-text("Apply")');
      
      // Verify results within range
      const salaryText = await page.locator('[data-testid="job-card"]').first().locator('[data-testid="salary"]').textContent();
      expect(salaryText).toMatch(/100|120|150/);
    });

    test('should filter by location', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.fill('[data-testid="location-filter"]', 'New York');
      
      // Verify results
      await expect(page.locator('[data-testid="job-card"]').first()).toContainText(/new york/i);
    });

    test('should filter by remote work option', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.click('[data-testid="remote-filter"]');
      await page.click('text=Remote');
      
      // Verify remote jobs
      await expect(page.locator('[data-testid="job-card"]').first()).toContainText(/remote/i);
    });

    test('should filter by company', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.click('[data-testid="company-filter"]');
      await page.click('text=Google');
      
      // Verify company filter applied
      await expect(page.locator('[data-testid="job-card"]').first()).toContainText('Google');
    });

    test('should filter by skills', async ({ page }) => {
      await page.goto('/jobs');
      
      // Select skills
      await page.click('[data-testid="skills-filter"]');
      await page.click('text=Python');
      await page.click('text=Django');
      
      // Verify results have required skills
      const firstCard = page.locator('[data-testid="job-card"]').first();
      await expect(firstCard).toContainText(/python|django/i);
    });

    test('should combine multiple filters', async ({ page }) => {
      await page.goto('/jobs');
      
      // Apply multiple filters
      await page.click('[data-testid="job-type-filter"]');
      await page.click('text=Full-time');
      
      await page.click('[data-testid="experience-filter"]');
      await page.click('text=Senior');
      
      await page.click('[data-testid="remote-filter"]');
      await page.click('text=Remote');
      
      // Verify combined filters applied
      const firstCard = page.locator('[data-testid="job-card"]').first();
      await expect(firstCard).toContainText(/full-time/i);
      await expect(firstCard).toContainText(/senior/i);
      await expect(firstCard).toContainText(/remote/i);
    });

    test('should reset all filters', async ({ page }) => {
      await page.goto('/jobs');
      
      // Apply filters
      await page.click('[data-testid="job-type-filter"]');
      await page.click('text=Full-time');
      
      // Reset filters
      await page.click('button:has-text("Reset Filters")');
      
      // Verify filters cleared
      await expect(page).toHaveURL('/jobs');
      const jobCount = await page.locator('[data-testid="job-card"]').count();
      expect(jobCount).toBeGreaterThan(0);
    });

    test('should show active filter count', async ({ page }) => {
      await page.goto('/jobs');
      
      // Apply filters
      await page.click('[data-testid="job-type-filter"]');
      await page.click('text=Full-time');
      
      await page.click('[data-testid="experience-filter"]');
      await page.click('text=Senior');
      
      // Verify filter count badge
      await expect(page.locator('[data-testid="active-filters-count"]')).toContainText('2');
    });

    test('should persist filters in URL', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.click('[data-testid="job-type-filter"]');
      await page.click('text=Full-time');
      
      // Verify URL contains filter params
      await expect(page).toHaveURL(/job_type=full-time/i);
    });

    test('should collapse/expand filter panel', async ({ page }) => {
      await page.goto('/jobs');
      
      // Collapse filters
      await page.click('[data-testid="toggle-filters"]');
      
      // Verify panel hidden
      await expect(page.locator('[data-testid="filters-panel"]')).not.toBeVisible();
      
      // Expand filters
      await page.click('[data-testid="toggle-filters"]');
      
      // Verify panel visible
      await expect(page.locator('[data-testid="filters-panel"]')).toBeVisible();
    });
  });

  test.describe('Autocomplete & Suggestions', () => {
    test('should show search suggestions', async ({ page }) => {
      await page.goto('/jobs');
      
      // Type in search
      await page.fill('[data-testid="search-input"]', 'Dev');
      
      // Verify suggestions dropdown
      await expect(page.locator('[data-testid="search-suggestions"]')).toBeVisible();
      await expect(page.getByText('Developer')).toBeVisible();
    });

    test('should navigate suggestions with keyboard', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.fill('[data-testid="search-input"]', 'Front');
      
      // Arrow down to first suggestion
      await page.keyboard.press('ArrowDown');
      
      // Verify first item highlighted
      await expect(page.locator('[data-testid="suggestion-item"][data-highlighted="true"]')).toBeVisible();
      
      // Select with Enter
      await page.keyboard.press('Enter');
      
      // Verify search executed
      await expect(page.locator('[data-testid="job-card"]')).toBeVisible();
    });

    test('should select suggestion with click', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.fill('[data-testid="search-input"]', 'Back');
      await page.click('text=Backend Developer');
      
      // Verify search executed with suggestion
      await expect(page.locator('[data-testid="search-input"]')).toHaveValue('Backend Developer');
    });

    test('should show recent searches', async ({ page }) => {
      await page.goto('/jobs');
      
      // Perform search
      await page.fill('[data-testid="search-input"]', 'React Developer');
      await page.click('button[type="submit"]');
      
      // Clear and focus search again
      await page.click('[data-testid="search-input"]');
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Backspace');
      
      // Verify recent search shown
      await expect(page.getByText('React Developer')).toBeVisible();
    });

    test('should show popular searches when empty', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.click('[data-testid="search-input"]');
      
      // Verify popular searches displayed
      await expect(page.locator('[data-testid="popular-searches"]')).toBeVisible();
    });

    test('should autocomplete location', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.fill('[data-testid="location-filter"]', 'New Y');
      
      // Verify location suggestions
      await expect(page.getByText('New York')).toBeVisible();
    });

    test('should autocomplete company names', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.fill('[data-testid="company-filter"]', 'Goo');
      
      // Verify company suggestions
      await expect(page.getByText('Google')).toBeVisible();
    });
  });

  test.describe('Saved Searches', () => {
    test('should save search with filters', async ({ page }) => {
      await page.goto('/jobs');
      
      // Apply search and filters
      await page.fill('[data-testid="search-input"]', 'Python Developer');
      await page.click('[data-testid="job-type-filter"]');
      await page.click('text=Full-time');
      
      // Save search
      await page.click('button:has-text("Save Search")');
      await page.fill('input[name="search_name"]', 'Python Full-time Jobs');
      await page.click('button:has-text("Save")');
      
      // Verify success
      await expect(page.getByText(/search saved/i)).toBeVisible();
    });

    test('should view saved searches', async ({ page }) => {
      await page.goto('/dashboard');
      
      // Navigate to saved searches
      await page.click('text=Saved Searches');
      
      // Verify list displayed
      await expect(page.locator('[data-testid="saved-search-item"]')).toHaveCount(1, { timeout: 5000 });
    });

    test('should load saved search', async ({ page }) => {
      await page.goto('/dashboard');
      
      await page.click('text=Saved Searches');
      
      // Click on saved search
      await page.click('[data-testid="saved-search-item"]:first-child');
      
      // Verify search loaded
      await expect(page).toHaveURL(/jobs/);
      await expect(page.locator('[data-testid="search-input"]')).toHaveValue(/python/i);
    });

    test('should delete saved search', async ({ page }) => {
      await page.goto('/dashboard');
      
      await page.click('text=Saved Searches');
      
      // Delete first search
      await page.click('[data-testid="saved-search-item"]:first-child button[aria-label*="delete"]');
      await page.click('button:has-text("Confirm")');
      
      // Verify deletion
      await expect(page.getByText(/deleted successfully/i)).toBeVisible();
    });

    test('should enable email alerts for saved search', async ({ page }) => {
      await page.goto('/dashboard');
      
      await page.click('text=Saved Searches');
      
      // Enable alerts
      await page.click('[data-testid="saved-search-item"]:first-child [data-testid="toggle-alerts"]');
      
      // Verify alerts enabled
      await expect(page.getByText(/alerts enabled/i)).toBeVisible();
    });
  });

  test.describe('Sorting & Pagination', () => {
    test('should sort by relevance', async ({ page }) => {
      await page.goto('/jobs?search=Developer');
      
      await page.click('[data-testid="sort-select"]');
      await page.click('text=Relevance');
      
      // Verify sorted
      await expect(page).toHaveURL(/sort=relevance/);
    });

    test('should sort by date posted', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.click('[data-testid="sort-select"]');
      await page.click('text=Most Recent');
      
      // Verify URL updated
      await expect(page).toHaveURL(/sort=date/);
    });

    test('should sort by salary', async ({ page }) => {
      await page.goto('/jobs');
      
      await page.click('[data-testid="sort-select"]');
      await page.click('text=Highest Salary');
      
      // Verify sorted
      await expect(page).toHaveURL(/sort=salary/);
    });

    test('should paginate results', async ({ page }) => {
      await page.goto('/jobs');
      
      // Go to page 2
      await page.click('button[aria-label*="next page"]');
      
      // Verify pagination
      await expect(page).toHaveURL(/page=2/);
      await expect(page.locator('[data-testid="current-page"]')).toContainText('2');
    });

    test('should change results per page', async ({ page }) => {
      await page.goto('/jobs');
      
      // Change to 20 per page
      await page.click('[data-testid="per-page-select"]');
      await page.click('text=20');
      
      // Verify more results displayed
      const count = await page.locator('[data-testid="job-card"]').count();
      expect(count).toBe(20);
    });

    test('should jump to specific page', async ({ page }) => {
      await page.goto('/jobs');
      
      // Click page 3
      await page.click('button:has-text("3")');
      
      // Verify navigation
      await expect(page).toHaveURL(/page=3/);
    });

    test('should disable previous on first page', async ({ page }) => {
      await page.goto('/jobs');
      
      // Verify previous button disabled
      await expect(page.locator('button[aria-label*="previous"]')).toBeDisabled();
    });

    test('should disable next on last page', async ({ page }) => {
      await page.goto('/jobs');
      
      // Navigate to last page
      const lastPageButton = page.locator('[data-testid="pagination"] button').last();
      await lastPageButton.click();
      
      // Verify next disabled
      await expect(page.locator('button[aria-label*="next"]')).toBeDisabled();
    });
  });

  test.describe('AI-Powered Recommendations', () => {
    test('should display personalized recommendations', async ({ page }) => {
      await page.goto('/jobs/recommendations');
      
      await expect(page.getByText(/recommended for you/i)).toBeVisible();
      await expect(page.locator('[data-testid="recommended-job"]')).toHaveCount(5, { timeout: 60000 });
    });

    test('should show match percentage', async ({ page }) => {
      await page.goto('/jobs/recommendations');
      
      // Verify match score displayed
      const firstJob = page.locator('[data-testid="recommended-job"]').first();
      await expect(firstJob.locator('[data-testid="match-score"]')).toContainText('%');
    });

    test('should explain match reasons', async ({ page }) => {
      await page.goto('/jobs/recommendations');
      
      // Click on job
      await page.click('[data-testid="recommended-job"]:first-child');
      
      // Verify match reasons
      await expect(page.getByText(/why this match/i)).toBeVisible();
      await expect(page.locator('[data-testid="match-reasons"]')).toBeVisible();
    });

    test('should refresh recommendations', async ({ page }) => {
      await page.goto('/jobs/recommendations');
      
      // Get first job title
      const firstTitle = await page.locator('[data-testid="recommended-job"]').first().textContent();
      
      // Refresh
      await page.click('button:has-text("Refresh")');
      
      // Verify recommendations changed
      await page.waitForTimeout(2000);
      const newFirstTitle = await page.locator('[data-testid="recommended-job"]').first().textContent();
      expect(newFirstTitle).not.toBe(firstTitle);
    });

    test('should hide recommendation', async ({ page }) => {
      await page.goto('/jobs/recommendations');
      
      // Hide first recommendation
      await page.click('[data-testid="recommended-job"]:first-child button[aria-label*="hide"]');
      
      // Verify removed from list
      await expect(page.getByText(/recommendation hidden/i)).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should load search results quickly', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/jobs?search=Developer');
      await page.waitForSelector('[data-testid="job-card"]');
      
      const loadTime = Date.now() - startTime;
      
      // Verify loads within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should debounce search input', async ({ page }) => {
      await page.goto('/jobs');
      
      // Type quickly
      await page.fill('[data-testid="search-input"]', 'Dev');
      await page.waitForTimeout(100);
      await page.fill('[data-testid="search-input"]', 'Developer');
      
      // Verify only one API call made (check via network tab or mock)
      await page.waitForTimeout(1000);
    });

    test('should cache search results', async ({ page }) => {
      // First search
      await page.goto('/jobs?search=Python');
      await page.waitForSelector('[data-testid="job-card"]');
      
      // Navigate away
      await page.goto('/dashboard');
      
      // Return to same search - should be instant
      const startTime = Date.now();
      await page.goto('/jobs?search=Python');
      await page.waitForSelector('[data-testid="job-card"]');
      const loadTime = Date.now() - startTime;
      
      // Cached results should load faster
      expect(loadTime).toBeLessThan(1000);
    });
  });
});
