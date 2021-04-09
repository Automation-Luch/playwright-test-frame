const dotenv = require("dotenv");
dotenv.config();


module.exports = {
  alty_cmd_stage: {
    URL: process.env.ALTY_CMD_URL,
    LOGIN: process.env.ALTY_CMD_LOGIN,
    PASSWORD: process.env.ALTY_CMD_PASSWORD,
    EMAIL_FOR_RESTORE: process.env.ALTY_CMD_RESTORE,
  },

  // securer: {
  //   company: {
  //     URL: "https://uat-company.securer.io/",
  //     EMAIL: "makaxyn@mailinator.com",
  //     PASSWORD: "Pa$$w0rd!",
  //   },

  //   investor: {
  //     URL: "https://uat-investor.securer.io/",
  //     EMAIL: "Luch41098607379@wwjmp.com",
  //     PASSWORD: "qwe123",
  //   },
  // },

  // ororo: {
  //   URL: "https://ororo.tv",
  //   EMAIL: "11111@1secmail.com",
  //   PASSWORD: "Pa$$w0rd!",
  // },
};
