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

Cypress.Commands.add('loginToPage', () => {

    /**  authenication on BeforeLoadPage  */

    const userCredential = {
        "user": {
            "email": "asrilerd@gmail.com",
            "password": "1234"
        }
    }
    const url = "https://conduit-api.bondaracademy.com/api/users/login"

    cy.request("POST", url, userCredential).its('body').then(body => {
        const token = body.user.token
        cy.visit('/', {
            onBeforeLoad(win) {
                win.localStorage.setItem('jwtToken', token)
            }
        })
    })

    // cy.visit('/login')
    // cy.get("[formcontrolname='email']").type("asrilerd@gmail.com")
    // cy.get("[formcontrolname='password']").type("1234")
    // cy.get("form").submit()
})