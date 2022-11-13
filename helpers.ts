// Custom functions

export async function loadHomePage(page) {
    await page.goto('https://example.com/')
}

export async function assertTitle(page) {
    await page.waitForSelector('h1')
}

export async function screenshotsFullPage(page) {
    await page.screenshot({ path: 'customFunctionfullPage.png', fullPage: true })
}

export async function screenshotsElement(page) {
    const singleElementScreenshot = await page.$('p')
    await singleElementScreenshot.screenshot({ path: 'customFunctionElement.png' })
}

