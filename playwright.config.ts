import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
    timeout: 60000, // 60 sec    or   "0" - for no timeout
    retries: 0,
    use: {
        headless: true, // " false " will open the browser every time
        viewport: { width: 1280, height: 720 },
        actionTimeout: 15000, // 15 sec
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure'
    },
    projects: [
        {
            name: 'Chromium',
            use: {
                browserName: 'chromium'
            }
        },
        {
            name: 'Firefox',
            use: {
                browserName: 'firefox'
            }
        },
        {
            name: 'Webkit',
            use: {
                browserName: 'webkit'
            }
        }
    ]
}

export default config