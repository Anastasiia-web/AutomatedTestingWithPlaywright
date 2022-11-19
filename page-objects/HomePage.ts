import { expect, Locator, Page } from '@playwright/test'   // for now 'expect' is not used (just in case not to forget to import for the future tests)

export class HomePage {
    // create variables
    readonly page: Page              // page (variable name we create): Page (type)
    readonly signInButton: Locator   // signInButton (variable name we create): Locator (type)
    readonly searchField: Locator         // search (variable name we create): Locator (type)

    // create constructor
    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator('#signin_button')
        this.searchField = page.locator('#searchTerm')
    }

    // create functions
    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/')
    }

    async clickSignIn() {
        await this.signInButton.click()
    }

    async searchFor(phrase: string) {
        await this.searchField.type(phrase)
        await this.page.keyboard.press('Enter')                       // simulating keyboard press 'Enter'
    }
}