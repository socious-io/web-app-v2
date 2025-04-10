import Status from 'src/modules/general/components/Status';

import { API_SERVER, APP_URL } from '../authentication/constants';
import { PROFILE } from '../userProfile/mocks';
import { NOTIFICATIONS, ONE_NOTIFICATION, USER_IDENTTITY } from '../userSettings/mocks';
import { ORG_IDENTITY } from './mocks';


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

        cy.intercept('GET', `${APP_URL}/dashboard/projects?t=*&page=1&status=ACTIVE&limit=10`,
            req => {
                req.reply(200);
            }
        );

        //============= after switching organization================//

        cy.intercept('GET', `${APP_URL}/dashboard/orgs/by-shortname/organizationtest?t=*`,
            req => {
                req.reply(200);
            }
        );

        cy.intercept('GET', `${APP_URL}/identities?t=*`,
            req => {
                req.reply(200, USER_IDENTTITY);
            }
        ).as('getUserProfile');
    });

    it('user navigates to dashboard page and switches account from talent to organization', () => {
        cy.visit(`${APP_URL}/dashboard/user`);
        cy.contains('👋 Welcome back,').should('be.visible');

        cy.get('[data-testid="icon-dropdown"]').should('be.visible');
        cy.get('[data-testid="icon-dropdown"]').click();

        cy.then(() => {
            currentIdentity = ORG_IDENTITY;
        });

        cy.contains('OrganizationTest').should('exist').click();

        cy.wait('@getIdentity');
    });
    it('user navigates to dashboard page and switches account from talent to organization', () => {
        currentIdentity = ORG_IDENTITY;
        cy.visit(`${APP_URL}/dashboard/user`);

        cy.get('[data-testid="icon-dropdown"]').should('be.visible');
        cy.get('[data-testid="icon-dropdown"]').click();

        cy.then(() => {
            currentIdentity = USER_IDENTTITY;
        });

        cy.contains('@UMAYA').should('exist').click();
    });
});
