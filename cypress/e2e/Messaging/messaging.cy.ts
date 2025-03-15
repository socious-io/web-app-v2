import { MESSAGES, SEARCH_FOLLOWINGS, SENT_MESSAGE, SUMMARY } from './mocks';
import { APP_URL } from '../authentication/constants';
import { NOTIFICATIONS, USER_IDENTTITY } from '../userSettings/mocks';

describe('Messagung feature', () => {
  beforeEach(() => {
    cy.intercept('GET', `${APP_URL}/chats/summary*t=*&page=*`, req => {
      req.reply(200, SUMMARY);
    }).as('getSummary');
    cy.intercept('GET', /http:\/\/localhost:3000\/identities\?t=\d+/, req => {
      req.reply(200, USER_IDENTTITY);
    }).as('getIdentity');
    cy.intercept('GET', `${APP_URL}/notifications*t=*`, req => {
      req.reply(200, NOTIFICATIONS);
    }).as('getNotifications');
    cy.intercept('GET', `${APP_URL}/chats/unreads/counts*t=*`, req => {
      req.reply(200, { count: 1 });
    }).as('getUnreadCounts');
    cy.intercept('GET', `${APP_URL}/socket.io/*`, req => {
      req.reply(200);
    }).as('socket');
    cy.intercept('GET', `${APP_URL}/follows/followings*t=*&name=*`, req => {
      req.reply(200, SEARCH_FOLLOWINGS);
    }).as('searchFollowings');
    cy.intercept('GET', `${APP_URL}/chats/*/messages*t=*&page=*`, req => {
      req.reply(200, MESSAGES);
    }).as('getMessages');

    cy.intercept(
      'GET',
      'https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings*projectId=*&sdkType=*&sdkVersion=*&page=*&entries=*&version=*',
      req => {
        req.reply(200);
      },
    ).as('getDesktopListenings');

    cy.intercept('POST', `${APP_URL}/chats/*/messages`, req => {
      req.reply(200, SENT_MESSAGE);
    }).as('postMessage');

    cy.intercept('GET', `${APP_URL}/notifications*t=*`, req => {
      req.reply(200, NOTIFICATIONS);
    }).as('getNotifications');

    cy.intercept('POST', `https://pulse.walletconnect.org/batch?projectId=*&st=*&sv=*`, req => {
      req.reply(200);
    }).as('postWallet');
  });
  it('navigating to messaging and selecting the first option on the list', () => {
    cy.visit(`${APP_URL}/chats`);
    cy.wait('@getSummary');

    cy.get('[data-testid="select-chat"]').first().click();
    cy.wait('@getMessages');

    cy.get('textarea[placeholder="Send a message"]').type('Hello, this is a test message!');
    cy.contains('button', 'Send').click();
    cy.wait('@postMessage').its('response.statusCode').should('eq', 200);

    cy.contains('Hello, this is a test message!');
  });
  it('should open a new chat and search for the organizaiton and message to it', () => {
    cy.visit(`${APP_URL}/chats`);
    cy.wait('@getSummary');

    cy.get('[data-testid="message-to-icon"]').should('exist').click();
    cy.get('#contact').type('organization');
    cy.get('[data-testid="dropdown-open"]').should('be.visible');
    cy.get('[data-testid^="dropdown-option-"]').first().click();

    cy.get('textarea[placeholder="Send a message"]').type('Hello, this is a test message!');
    cy.contains('button', 'Send').click();
    cy.wait('@postMessage').its('response.statusCode').should('eq', 200);
  });
});
