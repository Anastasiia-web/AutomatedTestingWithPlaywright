import { expect, Page, Locator } from '@playwright/test'

export class TransferPage {
    readonly page: Page
    readonly transferFundsLink: Locator
    readonly fromAccountDropdown: Locator
    readonly toAccountDropdown: Locator
    readonly amountInput: Locator
    readonly descriptionInput: Locator
    readonly submitTransferButton: Locator
    readonly boardHeader: Locator
    readonly alertSuccess: Locator

    constructor(page: Page) {
        this.page = page
        this.transferFundsLink = page.locator('text=Transfer Funds')
        this.fromAccountDropdown = page.locator('#tf_fromAccountId')
        this.toAccountDropdown = page.locator('#tf_toAccountId')
        this.amountInput = page.locator('#tf_amount')
        this.descriptionInput = page.locator('#tf_description')
        this.submitTransferButton = page.locator('#btn_submit')
        this.boardHeader = page.locator('h2.board-header')
        this.alertSuccess = page.locator('.alert-success')
    }

    async transferFunds() {
        await this.transferFundsLink.click()
        await this.fromAccountDropdown.selectOption('2')
        await this.toAccountDropdown.selectOption('3')
        await this.amountInput.type('100')
        await this.descriptionInput.type('Test funds transfer')
        await this.submitTransferButton.click()

        await expect(this.boardHeader).toContainText('Verify')

        await this.submitTransferButton.click()
    }

    async successAlert() {
        await expect(this.alertSuccess).toContainText('You successfully submitted your transaction.')
    }
}