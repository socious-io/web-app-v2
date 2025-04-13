import Status from 'src/modules/general/components/Status';

import { ACCESS_TOKEN, API_SERVER, APP_URL, REFRESH_TOKEN, TOKEN_TYPE } from '../authentication/constants';
import { PROFILE } from '../userProfile/mocks';
import { NOTIFICATIONS, ONE_NOTIFICATION, USER_IDENTTITY } from '../userSettings/mocks';

describe('notification test', () => {
    beforeEach(() => {
        cy.setCookie('access_token', ACCESS_TOKEN);
        cy.setCookie('refresh_token', REFRESH_TOKEN);
        cy.setCookie('token_type', TOKEN_TYPE);

        cy.intercept('GET', `${APP_URL}/dashboard/user/profile?t=*`, req => {
            req.reply(200, PROFILE);
        }).as('getProfile');
        cy.intercept('GET', `${APP_URL}/dashboard/user/impact-points?t=*`, req => {
            req.reply(200, { page: 1, limit: 10, total_count: 0, items: [] });
        }).as('getProfile');
        cy.intercept('GET', /http:\/\/localhost:3000\/dashboard\/identities\?t=\d+/, req => {
            req.reply(200, USER_IDENTTITY);
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


        //====================log out =================//

        cy.intercept('POST', ` ${APP_URL}/auth/logout`,
            req => {
                req.reply(200)
            }
        ).as('postLogOut');

        cy.intercept('GET', `${APP_URL}/dashboard/projects?t=*&page=1&status=ACTIVE&limit=10`,
            req => {
                req.reply(200);
            }
        );
    });

    it('User navigates to dashboard and chooses their status from the navbar and clicks on open to work toggle button', () => {
        cy.visit(`${APP_URL}/dashboard/user`);

        cy.getCookies().then(cookies => {
            const accessToken = cookies.find(c => c.name === 'access_token');
            const refreshToken = cookies.find(c => c.name === 'refresh_token');
            const tokenType = cookies.find(c => c.name === 'token_type');

            expect(accessToken).to.have.property('value', ACCESS_TOKEN);
            expect(refreshToken).to.have.property('value', REFRESH_TOKEN);
            expect(tokenType).to.have.property('value', TOKEN_TYPE);
        });

        cy.get('[data-testid="icon-dropdown"]').click();
        cy.contains('Log out').scrollIntoView().should('be.visible').click();
        cy.wait('@postLogOut');

        cy.getCookies().should('have.length', 0);

        cy.url().should('contain', '/sign-in');
        cy.contains('Welcome back! Please enter your details.').should('be.visible');
    });


});
