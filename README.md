# playwrigth-test-frame

#### Run the test

Tests can be run on single or multiple browsers and with flags to generate screenshot on test failures.

Each test gets a new isolated page to run the test

#### Run all tests across Chromium, Firefox and WebKit

npx playwright

#### Run tests on a single browser

npx playwright --param browserName=chromium

#### Run all tests in headful mode

npx playwright --param headful

#### Run tests with slowMo (slows down Playwright operations by n milliseconds)

npx playwright --param slowMo=100

#### Save screenshots on failure in test-results directory

npx playwright --param screenshotOnFailure

##### Record videos

npx playwright --param video

#### Retry test failures

npx playwright --retries 3

#### See all options

npx playwright --help

#### Configure NPM scripts

Save the run command as an NPM script.

{
"scripts": {
"test": "npx playwright --param {some para}"
}
}
