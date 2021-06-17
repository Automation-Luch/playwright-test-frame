# playwrigth-test-frame

#### Run the test

Tests can be run on single or multiple browsers and with flags to generate screenshot on test failures.

Each test gets a new isolated page to run the test

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
