import { test, expect } from '@playwright/test'

test.describe('New payment', () => {
    // Login
    // hook
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text = Sign in')                       // or alternatively:    await page.click("input[name='submit']")  
    })

    test('Successful login', async ({ page }) => {
        const signInBtn = page.locator("input[name='submit']")
        expect(signInBtn).not.toBeVisible
    })

    // 
    test('Should send new payment', async ({ page }) => {
        await page.click('#pay_bills_tab')
        await page.selectOption('#sp_payee', 'apple')            // pass 'value' for the option from the dropdown with with 'id'
        await page.click('#sp_get_payee_details')

        // 2 options for intermidiate small tests are possible here

        // 1 simple
        await page.waitForSelector('#sp_payee_details')

        // or 2 more detailed test
        const appleAccountDetails = page.locator('#sp_payee_details')
        await expect(appleAccountDetails).toContainText('For 48944145651315 Apple account')

        await page.selectOption('#sp_account', '6')
        await page.type('#sp_amount', '100')
        await page.type('#sp_date', '2022-11-11')
        await page.type('#sp_description', 'Test description')
        await page.click('#pay_saved_payees')

        const message = page.locator('#alert_content > span')
        expect(message).toBeVisible
        await expect(message).toContainText('The payment was successfully submitted.')
    })
})



// npx playwright test tests/e2e/e2e-payment.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                                  // to run the tests according to the script in 'package.json' file
// if '.only' is added to e.g. "test.describe.only"  =>  means that ONLY this test/file will be run from the folder)