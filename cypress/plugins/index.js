/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
 const path = require('path');

 module.exports = (on, config) => {
   const envFile = config.env.envFile
     ? path.resolve(__dirname, `../../${config.env.envFile}`)
     : null;
   require('dotenv').config({ path: envFile });
   config.env = { ...config.env, ...process.env };
   config.baseUrl = process.env.BASE_URL;
   return config;
 };
 