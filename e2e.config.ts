import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
    timeout: 0, //  "60000"  (= 60 sec)   or   "0" - for no timeout
    retries: 0,
    testDir: "tests/e2e",
    use: {
        headless: true, // " false " will open the browser every time
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10000, //      15000   = 15 sec
        ignoreHTTPSErrors: true,
        video: 'off',                            // 'retain-on-failure'
        screenshot: 'off'                        // 'only-on-failure'
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

