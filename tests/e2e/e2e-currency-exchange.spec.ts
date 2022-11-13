import { test, expect } from '@playwright/test'

test.describe('Should exchange currency', () => {
    // login
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text = Sign in')
    })

    test('Successful login', async ({ page }) => {
        const accountSummaryTab = page.locator('#account_summary_tab')
        expect(accountSummaryTab).toBeVisible
    })

    test('Should make currency exchange', async ({ page }) => {
        await page.click('#pay_bills_tab')
        await page.click('text = Purchase Foreign Currency')

        const boardHeader = page.locator('#ui-tabs-3 > .board-header')
        await expect(boardHeader).toContainText('Purchase foreign currency cash')

        await page.selectOption('#pc_currency', 'EUR')
        // await page.waitForSelector('#sp_sell_rate')              // simple intermediate test
        const rate = page.locator('#sp_sell_rate')                  // test for checking exactly euro's rate
        await expect(rate).toContainText('1 euro (EUR)')

        await page.type('#pc_amount', '10')
        await page.click('#pc_inDollars_true')

        await page.click('#pc_calculate_costs')

        const conversionAmount = page.locator('#pc_conversion_amount')
        expect(conversionAmount).toBeVisible
        await expect(conversionAmount).toContainText('10.00 U.S. dollar (USD)')

        await page.click('#purchase_cash')

        const message = page.locator('#alert_content')
        expect(message).toBeVisible
        await expect(message).toContainText('Foreign currency cash was successfully purchased.')
    })
})


// npx playwright test tests/e2e/e2e-currency-exchange.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                                  // to run the tests according to the script in 'package.json' file
// if '.only' is added to e.g. "test.describe.only"  =>  means that ONLY this test/file will be run from the folder)