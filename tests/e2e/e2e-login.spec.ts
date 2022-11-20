import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'      // importing class created
import { HomePage } from '../../page-objects/HomePage'        // importing class created

// test.describe - for test suit
// test.describe.parallel - for tests executing in parallel to increase test execution speed
test.describe.parallel('Login / Logout Flow', () => {
    // creating variables for using classes
    let loginPage: LoginPage
    let homePage: HomePage

    // Creating Before Hook to avoid duplication as we're working with the same page in 2 tests
    test.beforeEach(async ({ page }) => {
        // initiating using the created constructors from imported classes
        loginPage = new LoginPage(page)                           // access to consructor created in LoginPage.ts from 'page-objects' folder
        homePage = new HomePage(page)                             // access to consructor created in LoginPage.ts from 'page-objects' folder

        await homePage.visit()                                    // using the method created in 'HomePage.ts' from 'page-objects' folder
    })

    // Negative Scenario
    test('Negative Scenario for login', async ({ page }) => {
        // use methods from imported classes
        await homePage.clickSignIn()
        await loginPage.login('invalid username', 'invalid password')
        await loginPage.wait(3000)                                // 3 sec
        await loginPage.assertErrorMessage()
    })

    // Positive scenario + Logout from the application // http://zero.webappsecurity.com/
    test('Positive Scenario for login + logout', async ({ page }) => {
        await homePage.clickSignIn()
        await loginPage.login('username', 'password')

        await loginPage.successfulLogin()

        await page.goto('http://zero.webappsecurity.com/logout.html')               // logout test 
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')   // redirect to login page after logout
    })
})
// npx playwright test tests/e2e/e2e-login.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                    // to run the tests according to the script in 'package.json' file
// can be    test.describe.parallel.only   for running ONLY this test suit
