import { test, expect } from '@playwright/test'                  // expect is not used for now, can be deleted
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe('Feedback form', () => {

    let homePage: HomePage
    let feedbackPage: FeedbackPage
    // hook
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homePage.visit()
        await homePage.feedbackForm()
    })
    // Reset feedback form test
    test('Reset feedback form', async ({ page }) => {
        await feedbackPage.fillingForm(
            'User',
            'a@gmail.com',
            'Test subject',
            'Test comment')

        await feedbackPage.resetFilledForm()
        await feedbackPage.assertReset()
    })

    // Submit feedback form test
    test('Submit feedback form', async ({ page }) => {
        await feedbackPage.fillingForm(
            'User',
            'testsautomation7@gmail.com',
            'Test subject',
            'Test comment')

        await feedbackPage.submitFilledForm()
        await feedbackPage.submitFormSuccess()
    })
})

// npx playwright test tests/e2e/e2e-submit-form.spec.ts      // to run the tests from a paticular folder
// npm run tests:e2e                                          // to run the tests according to the script in 'package.json' file