import { test, expect } from '@playwright/test'
import { getRandomNumber, getRandomString } from '../../utils/data-helpers'

test.describe('Tips & Tricks section', () => {
    test('Info Object', async ({ page }, testInfo) => {   // by adding testInfo you have an access to testInfo object with all the test run information
        await page.goto('https://www.example.com')
        // console.log(testInfo)
    })

    test('Skip Browser', async ({ page, browserName }) => {                                 // e.g. development is still in the process
        test.skip(browserName === 'chromium', 'Feature is not ready in Chrome browser')     // then this line can be just removed
        await page.goto('https://www.example.com')
    })

    test('Fixme Annotation', async ({ page, browserName }) => {                          // indicates that the test has some issues
        test.fixme(browserName === 'chromium', 'Test is not stable, needs revision')     // then this line can be just removed
        await page.goto('https://www.example.com')
    })

    test('Negative Test Invalide link for demonstrating "--retries=3" test run option', async ({ page }) => {
        await page.goto('https//www.example.com')
    })

    const people = ['Mary', 'Steve', 'Alice']                                            // for creating a loop of tests
    for (const name of people) {
        test(`Running Test for ${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type('#searchTerm', `${name}`)
            await page.waitForTimeout(3000)                                              // to see what is happening - to slow the test
        })
    }

    test('Mouse movement simulation', async ({ page }) => {
        await page.goto('https://www.example.com')
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)   // pixels
        await page.mouse.up()
    })

    test('Multiple Browser Tabs inside 1 Browser', async ({ browser }) => {  // the difference between Playwright and Cypress - multiple browsers in one test
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()


        await page1.goto('https://www.example.com')
        await page2.goto('https://www.example.com')
        await page3.goto('https://www.example.com')
        await page1.waitForTimeout(5000)                              // to slow the test to see "--headed" flag is added too for this purpose
    })

    test('Test using getRandomNumber function', async ({ page }) => {
        await page.goto('https://www.example.com')

        let newNumber = await getRandomNumber()
        console.log(newNumber)
    })

    test('Test using getRandomString function', async ({ page }) => {
        await page.goto('https://www.example.com')

        let newString = await getRandomString()
        console.log(newString)
    })
})

// npx playwright test --config=playwright.config.ts --project=Webkit
// npx playwright test --config=playwright.config.ts --project=Chromium
// npx playwright test --config=playwright.config.ts --project=Webkit --retries=3        // will be rerun just if the test failed
// npx playwright test --config=playwright.config.ts --project=Webkit --headed           // "--headed" flag - to see what is happening
// npx playwright test --config=playwright.config.ts --project=Chromium --headed

/* Device emulating with Playwright
npx playwright open --device="iPhone 11" wikipedia.org   */    // DEVICE emulation using Playwright + launch "Playwright Inspector"

/* PDF generating with Playwright
npx playwright pdf https://www.example.com my-file.pdf       // creating PDF file from the web page, need the extention "vscode-pdf"
npx playwright pdf wikipedia.org my-wiki.pdf */


/* Screenshots with Playwright
npx playwright screenshot --device="iPhone 11" --color-scheme=dark --wait-for-timeout=3000 twitter.com twitter-iphone-image.png 
the command does: " Navigating to twitter.com
Waiting for timeout 3000...
Capturing screenshot into twitter-iphone-image.png"*/

/* Changing timezones and Language with Playwright
npx playwright open --timezone="Europe/Rome" --lang="it-IT" google.com            
npx playwright open --timezone="Europe/Rome" --lang="it-IT" --geolocation="40.121, 10.123" google.com            */
