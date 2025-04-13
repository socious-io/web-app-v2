import { CONFIRM_PASSWORD, CURRENT_PASSWORD, INVALID_PASSWORD, NEW_PASSWORD, WRONG_PASSWORD } from './constants';
import { NOTIFICATIONS, USER_IDENTTITY } from './mocks';
import { ACCESS_TOKEN, API_SERVER, APP_URL, REFRESH_TOKEN, TOKEN_TYPE } from '../authentication/constants';

describe('test user settings', () => {
    beforeEach(() => {
        cy.intercept('GET', /http:\/\/localhost:3000\/identities\?t=\d+/, req => {
            req.reply(200, USER_IDENTTITY);
        }).as('getIdentity');
        cy.intercept('POST', 'https://pulse.walletconnect.org/batch*', req => {
            req.reply(200);
        }).as('postWallet');
        cy.intercept('GET', `${APP_URL}/notifications*t=*`, req => {
            req.reply(200, NOTIFICATIONS);
        }).as('getNotifications');
        cy.intercept('GET', `${APP_URL}/chats/unreads/counts*t=*`, req => {
            req.reply(200, { count: 1 });
        }).as('getUnreadCounts');
        cy.intercept('GET', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings*`, req => {
            req.reply(200);
        }).as('getUnreadCounts');

        cy.intercept('POST', `${APP_URL}/user/change-password`, req => {
            if (req.body.current_password === WRONG_PASSWORD) {
                req.reply(400, { message: 'Incorrect current password' });
            } else {
                req.reply(200, { message: 'Password changed successfully' });
            }
        }).as('changePassword');
    });
    it('user naviates to settings, language tab and changes language to spanish', () => {
        cy.visit(`${APP_URL}/settings`);
        cy.contains('Settings');
        cy.wait('@getIdentity');
        cy.wait('@getNotifications');

        cy.get('[data-testid="tab-4"]').contains('Language').click();
        cy.contains('Select your default language.');

        cy.contains('English (US)').click();
        cy.contains('Spanish Español').should('be.visible');
        cy.contains('Spanish Español').click();

        cy.contains('button', 'save').click();

        cy.contains('Configuración').should('be.visible');
    });
    it('user naviates to settings, language tab and changes language to japanese', () => {
        cy.visit(`${APP_URL}/settings`);
        cy.contains('Settings');
        cy.wait('@getIdentity');
        cy.wait('@getNotifications');

        cy.get('[data-testid="tab-4"]').contains('Language').click();
        cy.contains('Select your default language.');

        cy.contains('English (US)').click();
        cy.contains('Japanese 日本語').should('be.visible');
        cy.contains('Japanese 日本語').click();

        cy.contains('button', 'save').click();

        cy.contains('設定').should('be.visible');
    });
    it('user naviates to settings, language tab and changes language to Korean', () => {
        cy.visit(`${APP_URL}/settings`);
        cy.contains('Settings');
        cy.wait('@getIdentity');
        cy.wait('@getNotifications');

        cy.get('[data-testid="tab-4"]').contains('Language').click();
        cy.contains('Select your default language.');

        cy.contains('English (US)').click();
        cy.contains('Korean 한국어').should('be.visible');
        cy.contains('Korean 한국어').click();

        cy.contains('button', 'save').click();

        cy.contains('설정').should('be.visible');
    });
});
