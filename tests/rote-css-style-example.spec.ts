import { folio } from '../lib/fixtures/rote-fixture';
const { it, expect } = folio;
import { stackoverflow } from '../lib/helpers/text-helpers';

it('loads pages without css requests', async ({ mockedContext }) => {
  const page = await mockedContext.newPage();
  await page.goto(stackoverflow.LINK);
  //Check that the css styles are disabled
  const fontSize = await page.$eval('div', el => window.getComputedStyle(el).fontSize);
  expect(fontSize === '16px').toBeTruthy();
});
