/// <reference types = "cypress"/>
import LoginPage from '../e2e/pages/LoginPage'
import TestingData from '../fixtures/TestingData.json'


describe('Login test suit', ()=>{
    beforeEach( ()=>{
        // Mock the register API call
        cy.intercept('POST', `${Cypress.env('api_server')}/auth/login`, (req) => {
            if (req.body.password === 'wrongPassword')
                req.reply({
                statusCode: 400,
                });
            else if (req.body.email === 'wrongEmail')
            req.reply({
            statusCode: 400,
            });
            else
                req.reply({
                statusCode: 200,
                body: {
                    access_token:TestingData.access_token,
                    refresh_token:TestingData.refresh_token,
                    token_type: TestingData.token_type
                },
                });
            });

    })

it('Login with valid credentials', () => {    
    const login = new LoginPage();
    login.gotoLoginPage(`${Cypress.env('app_url')}/sign-in`)
    login.login(TestingData.EmailForLogin,TestingData.PasswordForLogin)  
})
it('Login with invalid email', () => {    
    const login = new LoginPage();
    login.gotoLoginPage(`${Cypress.env('app_url')}/sign-in`)
    login.login(TestingData.InvalidEmailForLogin,TestingData.PasswordForLogin)  
    cy.url().should('include', '/sign-in')
})
it('Login with invalid password', () => {    
    const login = new LoginPage();
    login.gotoLoginPage(`${Cypress.env('app_url')}/sign-in`)
    login.login(TestingData.EmailForLogin,TestingData.InvalidPasswordForLogin)  
    cy.url().should('include', '/sign-in')
})
})
