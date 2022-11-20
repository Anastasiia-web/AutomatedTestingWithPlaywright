import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'                              // needed to use 'page' for superconstructor

export class PaymentPage extends AbstractPage {
    // readonly page: Page                                                 // 'page' is used now from 'AbstractPage.ts by superconstructor
    readonly payeeDropdown: Locator
    readonly payeeDetails: Locator
    readonly appleAccountDetails: Locator
    readonly accountDropdown: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly message: Locator

    constructor(page: Page) {
        // this.page = page
        super(page)                                                        // superconstractor created for using 'page' from 'AbstractPage.ts'
        this.payeeDropdown = page.locator('#sp_payee')
        this.payeeDetails = page.locator('#sp_get_payee_details')
        this.appleAccountDetails = page.locator('#sp_payee_details')
        this.accountDropdown = page.locator('#sp_account')
        this.amountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator('#sp_description')
        this.submitPaymentButton = page.locator('#pay_saved_payees')
        this.message = page.locator('#alert_content > span')
    }

    // Define methods

    async createPayment() {
        await this.payeeDropdown.selectOption('apple')

        await this.payeeDetails.click()
        await expect(this.appleAccountDetails).toContainText('For 48944145651315 Apple account')

        await this.accountDropdown.selectOption('6')
        await this.amountInput.type('100')
        await this.dateInput.type('2022-11-11')
        await this.descriptionInput.type('Test description')
        await this.submitPaymentButton.click()
    }

    async succesfulPayment() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('The payment was successfully submitted.')
    }
}