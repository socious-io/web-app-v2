import { APP_URL } from "../authentication/constants";
import { PROFILE } from "../userProfile/mocks";
import { NOTIFICATIONS, ONE_NOTIFICATION, USER_IDENTTITY } from "../userSettings/mocks";
import { CATEGORIES, CONNECT, SKILLS } from "./mocks";

describe('service automation tests', () => {
    beforeEach(() => {
        cy.intercept('GET', `${APP_URL}/dashboard/user/profile?t=*`, req => {
            req.reply(200, PROFILE);
        }).as('getProfile');
        cy.intercept('GET', `${APP_URL}/dashboard/user/impact-points?t=*`, req => {
            req.reply(200, { page: 1, limit: 10, total_count: 0, items: [] });
        }).as('getProfile');
        cy.intercept('GET', /http:\/\/localhost:3000\/services\/identities\?t=\d+/, req => {
            req.reply(200, USER_IDENTTITY);
        }).as('getIdentity');
        cy.intercept('GET', `${APP_URL}/services/notifications*t=*`, req => {
            req.reply(200, NOTIFICATIONS);
        }).as('getNotifications');
        cy.intercept('GET', `${APP_URL}/chats/unreads/counts*t=*`, req => {
            req.reply(200, { count: 1 });
        }).as('getUnreadCounts');
        cy.intercept('POST', `${APP_URL}/dashboard/notifications/read/all`, req => {
            req.reply(200);
        }).as('readAll');
        cy.intercept('POST', `https://pulse.walletconnect.org/batch*`, req => {
            req.reply(200);
        });
        cy.intercept('GET', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings*`, req => {
            req.reply(200);
        }).as('getDesktopListings');
        cy.intercept('GET', `${APP_URL}/dashboard/chats/summary*t=*`, req => {
            req.reply(200, ONE_NOTIFICATION);
        }).as('getOneNotification');
        cy.intercept('GET', `${APP_URL}/socket.io/*`, req => {
            req.reply(200);
        }).as('socket');
        cy.intercept('GET', `${APP_URL}/chats/contacts/chats/summary*t=*`, req => {
            req.reply(200);
        }).as('socket');
        cy.intercept('GET', `${APP_URL}/chats/contacts/identities*t=*`, req => {
            req.reply(200);
        }).as('socket');
        cy.intercept('GET', `${APP_URL}/chats/contacts/chats/*`, req => {
            req.reply(200);
        }).as('socket');

        cy.intercept('GET', `${APP_URL}/services/projects/categories?t=*`,
            req => {
                req.reply(200, CATEGORIES);
            }
        );
        cy.intercept('GET', `${APP_URL}/services/skills?t=*&limit=500`,
            req => {
                req.reply(200, SKILLS);
            }
        );

        cy.intercept('GET', `${APP_URL}/services/auth/stripe/profile?t=*`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('POST', `${APP_URL}/media/upload`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('POST', `${APP_URL}/services/auth/stripe/connect-link?t=*&country=JP&is_jp=f`,
            req => {
                req.reply(200, CONNECT);
            }
        );
        cy.intercept('GET', `${APP_URL}/services/auth/stripe/connect-link?t=*&country=JP&is_jp=false&redirect_url=*`,
            req => {
                req.reply(200, CONNECT);
            }
        ).as('getConnectCountry');
    });

    it('user navigates to services and creates a service with USD pricing with uploading a file', () => {
        cy.visit(`${APP_URL}/services/create`);
        cy.contains('Create new service');

        cy.get('#name').should('be.visible');
        cy.get('#name').type('Software Engineering');

        cy.contains('Select a category').should('exist');
        cy.contains('Select a category').click({ force: true });

        cy.contains('Frontend development').should('be.visible').click();

        cy.get('#description').type('this is a development description for testing this applicaiton');

        cy.contains('Select a delivery time').scrollIntoView().should('be.visible');
        cy.contains('Select a delivery time').click({ force: true });

        cy.contains('1 week').click();

        cy.get('#hours').type('3');
        cy.get('#price').type('100');

        cy.get('#skills').type('block');

        cy.get('[data-testid="multi-select"]').click();
        cy.get('input[type="file"]').attachFile('test-image.jpg');

        cy.contains('button', 'Publish').should('be.enabled').click();

        // aftger modal being opened

        cy.contains('Add a payout account').should('be.visible');
        cy.get('[data-testid="dropdown-open"]')
            .contains('Search a country')
            .click({ force: true });

        // cy.contains('Search a country').focus().type('Japan');
        cy.contains('Japan').scrollIntoView().should('be.visible');
        cy.contains('Japan').click();
        cy.wait('@getConnectCountry');
    });
    it('user navigates to services and creates a service with JPY pricing with uploading a file', () => {
        cy.visit(`${APP_URL}/services/create`);
        cy.contains('Create new service');

        cy.get('#name').should('be.visible');
        cy.get('#name').type('Software Engineering');

        cy.contains('Select a category').should('exist');
        cy.contains('Select a category').click({ force: true });

        cy.contains('Frontend development').should('be.visible').click();

        cy.get('#description').type('this is a development description for testing this applicaiton');

        cy.contains('Select a delivery time').scrollIntoView().should('be.visible');
        cy.contains('Select a delivery time').click({ force: true });

        cy.contains('1 week').click();

        cy.get('#hours').type('3');
        cy.contains('USD').click({ force: true });
        cy.contains('JPY').click();
        cy.get('#price').type('100');

        cy.get('#skills').type('block');

        cy.get('[data-testid="multi-select"]').click();
        cy.get('input[type="file"]').attachFile('test-image.jpg');

        cy.contains('button', 'Publish').should('be.enabled').click();

        // aftger modal being opened

        cy.contains('Add a payout account').should('be.visible');
        cy.get('[data-testid="dropdown-open"]')
            .contains('Search a country')
            .click({ force: true });

        // cy.contains('Search a country').focus().type('Japan');
        cy.contains('Japan').scrollIntoView().should('be.visible');
        cy.contains('Japan').click();
        cy.wait('@getConnectCountry');

    });

    it('user fills out the form and submits without uploading a file', () => {
        cy.visit(`${APP_URL}/services/create`);
        cy.contains('Create new service');

        cy.get('#name').should('be.visible');
        cy.get('#name').type('Software Engineering');

        cy.contains('Select a category').should('exist');
        cy.contains('Select a category').click({ force: true });

        cy.contains('Frontend development').should('be.visible').click();

        cy.get('#description').type('this is a development description for testing this applicaiton');

        cy.contains('Select a delivery time').scrollIntoView().should('be.visible');
        cy.contains('Select a delivery time').click({ force: true });

        cy.contains('1 week').click();

        cy.get('#hours').type('3');
        cy.contains('USD').click({ force: true });
        cy.contains('JPY').click();
        cy.get('#price').type('100');

        cy.get('#skills').scrollIntoView().should('be.visible');
        cy.get('#skills').type('block');

        cy.get('[data-testid="multi-select"]').click();

        cy.contains('button', 'Publish').scrollIntoView().should('be.enabled').click();

        // aftger modal being opened

        cy.contains('Add a payout account').should('be.visible');
        cy.get('[data-testid="dropdown-open"]')
            .contains('Search a country')
            .click({ force: true });

        // cy.contains('Search a country').focus().type('Japan');
        cy.contains('Japan').scrollIntoView().should('be.visible');
        cy.contains('Japan').click();
        cy.wait('@getConnectCountry');

    });

    it('user lefts the Service name input empty and gets error', () => {
        cy.visit(`${APP_URL}/services/create`);
        cy.contains('Create new service');

        cy.get('#name').should('be.visible');
        cy.get('#name').type('Software Engineering');
        cy.get('#name').clear();
        cy.contains('This field is required').should('be.visible');
    });
    it('user lefts the Service name input empty and gets error', () => {
        cy.visit(`${APP_URL}/services/create`);
        cy.contains('Create new service');

        cy.contains('button', 'Publish').should('be.enabled').click();

        cy.get('p')
            .contains('This field is required').should('be.visible');
        cy.get('p')
            .contains('Value must be a positive number').should('be.visible');

    });
    it('user types a minus number in the price field and gets error', () => {
        cy.visit(`${APP_URL}/services/create`);
        cy.contains('Create new service');

        cy.get('#hours').type('3');
        cy.contains('USD').click({ force: true });
        cy.contains('JPY').click();
        cy.get('#price').type('-100');

        cy.get('p')
            .contains('Value must be a positive number').should('be.visible');

    });
    it('user types a text or character in the price field and gets error', () => {
        cy.visit(`${APP_URL}/services/create`);
        cy.contains('Create new service');

        cy.get('#hours').type('3');
        cy.contains('USD').click({ force: true });
        cy.contains('JPY').click();
        cy.get('#price').type('-100');

        cy.get('p')
            .contains('Value must be a positive number').should('be.visible');

    });
    it('user types a text or character in the hours field and gets error', () => {
        cy.visit(`${APP_URL}/services/create`);
        cy.contains('Create new service');

        cy.get('#hours').type('text');
        cy.contains('USD').click({ force: true });
        cy.contains('JPY').click();

        cy.get('p')
            .contains('Value must be a positive number').should('be.visible');

    });
    it('user types a minus number in the hours field and gets error', () => {
        cy.visit(`${APP_URL}/services/create`);
        cy.contains('Create new service');

        cy.get('#hours').type('-3');
        cy.contains('USD').click({ force: true });
        cy.contains('JPY').click();

        cy.get('p')
            .contains('Value must be a positive number').should('be.visible');

    });
})