import { expect, Locator, Page } from '@playwright/test'

export class FeedbackPage {
    // Define selectors
    readonly page: Page
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly subjectInput: Locator
    readonly commentInput: Locator
    readonly submitFormButton: Locator
    readonly resetFormButton: Locator
    readonly submitSuccess: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.nameInput = page.locator('#name')
        this.emailInput = page.locator('#email')
        this.subjectInput = page.locator('#subject')
        this.commentInput = page.locator('#comment')
        this.submitFormButton = page.locator("input[type='submit']")  // if there's no id or a class is generic as "btn"   => "input[name='somename']"
        this.resetFormButton = page.locator("input[name='clear']")
        this.submitSuccess = page.locator('#feedback-title')
    }

    // Define methods

    async fillingForm(name: string, email: string, subject: string, comment: string) {
        await this.nameInput.type(name)
        await this.emailInput.type(email)
        await this.nameInput.type(subject)
        await this.emailInput.type(comment)
    }

    async resetFilledForm() {
        await this.resetFormButton.click()
    }

    async submitFilledForm() {
        await this.submitFormButton.click()
    }

    async submitFormSuccess() {
        await expect(this.submitSuccess).toBeVisible()           // await page.waitForSelector('#feedback-title') // visible after sending the feedback form => works as 'expect' here (shorter assertion version)
    }

    async assertReset() {
        await expect(this.nameInput).toBeEmpty()
        await expect(this.commentInput).toBeEmpty()
    }
}