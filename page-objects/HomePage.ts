import { expect, Locator, Page } from '@playwright/test' // for now 'expect' is not used (in case not to forget for the future tests)
import { AbstractPage } from './AbstractPage'            // needed to use 'page' for superconstructor

export class HomePage extends AbstractPage {
    // create variables
    // readonly page: Page                               // page (variable name we create): Page (type)// used(if there's no superconstructor)
    readonly signInButton: Locator                       // signInButton (variable name we create): Locator (type)
    readonly searchField: Locator                        // search (variable name we create): Locator (type)
    readonly feedbackFormButton: Locator                 // search (variable name we create): Locator (type)

    // create constructor
    constructor(page: Page) {
        // this.page = page                              // is used if there's no superconstractor
        super(page)
        this.signInButton = page.locator('#signin_button')
        this.searchField = page.locator('#searchTerm')
        this.feedbackFormButton = page.locator('#feedback')
    }

    // create functions/methods
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

    async feedbackForm() {
        await this.feedbackFormButton.click()
    }
}