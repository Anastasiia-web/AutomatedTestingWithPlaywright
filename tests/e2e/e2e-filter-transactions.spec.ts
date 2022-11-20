import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'      // importing class created
import { HomePage } from '../../page-objects/HomePage'


test.describe("Filter transactions", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    // hook
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickSignIn()
        await loginPage.login('username', 'password')
    })

    test('Successful login', async ({ page }) => {
        await loginPage.successfulLogin()
    })

    test('Verify the results for each account', async ({ page }) => {
        // await page.click('#transfer_funds_link')                // or  click('text=Transfer Funds')  
        await page.click('#account_activity_tab')
        await page.selectOption('#aa_accountId', '2')           // for option in dropdown choose the 'value' needed
        const checkingAccount = page.locator('#all_transactions_for_account tbody tr') // test for tables (inside a div a table with 3 items)
        // test for tables (inside a div a table with 3 items)
        await expect(checkingAccount).toHaveCount(3)

        await page.selectOption('#aa_accountId', '4')           // for option in dropdown choose the 'value' needed
        const loanAccount = page.locator('#all_transactions_for_account tbody tr')
        await expect(loanAccount).toHaveCount(2)

        await page.selectOption('#aa_accountId', '6')           // for option in dropdown choose the 'value' needed
        const noResults = page.locator('.well')
        expect(noResults).toBeVisible
    })
})


// npx playwright test tests/e2e/e2e-filter-transactions.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                                  // to run the tests according to the script in 'package.json' file
// if '.only' is added to e.g. "test.describe.only"  =>  means that ONLY this test/file will be run from the folder)