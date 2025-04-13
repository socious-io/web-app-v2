import Status from 'src/modules/general/components/Status';

import { API_SERVER, APP_URL } from '../authentication/constants';
import { PROFILE } from '../userProfile/mocks';
import { NOTIFICATIONS, ONE_NOTIFICATION, USER_IDENTTITY } from '../userSettings/mocks';
import { ORG_IDENTITY } from '../dashboard/mocks';

describe('notification test', () => {
    let currentIdentity: any = USER_IDENTTITY;
    beforeEach(() => {
        cy.intercept('GET', `${APP_URL}/dashboard/user/profile?t=*`, req => {
            req.reply(200, PROFILE);
        }).as('getProfile');
        cy.intercept('GET', `${APP_URL}/dashboard/user/impact-points?t=*`, req => {
            req.reply(200, { page: 1, limit: 10, total_count: 0, items: [] });
        }).as('getProfile');
        cy.intercept('GET', /http:\/\/localhost:3000\/dashboard\/identities\?t=\d+/, req => {
            req.reply(200, currentIdentity);
        }).as('getIdentity');
        cy.intercept('GET', `${APP_URL}/dashboard/notifications*t=*`, req => {
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

        //================ toggle swtich ============//

        cy.intercept('POST', `${APP_URL}/dashboard/user/open-to-work`,
            req => {
                req.reply(200, { "open_to_work": false });
            }
        ).as('postOpenToWork');
        cy.intercept('POST', `${APP_URL}/dashboard/user/open-to-volunteer`,
            req => {
                req.reply(200, { "open_to_volunteer": true });
            }
        ).as('postOpenToVolunteer');
        cy.intercept('POST', `${APP_URL}/orgs/hiring`,
            req => {
                req.reply(200, { "hiring": true });
            }
        ).as('postHiring');
    });
    it('User navigates to dashboard and chooses their status from the navbar and clicks on open to work toggle button', () => {
        cy.visit(`${APP_URL}/dashboard/user`);
        cy.contains('Status').should('be.visible');

        cy.contains('Status').click();
        cy.get('[data-testid="toggle-button"]').should('be.visible');
        cy.get('[data-testid="toggle-button"]').first().click();
        cy.wait('@postOpenToWork').its('response.statusCode').should('eq', 200);
    });
    it('User navigates to dashboard and chooses their status from the navbar', () => {
        cy.visit(`${APP_URL}/dashboard/user`);
        cy.contains('Status').should('be.visible');

        cy.contains('Status').click();
        cy.get('[data-testid="toggle-button"]').should('be.visible');
        cy.get('[data-testid="toggle-button"]').eq(1).click();
        cy.wait('@postOpenToVolunteer').its('response.statusCode').should('eq', 200);
    });
    it('Organization navigates to dashboard and chooses their status from the navbar and clicks on Hiring toggle button', () => {
        currentIdentity = ORG_IDENTITY;
        cy.visit(`${APP_URL}/dashboard/user`);
        cy.contains('Status').should('be.visible');

        cy.contains('Status').click();
        cy.get('[data-testid="toggle-button"]').should('be.visible');
        cy.get('[data-testid="toggle-button"]').first().click();
        cy.wait('@postHiring').its('response.statusCode').should('eq', 200);
    })

});
