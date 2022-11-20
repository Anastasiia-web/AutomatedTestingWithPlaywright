import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
    timeout: 60000, // 60 sec    or   "0" - for no timeout
    retries: 0,
    testDir: 'tests/visual',
    use: {
        headless: true, // " false " will open the browser every time
        viewport: { width: 1280, height: 720 },
        actionTimeout: 15000, // 15 sec
        ignoreHTTPSErrors: true,
        video: 'off',                      // no need in 'retain-on-failure' for video in visual tests
        screenshot: 'off'                  // no need in 'only-on-failure' for video in visual tests
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

