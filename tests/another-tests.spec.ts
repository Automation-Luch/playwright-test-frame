import { folio } from "../lib/fixtures/base-fixture";
const { it, describe, expect, beforeEach, beforeAll } = folio;
import { waitForText, emailCreate,navigate,typeText,getText } from "../lib/helpers/helpers";
import { alty_cmd_stage } from "../lib/helpers/credentials";
import { groups,notifications } from "../lib/helpers/text-helpers";
import { CUSTOM_ALERT } from "../lib/selectors/base";
import {Login} from "../lib/page-objects/authentication"
const email = emailCreate();

describe("Checking all functions on the CMD dashboard", () => {
  beforeAll(async ({ browser}) => {
    
    
});

  beforeEach(async ({ AltyObject }) => {
    await navigate( alty_cmd_stage.URL,AltyObject.auth.page)
    await AltyObject.auth.login(alty_cmd_stage.LOGIN,alty_cmd_stage.PASSWORD)
  });

  it("Check the ability to add WhatsApp group to the community ", async ({ AltyObject }) => {
    await AltyObject.dashboard.addGroupToCMD(groups.WHATS_APP.link)
    await waitForText(notifications.ADD_GROUP, AltyObject.auth.page)


  });


});
