import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe.only('Search results', () => {
    let homePage: HomePage
    // hook
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.visit()
    })
    // Search function test (positive)
    test('Should find search results', async ({ page }) => {
        await homePage.searchFor('bank')

        const numberOfLinks = page.locator('li > a') // when there's no id/name/type  => 'li > a' for a list of 'a href' is possible
        await expect(numberOfLinks).toHaveCount(2)
    })
    // Search function test (negative)
    test('Should not find search result', async ({ page }) => {
        await homePage.searchFor('fghg')

        const searchResults = page.locator('.top_offset')
        await expect(searchResults).toContainText('No results were found for the query:')
    })
})

// npx playwright test tests/e2e/e2e-search.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                     // to run the tests according to the script in 'package.json' file
// if '.only' is added to e.g. "test.describe.only"  =>  means that ONLY this test/file will be run from the folder