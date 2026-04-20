import { test, expect } from '@playwright/test';

test.describe('Login E2E', () => {
  test('should login as admin successfully with valid static credentials', async ({ page }) => {
    // Navigate to the frontend dev server URL
    await page.goto('http://localhost:5173/');

    // Since localhost:5173 might point to a welcome page or login page directly
    // Let's assume it renders Login or we need to navigate there. 
    // In many React apps, '/' is the login page.
    
    // Playwright selects elements. The inputs use placeholders:
    await page.getByPlaceholder('Enter Username').fill('admin');
    await page.getByPlaceholder('Enter User ID').fill('admin123');
    await page.getByPlaceholder('Enter your password').fill('password');

    // Click the Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify successful navigation by checking the URL
    await expect(page).toHaveURL(/welcomeadmin/);
  });
  
  test('should show alert on invalid login credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Intercept window.alert to perform assertions on it
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Invalid credentials');
      await dialog.accept();
    });

    await page.getByPlaceholder('Enter Username').fill('wronguser');
    await page.getByPlaceholder('Enter User ID').fill('wrongid');
    await page.getByPlaceholder('Enter your password').fill('wrongpass');

    await page.getByRole('button', { name: 'Login' }).click();
  });
});
