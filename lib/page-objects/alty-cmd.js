const { community } = require( "../selectors/base");
const {click,typeText, waitForText} = require("../helpers/helpers.js");

class AltyCMD {

  constructor(page) {
    this.page = page;
  }
  addGroupToCMD = async(groupLink,promoted=true)=>{
    await click(community.ADD_GROUP_BUTTON, this.page)
    await typeText(community.INVITATION_LINK_FIELD,groupLink, this.page);
    if(promoted===false){
        await click(community.IS_PROMOTED_CHECKBOX, this.page)
    }
    await click(community.ADD_BUTTON, this.page)

  }

}
module.exports = { AltyCMD };
