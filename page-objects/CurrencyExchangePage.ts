import { Page, Locator, expect } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class CurrencyExchangePage extends AbstractPage {
    // readonly page: Page                                             // 'page' is used from 'AbstractPage.ts by superconstructor
    readonly purchaseForeignCurrencyLink: Locator
    readonly boardHeader: Locator
    readonly currencySelectorDropdown: Locator
    readonly sellRate: Locator
    readonly amountInput: Locator
    readonly dollarsSelector: Locator
    readonly costCalculationButton: Locator
    readonly conversionAmount: Locator
    readonly purchaseButton: Locator
    readonly alert: Locator

    constructor(page: Page) {
        // this.page = page
        super(page)                                                     // 'page' is used from 'AbstractPage.ts by superconstructor
        this.purchaseForeignCurrencyLink = page.locator('text = Purchase Foreign Currency')
        this.boardHeader = page.locator('#ui-tabs-3 > .board-header')
        this.currencySelectorDropdown = page.locator('#pc_currency')
        this.sellRate = page.locator('#sp_sell_rate')
        this.amountInput = page.locator('#pc_amount')
        this.dollarsSelector = page.locator('#pc_inDollars_true')
        this.costCalculationButton = page.locator('#pc_calculate_costs')
        this.conversionAmount = page.locator('#pc_conversion_amount')
        this.purchaseButton = page.locator('#purchase_cash')
        this.alert = page.locator('#alert_content')
    }

    async currencyExchange() {
        await this.purchaseForeignCurrencyLink.click()

        await expect(this.boardHeader).toContainText('Purchase foreign currency cash')
        await this.currencySelectorDropdown.selectOption('EUR')

        await expect(this.sellRate).toContainText('1 euro (EUR)')

        await this.amountInput.type('10')
        await this.dollarsSelector.click()
        await this.costCalculationButton.click()

        await expect(this.conversionAmount).toBeVisible()
        await expect(this.conversionAmount).toContainText('10.00 U.S. dollar (USD)')

        await this.purchaseButton.click()

        await expect(this.alert).toBeVisible()
        await expect(this.alert).toContainText('Foreign currency cash was successfully purchased.')
    }
}