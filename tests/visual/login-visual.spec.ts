import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.only('Login Page Visual Tests', () => {
    let homepage: HomePage                               // type of HomePage
    let loginpage: LoginPage                             // type of LoginPage

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page)                    // assign a variable for the class
        loginpage = new LoginPage(page)                  // assign a variable for the class

        await homepage.visit()
        await homepage.clickSignIn()
    })

    test('Login Form', async ({ page }) => {
        await loginpage.snapshotLoginForm()
    })

    test('Login Error Message', async ({ page }) => {
        await loginpage.login('Fail', 'some invalid password')
        await loginpage.snapshotErrorMessage()
    })
})

// npx playwright test tests/visual/login-visual.spec.ts       // to run the tests from a paticular folder
// npm run tests:visual                                        // to run the tests according to the script in 'package.json' file
// if '.only' is added to e.g. "test.describe.only"  =>  means that ONLY this test/file will be run from the folder

/*npx playwright test --config=visual.config.ts --project=webkit        for specifying config file
for the FIRST time running there's an ERROR => snapshot is made by playwright. It's saved in the automatically created folder in 'visual' folder (created by playwright)
you need to generate snapshots for every project (chromium, firefox, so on) at first
npx playwright test --config=visual.config.ts --project=chromium
npx playwright test --config=visual.config.ts --project=firefox*/
