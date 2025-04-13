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

  it('should navigate to user profile settings and change password', () => {
    cy.visit(`${APP_URL}/settings`);
    cy.contains('Settings');
    cy.wait('@getIdentity');
    cy.wait('@getNotifications');

    cy.get('[data-testid="tab-2"]').contains('Password').click();
    cy.get('input#current_password').type(CURRENT_PASSWORD);
    cy.get('input#password').type(NEW_PASSWORD);
    cy.get('input#confirm').type(NEW_PASSWORD);

    cy.get('img[src="/icons/check-circle-green.svg"]').should('be.visible');
    cy.get('[data-testid = "submit-button"]').should('be.visible').click();
    cy.wait('@changePassword').its('response.statusCode').should('eq', 200);
  });

  it('should navigate to change password settings and insert wrong password details', () => {
    cy.visit(`${APP_URL}/settings`);
    cy.contains('Settings');
    cy.wait('@getIdentity');
    cy.wait('@getNotifications');

    cy.get('[data-testid="tab-2"]').contains('Password').click();
    cy.get('input#current_password').type(WRONG_PASSWORD);
    cy.get('input#password').type(NEW_PASSWORD);
    cy.get('input#confirm').type(NEW_PASSWORD);

    cy.get('[data-testid = "submit-button"]').should('be.visible').click();
    cy.wait('@changePassword').its('response.statusCode').should('eq', 400);
  });

  it('should navigate to settings and insert the invalid passwords', () => {
    cy.visit(`${APP_URL}/settings`);
    cy.contains('Settings');
    cy.wait('@getIdentity');
    cy.wait('@getNotifications');

    cy.get('[data-testid="tab-2"]').contains('Password').click();
    cy.get('input#current_password').type(WRONG_PASSWORD);
    cy.get('input#password').type(INVALID_PASSWORD);
    cy.get('input#confirm').type(CONFIRM_PASSWORD);

    cy.get('img[src="/icons/check-circle-grey.svg"]').should('be.visible');

    cy.get('[data-testid = "submit-button"]').should('be.disabled');
  });
});
