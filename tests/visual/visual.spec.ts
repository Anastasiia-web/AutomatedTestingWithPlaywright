import { test, expect } from '@playwright/test'

test.describe('Visual Regression Testing', () => {
    test('Full page snapshop', async ({ page }) => {
        await page.goto('https://www.example.com')
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')
    })

    test('Single element snapshop', async ({ page }) => {
        await page.goto('https://www.example.com')
        const pageElement = await page.$('h1')
        expect(await pageElement.screenshot()).toMatchSnapshot('page-title.png')
    })
})

/* npx playwright test --config=visual.config.ts --project=webkit        for specifying config file
for the FIRST time running there's an ERROR => snapshot is made by playwright. It's saved in the automatically created folder in 'visual' folder (created by playwright)
you need to generate snapshots for every project (chromium, firefox, so on) at first
npx playwright test --config=visual.config.ts --project=chromium
npx playwright test --config=visual.config.ts --project=firefox*/
