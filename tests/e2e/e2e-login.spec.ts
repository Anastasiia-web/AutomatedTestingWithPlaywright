import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'

// test.describe - for test suit
// test.describe.parallel - for tests executing in parallel to increase test execution speed
test.describe.parallel.only('Login / Logout Flow', () => {

    let loginPage: LoginPage

    // Creating Before Hook to avoid duplication as we're working with the same page in 2 tests
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)                               // access to consructor from LoginPage.ts from 'page-objects' folder
        await loginPage.visit()                                       // using the method created in 'LoginPage.ts' from 'page-objects' folder
    })

    // Negative Scenario
    test('Negative Scenario for login', async ({ page }) => {
        await page.click('#signin_button')
        await page.type('#user_login', 'invalid name')
        await page.type('#user_password', 'invalid')
        await page.click('.btn-primary')

        const errorMessage = page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })

    // Positive scenario + Logout from the application // http://zero.webappsecurity.com/
    test('Positive Scenario for login + logout', async ({ page }) => {
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text = Sign in')

        const accountSummaryTab = page.locator('#account_summary_tab')
        expect(accountSummaryTab).toBeVisible

        await page.goto('http://zero.webappsecurity.com/logout.html')     // logout test 
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')   // redirect to login page after logout
    })
})
// npx playwright test tests/e2e/e2e-login.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                    // to run the tests according to the script in 'package.json' file
// can be    test.describe.parallel.only   for running ONLY this test suit
