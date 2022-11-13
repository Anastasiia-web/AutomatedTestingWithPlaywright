import { test, expect } from '@playwright/test'

test('Simple basic test', async ({ page }) => {
    // test code
    await page.goto('https://www.example.com')  // open and load the page
    const pageTitle = await page.locator('h1')  // access to the selector by creating a variable
    await expect(pageTitle).toContainText('Example Domain')
})   // to run the test: command in the terminal "npx playwright test"
// to open a browser during testing add flag "npx playwright test --headed"
// to change a browser "npx playwright test --browser=firefox"
// to combine "npx playwright test --headed --browser=firefox"
// to combine "npx playwright test --headed --browser=all"
// to run specific test "npx playwright test tests/example.spec.ts"

test('Clicking on Elements', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')  // open and load the page
    await page.click('#signin_button')
    await page.click('text = Sign in')
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})