import { ACCESS_TOKEN, APP_URL, INVALID_EMAIL, INVALID_PASSWORD, REFRESH_TOKEN, TOKEN_TYPE, VALID_EMAIL, VALID_PASSWORD } from "./constants";

describe('sign in test automation, user should navigate to website and click login', () => {
    beforeEach(() => {

        cy.intercept('GET', `${APP_URL}/projects?t=*&page=1&status=ACTIVE&limit=10`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('GET', `${APP_URL}/identities?t=*`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('POST', `https://pulse.walletconnect.org/batch?projectId=*&st=*&sv=*`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('GET', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings?projectId=*`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('GET', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings?projectId=*`,
            req => {
                req.reply(200);
            }
        );

        // cy.intercept('POST', `${APP_URL}/auth/login?event_id=`, req => { req.reply(200) }).as('postLogin');
        cy.intercept('POST', `${APP_URL}/auth/login?event_id=`, (req) => {
            if (req.body.email === INVALID_EMAIL && req.body.password === INVALID_PASSWORD) {
                req.reply({
                    statusCode: 401, // Simulate unauthorized response
                    body: { message: 'Invalid email or password' },
                });
            } else {
                req.reply({
                    statusCode: 200,
                    body: {
                        access_token: ACCESS_TOKEN,
                        refresh_token: REFRESH_TOKEN,
                        token_type: TOKEN_TYPE,
                    },
                });
            }
        }).as('postLogin');


    });

    it('user enters invalid email', () => {
        cy.visit(`${APP_URL}`);
        cy.url().should('include', '/intro');

        cy.contains('Log in').should('be.visible');
        cy.contains('Log in').click();

        cy.contains('Log in to your account').should('exist');

        cy.get('#email').type('wrong email');
        cy.contains('Enter a correct email');
    });

    it('user enters wrong details', () => {
        cy.visit(`${APP_URL}`);
        cy.url().should('include', '/intro');

        cy.contains('Log in').should('be.visible');
        cy.contains('Log in').click();

        cy.contains('Log in to your account').should('exist');

        cy.get('#email').type(`${INVALID_EMAIL}`);
        cy.get('#password').type(`${INVALID_PASSWORD}`);

        cy.contains('Continue').click();

        cy.wait('@postLogin').its('response.statusCode').should('eq', 401);
    });

    it('user enters correct details', () => {
        cy.visit(`${APP_URL}`);
        cy.url().should('include', '/intro');

        cy.contains('Log in').should('be.visible');
        cy.contains('Log in').click();

        cy.contains('Log in to your account').should('exist');

        cy.get('#email').type(`${VALID_EMAIL}`);
        cy.get('#password').type(`${VALID_PASSWORD}`);

        cy.contains('Continue').click();

        cy.wait('@postLogin').its('response.statusCode').should('eq', 200);
    });


    it('user enters correct details and clicks keep me logged in', () => {
        cy.visit(`${APP_URL}`);
        cy.url().should('include', '/intro');

        cy.contains('Log in').should('be.visible');
        cy.contains('Log in').click();

        cy.contains('Log in to your account').should('exist');

        cy.get('#email').type(`${VALID_EMAIL}`);
        cy.get('#password').type(`${VALID_PASSWORD}`);

        cy.get('#Keep_me_logged_in').click();

        cy.contains('Continue').click();

        cy.getCookies()
            .should('have.length', 4)
            .then(cookies => {
                expect(cookies[1]).to.have.property('name', 'access_token');
                expect(cookies[1]).to.have.property('value', ACCESS_TOKEN);

                expect(cookies[2]).to.have.property('name', 'refresh_token');
                expect(cookies[2]).to.have.property('value', REFRESH_TOKEN);

                expect(cookies[3]).to.have.property('name', 'token_type');
                expect(cookies[3]).to.have.property('value', TOKEN_TYPE);
            });

        cy.wait('@postLogin').its('response.statusCode').should('eq', 200);
    });

    it('user navigates to sign up page from the login page', () => {
        cy.visit(`${APP_URL}`);
        cy.url().should('include', '/intro');

        cy.contains('Log in').should('be.visible');
        cy.contains('Log in').click();

        cy.contains('Log in to your account').should('exist');

        cy.contains('Sign up').scrollIntoView().should('be.visible').click();

        // cy.url().contains('/sign-up/user/email');
        cy.url().contains('/intro');
    });
})