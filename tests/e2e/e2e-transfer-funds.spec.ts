import { test, expect } from '@playwright/test'               // expect is not used for now, can be deleted
import { LoginPage } from '../../page-objects/LoginPage'      // importing class created
import { HomePage } from '../../page-objects/HomePage'
import { TransferPage } from '../../page-objects/TransferPage'

test.describe('Transfer funds and make payments', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let transferPage: TransferPage

    // hook
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        transferPage = new TransferPage(page)

        await homePage.visit()
        await homePage.clickSignIn()
        await loginPage.login('username', 'password')
    })

    test('Successful login', async ({ page }) => {
        await loginPage.successfulLogin()
    })

    test('Transfer funds', async ({ page }) => {
        await transferPage.transferFunds()
        await transferPage.successAlert()
    })
})


// npx playwright test tests/e2e/e2e-transfer-funds.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                     // to run the tests according to the script in 'package.json' file
// if '.only' is added to e.g. "test.describe.only"  =>  means that ONLY this test/file will be run from the folder