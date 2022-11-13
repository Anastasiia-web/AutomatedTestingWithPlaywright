import { test, expect } from '@playwright/test'

test.describe('Feedback form', () => {
    // hook
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#feedback')
    })
    // Reset feedback form test
    test('Reset feedback form', async ({ page }) => {
        await page.type('#name', 'User')
        await page.type('#email', 'a@gmail.com')
        await page.type('#subject', 'Test subject')
        await page.type('#comment', 'Test comment')

        await page.click("input[name='clear']")   // if there's no id or a class is generic as "btn"   => "input[name='somename']"

        const nameInput = await page.locator('#name')
        const commentInput = await page.locator('#comment')

        await expect(nameInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()
    })

    // Submit feedback form test
    test('Submit feedback form', async ({ page }) => {
        await page.type('#name', 'User')
        await page.type('#email', 'testsautomation7@gmail.com')
        await page.type('#subject', 'Test subject')
        await page.type('#comment', 'Test comment')

        await page.click("input[type='submit']")
        await page.waitForSelector('#feedback-title')         // visible after sending the feedback form => works as 'expect' here (shorter assertion version)
    })
})

// npx playwright test tests/e2e/e2e-submit-form.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                          // to run the tests according to the script in 'package.json' file