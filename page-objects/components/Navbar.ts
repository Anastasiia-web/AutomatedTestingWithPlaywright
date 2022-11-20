import { expect, Locator, Page } from '@playwright/test'              // expect can be deleted or left in case not to forget for future tests

export class Navbar {
    // create variables
    readonly page: Page
    readonly accountSummaryTab: Locator
    readonly accountActivityTab: Locator
    readonly transferFundsTab: Locator
    readonly payBillsTab: Locator
    readonly moneyMapTab: Locator
    readonly onlineStatementsTab: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.accountSummaryTab = page.locator('#account_summary_tab')
        this.accountActivityTab = page.locator('#account_activity_tab')
        this.transferFundsTab = page.locator('#transfer_funds_tab')
        this.payBillsTab = page.locator('#pay_bills_tab')
        this.moneyMapTab = page.locator('#money_map_tab')
        this.onlineStatementsTab = page.locator('#online_statements_tab')
    }

    // Define methods
    async clickOnTab(tabName) {
        switch (tabName) {
            case 'Account Summary':
                await this.accountSummaryTab.click()
                break
            case 'Account Activity':
                await this.accountActivityTab.click()
                break
            case 'Transfer Funds':
                await this.transferFundsTab.click()
                break
            case 'Pay Bills':
                await this.payBillsTab.click()
                break
            case 'Money Map':
                await this.moneyMapTab.click()
                break
            case 'Online Statements':
                await this.onlineStatementsTab.click()
                break
            default:
                throw new Error('This tab does not exist...')
        }
    }
}
