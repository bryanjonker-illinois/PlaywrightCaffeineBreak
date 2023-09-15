// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

// pulled from example -- not categorized
test('Check Index Heading', async ({ page }) => {
  await page.goto('./index.html');
  await expect(page.getByRole('heading', { name: 'Playwright and Caffeine Break' })).toBeVisible();
});

// pulled from example -- not categorized, shows how to navigate through items
test('Navigate through other pages', async ({ page }) => {
  await page.goto('./index.html');
  await page.getByRole('link', { name: 'See details' }).click();
  await expect(page.getByRole('heading', { name: 'Some details about Playwright' })).toBeVisible();
});

// how to create screenshots with playwright
test.describe('screenshots', () => {
  test('index hero area', async ({ page }) => {
    await page.goto('./index.html');
  
    await page.locator('il-hero').screenshot({ path: 'hero_screenshot.png' });
  });
  test('details', async ({ page }) => {
    await page.goto('./details.html');
    await page.getByTestId('test-subject').click();
    await page.screenshot({ path: 'details_screenshot.png' });
  });
})

// testing the 'beforeEach', pretending that you have to go through the index.html page
test.describe('test beforeEach', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./index.html');
    await page.getByRole('link', { name: 'See details' }).click();
  });

  test('details nothing showing', async ({ page }) => {
    await expect(page.getByTestId('test-information')).toBeHidden();
  });

  test('details with first item showing', async ({ page }) => {
    await page.getByTestId('test-subject').click();
    await expect(page.getByTestId('test-information')).toBeVisible();
  });
})

// accessibility tests
test.describe('accessibility', () => { 
  test('check accessibility issues on index', async ({ page }) => {
    await page.goto('./index.html'); 
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
    expect(accessibilityScanResults.violations).toEqual([]); 
  });
  test('check accessibility issues on detail', async ({ page }) => {
    await page.goto('./detail.html'); 
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 
    expect(accessibilityScanResults.violations).toEqual([]); 
  });
});

