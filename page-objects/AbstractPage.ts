// created for superconstructor (class inheritance purpose)
import { Page, Locator, expect } from '@playwright/test'                 // Locator, expect are not used for now, can be deleted

export class AbstractPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async wait(time) {
        await this.page.waitForTimeout(time)
    }
}