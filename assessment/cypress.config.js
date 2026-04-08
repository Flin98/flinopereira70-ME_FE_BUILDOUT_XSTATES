const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Add the Vercel URL with the share token here
    baseUrl: "https://cli-flino-s-projects.vercel.app?_vercel_share=eLBzxj16q3KIYJEL9HjObFxX8JWALDaA",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Optional: This prevents Cypress from failing if it hits a stray 401/403
    failOnStatusCode: false 
  },
});