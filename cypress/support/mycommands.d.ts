declare namespace Cypress {
    interface Chainable {
        loginUsingApi(email: string , password: string) : Cypress.Chainable
        loginUsingUI(email: string , password: string) : Cypress.Chainable
    }
}