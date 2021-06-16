import { expect, test } from '@playwright/test';

import { screenshotMatching, navigate } from '../lib/helpers/helpers';
import { alty_cmd_stage } from '../lib/helpers/credentials';

test('Check Snapshot making', async ({ browserName, page }) => {
  await navigate(alty_cmd_stage.URL, page);
  await screenshotMatching(browserName, expect, page);
});
