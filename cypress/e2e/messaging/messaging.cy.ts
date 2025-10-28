import { MESSAGES, SEARCH_FOLLOWINGS, SENT_MESSAGE, SUMMARY, NOTIFICATIONS } from './mocks';
import { API_SERVER, APP_URL, FIRSTNAME, LASTNAME, USERNAME } from '../authentication/constants';
import { User, generateRandomEmail } from '../authentication/utilities';

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

describe('Messaging feature', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_SERVER}/chats/summary*t=*&page=*`, req => {
      req.reply(200, SUMMARY);
    }).as('getSummary');
    cy.intercept('GET', `${API_SERVER}/identities*`, req => {
      req.reply(user.getIdentity());
    }).as('getIdentities');
    cy.intercept('GET', `${API_SERVER}/notifications*t=*`, req => {
      req.reply(200, NOTIFICATIONS);
    }).as('getNotifications');
    cy.intercept('GET', `${API_SERVER}/chats/unreads/counts*t=*`, req => {
      req.reply(200, { count: 1 });
    }).as('getUnreadCounts');
    cy.intercept('GET', `${API_SERVER}/socket.io/*`, req => {
      req.reply(200);
    }).as('socket');
    cy.intercept('GET', `${API_SERVER}/follows/followings*t=*&name=*`, req => {
      req.reply(200, SEARCH_FOLLOWINGS);
    }).as('searchFollowings');
    cy.intercept('GET', `${API_SERVER}/chats/*/messages*t=*&page=*`, req => {
      req.reply(200, MESSAGES);
    }).as('getMessages');

    cy.intercept(
      'GET',
      'https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings*projectId=*&sdkType=*&sdkVersion=*&page=*&entries=*&version=*',
      req => {
        req.reply(200);
      },
    ).as('getDesktopListenings');

    cy.intercept('POST', `${API_SERVER}/chats/*/messages`, req => {
      req.reply(200, SENT_MESSAGE);
    }).as('postMessage');

    cy.intercept('GET', `${API_SERVER}/notifications*t=*`, req => {
      req.reply(200, NOTIFICATIONS);
    }).as('getNotifications');

    cy.intercept('POST', `https://pulse.walletconnect.org/batch?projectId=*&st=*&sv=*`, req => {
      req.reply(200);
    }).as('postWallet');
  });
  it('navigating to messaging and selecting the first option on the list', () => {
    cy.visit(`${APP_URL}chats`);
    cy.wait('@getSummary');

    cy.get('[data-testid="select-chat"]').first().click();
    cy.wait('@getMessages');

    cy.get('textarea[placeholder="Send a message"]').first().type('Hello, this is a test message!');
    cy.contains('button', 'Send').click();
    cy.wait('@postMessage').its('response.statusCode').should('eq', 200);

    cy.contains('Hello, this is a test message!');
  });
  it('should open a new chat and search for the organizaiton and message to it', () => {
    cy.visit(`${APP_URL}chats`);
    cy.wait('@getSummary');

    cy.get('[data-testid="message-to-icon"]').should('exist').click();
    cy.get('#contact').type('organization');
    cy.get('[data-testid="dropdown-open"]').should('be.visible');
    cy.contains('OrganizationTest').should('be.visible');
    cy.contains('OrganizationTest').click();

    cy.get('textarea[placeholder="Send a message"]').first().type('Hello, this is a test message!');
    cy.contains('button', 'Send').click();
    cy.wait('@postMessage').its('response.statusCode').should('eq', 200);
  });
});
