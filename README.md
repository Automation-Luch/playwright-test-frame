# playwright-test-frame

#### Run the test

Tests can be run on single or multiple browsers and with flags to generate screenshot on test failures and record the video when test retry.

Each test gets a new isolated page to run the test

#### Project configuration

# playwright.config.ts -

it is the most important file where you can to set all configuration for your project

such as the :
1)Browsers
2)Timeouts
3)retry
4)Screenshots options
5)Video recording options etc
#### Run all tests across Chromium, Firefox and WebKit

npx playwright test

#### Run tests on a single browser

npx playwright test --browser=chromium

#### Run a single test file

npx playwright test tests/todo-page.spec.ts

#### Run all tests in headful mode

npx playwright test --headful

#### Run tests with slowMo (slows down Playwright operations by n milliseconds)

npx playwright test --slowMo=100

#### Save screenshots on failure in test-results directory

##### Record videos

npx playwright test --video

#### Retry test failures

npx playwright test --retries 3

#### See all options

npx playwright test --help

#### Configure NPM scripts

Save the run command as an NPM script.

{
"scripts": {
"test": "npx playwright test --{some para}"
}
}
