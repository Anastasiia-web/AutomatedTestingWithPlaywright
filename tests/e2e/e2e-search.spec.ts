import { test, expect } from '@playwright/test'

test.describe('Search results', () => {
    // hook
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
    })
    // Search function test (positive)
    test('Should find search results', async ({ page }) => {
        // await page.goto('http://zero.webappsecurity.com/index.html')   // if no hook before the test
        await page.type('#searchTerm', 'bank')
        await page.keyboard.press('Enter')                    // function for using keyboard in Playwright tests

        const numberOfLinks = await page.locator('li > a')    // when there's no id/name/type  => 'li > a' for a list of 'a href' is possible
        await expect(numberOfLinks).toHaveCount(2)
    })
    // Search function test (negative)
    test('Should not find search result', async ({ page }) => {
        await page.type('#searchTerm', 'fghg')
        await page.keyboard.press('Enter')

        const searchResults = await page.locator('.top_offset')
        await expect(searchResults).toContainText('No results were found for the query:')
    })
})

// npx playwright test tests/e2e/e2e-search.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                     // to run the tests according to the script in 'package.json' file
// if '.only' is added to e.g. "test.describe.only"  =>  means that ONLY this test/file will be run from the folder