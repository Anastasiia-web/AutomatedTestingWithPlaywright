// https://playwright.dev/docs/test-assertions

import { test, expect } from '@playwright/test'

import { loadHomePage, assertTitle, screenshotsFullPage, screenshotsElement } from '../helpers'

test('Simple basic test', async ({ page }) => {
    // test code
    await page.goto('https://www.example.com')  // open and load the page
    const pageTitle = page.locator('h1') // access to the selector by creating a variable
    // access to the selector by creating a variable
    await expect(pageTitle).toContainText('Example Domain')
})   // to run the test: command in the terminal "npx playwright test"
// to open a browser during testing add flag "npx playwright test --headed"
// to change a browser "npx playwright test --browser=firefox"
// to combine "npx playwright test --headed --browser=firefox"
// to combine "npx playwright test --headed --browser=all"
// to run specific test "npx playwright test tests/example.spec.ts"

test('Clicking on Elements', async ({ page }) => {   // for skipping the test ".skip"
    await page.goto('http://zero.webappsecurity.com/')  // open and load the page
    await page.click('#signin_button')
    await page.click('text = Sign in')
    const errorMessage = page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test('Working with Inputs', async ({ page }) => {   // for running ONLY this test ".only"
    await page.goto('http://zero.webappsecurity.com/')  // open and load the page
    await page.click('#signin_button')

    await page.type('#user_login', 'some username')     // make an input into the field
    await page.type('#user_password', 'some password')  // make an input into the field
    await page.click('text = Sign in')
    const errorMessage = page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test('Asertions', async ({ page }) => {
    // test code
    await page.goto('https://www.example.com')

    await expect(page).toHaveURL('https://www.example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = page.locator('h1')
    expect(element).toBeVisible
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = page.locator('h5')
    expect(nonExistingElement).not.toBeVisible

    await page.click('text = More information...')         // testing redirection url
    await expect(page).toHaveURL('https://www.iana.org/domains/reserved')
})

// Annotations
// ".only" - for running ONLY this test - the rest of tests will be ignored
// ".skip" - for skipping the test 
// ".describe" - to group tests into a one test suit

test.skip('Clicking on the elements', async ({ page }) => {   // for skipping the test ".skip"
    await page.goto('http://zero.webappsecurity.com/')  // open and load the page
    await page.click('#signin_button')
    await page.click('text = Sign in')
    const errorMessage = page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test('Working with the inputs', async ({ page }) => {   // for running ONLY this test ".only"
    await page.goto('http://zero.webappsecurity.com/')  // open and load the page
    await page.click('#signin_button')

    await page.type('#user_login', 'some username')
    await page.type('#user_password', 'some password')
    await page.click('text = Sign in')
    const errorMessage = page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.describe('My test suit', () => {
    test('New page', async ({ page }) => {
        await page.goto('https://www.patternfly.org/v3/pattern-library/application-framework/login-page/index.html')
        await page.click('text = Overview')
        const titleDisplayed = page.locator('.page-tabs-header')
        await expect(titleDisplayed).toContainText('Pattern Library Overview')
    })

    test('w3school', async ({ page }) => {
        await page.goto('https://www.w3schools.com/howto/howto_css_login_form.asp')
        const tryButton = page.locator('.ws-btn')
        expect(tryButton).toBeEnabled
    })
})

// Tagging
// "@anyTagName" - for running exactly the tests with the tag, e.g. in terminal" npx playwright test @anyTagName "
// for skipping tests using a tag - " npx playwright test --grep-invert @fast "


test('With the tag @fast', async ({ page }) => {  // "npx playwright test --grep @fast" - for running with tag
    await page.goto('https://www.linguee.com/polish-english/translation/on+the+login+page.html')
    const pageElement = page.locator('.lMainNavbar__translatorLink')
    await expect(pageElement).toHaveCSS('color', 'rgb(15, 43, 70)')
})

// after creating this config file with projects run e.g.: " npx playwright test --config=playwright.config.ts --project=Chromium "

// Reports
// for reporting "npx playwright test --config=playwright.config.ts --project=Chromium --reporter=line"  - just summing up the result how many passed/failed
// =list   - default
// =dot    - simple))
// =junit  - xml format
// =html   - html format the best as very detailed


// Screenshots
test('Whole page screenshot', async ({ page }) => {
    await page.goto('https://www.onbuy.com/gb/womens-clothing/')
    await page.screenshot({ path: 'fullPage.png', fullPage: true })
})

test('Single element screenshot', async ({ page }) => {
    await page.goto('https://www.onbuy.com/gb/womens-accessories/')
    const singleElement = await page.$('h1')
    await singleElement.screenshot({ path: 'singleElement.png' })
})

// Hooks (using e.g. beforeEach) - to simplify the tests if they use repetitive code, e.g. login

// "".describe" for test suits creation
// ".only" can be added after for running only this

test.describe.parallel.only('Hooks', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.hugoboss.com/pl/pl/kobiety-odziez/?gclid=CjwKCAjwtKmaBhBMEiwAyINuwBpivvw3W7d-uibExNk6dDYu9AgkBFRk1D5wlqJ-mNMhFFjK8r_fsxoCMkEQAvD_BwE&targetid=kwd-357405976750&ef_id=YqmfRgAJEUwyWAA2:20221015184157:s')
    })
    test('First', async ({ page }) => {
        await page.click('text = Zaakceptuj wszystko')
        const icons = page.locator('.toggle__icons')
        expect(icons).toBeVisible
    })
    test('Second', async ({ page }) => {
        const mainLogo = page.locator('.main-header__logo-link main-header__logo-link--full')
        expect(mainLogo).toBeVisible
    })
})

// Using Custom functions / helpers
// after creating "helpers" file with custom functions:

test('Example Custom Helpers', async ({ page }) => {   //npx playwright test
    await loadHomePage(page)             // page loading
    await assertTitle(page)
})

test('Example Custom Functions Screeenshots', async ({ page }) => {   //npx playwright test
    await loadHomePage(page)              // page loading
    // await page.pause()                 // inspector for PAUSING & DEBUGING  -  delete or comment always before production
    await screenshotsFullPage(page)
    await screenshotsElement(page)
})

// " npm run tests:chrome -- --headed " if scripts are added into package.json configs are changed for "projects" according to playwright.config.ts file

