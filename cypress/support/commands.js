// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password, failOnStatusCode = true) => {
    Cypress.log({
      name: 'loginViaAuth0',
    });
    const options = {
      method: 'POST',
      url: Cypress.env('AUTH_URL'),
      failOnStatusCode,
      body: {
        grant_type: Cypress.env('GRANT_TYPE'),
        username:
          username || username === '' ? username : Cypress.env('AUTH_USERNAME'),
        password:
          password || password === '' ? password : Cypress.env('AUTH_PASSWORD'),
        client_id: Cypress.env('AUTH_CLIENT_ID'),
        client_secret: Cypress.env('AUTH_CLIENT_SECRET'),
      },
    };
    cy.request(options);
  });
  
  Cypress.Commands.add('loginPanel', (failOnStatusCode = true) => {
    Cypress.log({
      name: 'loginViaAuth0',
    });
    const options = {
      method: 'POST',
      url: Cypress.env('AUTH_URL'),
      failOnStatusCode,
      body: {
        grant_type: Cypress.env('PANEL_GRANT_TYPE'),
        client_id: Cypress.env('PANEL_CLIENT_ID'),
        client_secret: Cypress.env('PANEL_CLIENT_SECRET'),
      },
    };
    cy.request(options);
  });
  
  // Cypress.Commands.add('form_request', (url, formData) => {
  //   return cy
  //     .intercept('POST', url)
  //     .as('formRequest')
  //     .window()
  //     .then((win) => {
  //       var xhr = new win.XMLHttpRequest()
  //       xhr.open('POST', url)
  //       xhr.send(formData)
  //     })
  //     .wait('@formRequest')
  // })
  