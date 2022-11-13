import { test, expect } from '@playwright/test'

test.describe('Transfer funds and make payments', () => {
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

    test('Transfer funds', async ({ page }) => {
        await page.click('#transfer_funds_link')                // or  click('text=Transfer Funds')  
        await page.click('#transfer_funds_tab')
        await page.selectOption('#tf_fromAccountId', '2')         // for option in dropdown choose the 'value' needed
        await page.selectOption('#tf_toAccountId', '3')           // for option in dropdown choose the 'value' needed
        await page.type('#tf_amount', '100')
        await page.type('#tf_description', 'Test funds transfer')
        await page.click('#btn_submit')

        const boardHeader = page.locator('h2.board-header')
        await expect(boardHeader).toContainText('Verify')

        await page.click('#btn_submit')

        const message = page.locator('.alert-success')
        await expect(message).toContainText('You successfully submitted your transaction.')
    })
})


// npx playwright test tests/e2e/e2e-transfer-funds.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                     // to run the tests according to the script in 'package.json' file
// if '.only' is added to e.g. "test.describe.only"  =>  means that ONLY this test/file will be run from the folder