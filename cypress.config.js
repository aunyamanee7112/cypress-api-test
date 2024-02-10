const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:"https://conduit.bondaracademy.com",
    specPattern:'cypress/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // const email = process.env.
    },
  },
  env:{
    email : "asrilerd@gmail.com",
    password:"1234"
  },
  retries:{
    runMode:2,
    openMode:0
  }
});
