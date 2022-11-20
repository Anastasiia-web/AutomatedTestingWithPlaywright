import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'      // importing class created
import { HomePage } from '../../page-objects/HomePage'
import { Navbar } from '../../page-objects/components/Navbar'
import { PaymentPage } from '../../page-objects/PaymentPage'

test.describe('New payment', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let navbar: Navbar
    let paymentPage: PaymentPage

    // Login
    // hook
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navbar = new Navbar(page)
        paymentPage = new PaymentPage(page)

        await homePage.visit()
        await homePage.clickSignIn()
        await loginPage.login('username', 'password')
    })

    test('Successful login', async ({ page }) => {
        await loginPage.successfulLogin()
    })

    // 
    test('Should send new payment', async ({ page }) => {
        await navbar.clickOnTab('Pay Bills')

        await paymentPage.createPayment()
        await paymentPage.succesfulPayment()
    })
})



// npx playwright test tests/e2e/e2e-payment.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                                  // to run the tests according to the script in 'package.json' file
// if '.only' is added to e.g. "test.describe.only"  =>  means that ONLY this test/file will be run from the folder)