import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'      // importing class created
import { HomePage } from '../../page-objects/HomePage'
import { CurrencyExchangePage } from '../../page-objects/CurrencyExchangePage'
import { Navbar } from '../../page-objects/components/Navbar'


test.describe('Should exchange currency', () => {
    // login
    let homePage: HomePage
    let loginPage: LoginPage
    let currencyExchangePage: CurrencyExchangePage
    let navbar: Navbar

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        currencyExchangePage = new CurrencyExchangePage(page)
        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.clickSignIn()
        await loginPage.login('username', 'password')
    })

    test('Successful login', async ({ page }) => {
        await loginPage.successfulLogin()
    })

    test('Should make currency exchange', async ({ page }) => {
        await navbar.clickOnTab('Pay Bills')            // await page.click('#pay_bills_tab')
        await currencyExchangePage.currencyExchange()
    })
})


// npx playwright test tests/e2e/e2e-currency-exchange.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                                  // to run the tests according to the script in 'package.json' file
// if '.only' is added to e.g. "test.describe.only"  =>  means that ONLY this test/file will be run from the folder)