# playwrigth-test-frame

## Run the test

Tests can be run on single or multiple browsers and with flags to generate screenshot on test failures.

Each test gets a new isolated page to run the test

#### Run all tests across Chromium, Firefox and WebKit

npx folio

#### Run tests on a single browser

npx folio --param browserName=chromium

#### Run all tests in headful mode

npx folio --param headful

#### Run tests with slowMo (slows down Playwright operations by n milliseconds)

npx folio --param slowMo=100

#### Save screenshots on failure in test-results directory

npx folio --param screenshotOnFailure

# Record videos

npx folio --param video

#### Retry test failures

npx folio --retries 3

#### See all options

npx folio --help

#### Configure NPM scripts

Save the run command as an NPM script.

{
"scripts": {
"test": "npx folio --param screenshotOnFailure"
}
}
