import { COMMENT, FEEDS, REPOST_FEED, LIKE_RESPONSE, NOTIFICATIONS } from './mocks';
import { APP_URL, FIRSTNAME, LASTNAME, USERNAME } from '../authentication/constants';
import { User, generateRandomEmail } from '../authentication/utilities';

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

describe('Like Feed items', () => {
  beforeEach(() => {
    cy.intercept('GET', `**/posts*t=*&page=*&limit=*`, req => {
      req.reply(200, FEEDS);
    }).as('getFeeds');

    cy.intercept('GET', `**/identities*`, req => {
      req.reply(user.getIdentity());
    }).as('getIdentities');

    cy.intercept('POST', `**/batch*`, req => req.reply(200, { message: 'success' })).as('postWallet');
    cy.intercept('GET', `**/batch*`, req => req.reply(200, { message: 'success' })).as('getWallet');
    cy.intercept('GET', `**/w3m/v1/getDesktopListings*`, req => req.reply(200, { message: 'success' })).as(
      'getDesktopListings',
    );
    cy.intercept('GET', `**/w3m/v1/getMobileListings*`, req => req.reply(200, { message: 'success' })).as(
      'getMobileListings',
    );
    cy.intercept('POST', '**/cdn-cgi/rum*', req => req.reply(200, { message: 'success' })).as('getrum');
    cy.intercept('GET', '**/chats/unreads/counts*', req => req.reply(200, { count: 0 })).as('getUnreadCounts');
    cy.intercept('POST', '**/cdn-cgi/zaraz/t*', req => req.reply(200, { message: 'success' })).as('postT');
    cy.intercept('GET', `**/notifications?t=*`, req => {
      req.reply(200, NOTIFICATIONS);
    }).as('getNotifications');

    cy.intercept('POST', '**/posts/*/like', req => {
      req.reply(200, LIKE_RESPONSE);
    }).as('likePost');

    cy.intercept('POST', `**/posts/*/comments`, req => {
      req.reply(200, COMMENT);
    }).as('postComment');

    cy.intercept('POST', `**/posts/*/share`, req => {
      req.reply(200, REPOST_FEED);
    }).as('postRepost');
  });
  it('should open the Feeds and like the first post', () => {
    cy.visit(APP_URL + 'feeds');
    cy.wait('@getIdentities');

    cy.contains('Feeds').should('be.visible');

    cy.contains('Like').first().click();
    cy.wait('@likePost', { timeout: 5000 }).its('response.statusCode').should('eq', 200);
  });
  it('should open the comment box from the feed and type in it', () => {
    cy.visit(APP_URL + 'feeds');
    cy.wait('@getFeeds');

    cy.contains('Feeds').should('be.visible');

    cy.contains('Comment').click();
    cy.get('input[name="comment"]').type('hello this is the comment that it is being tested by');

    cy.contains('button', 'Send').should('be.visible').click();
    cy.wait('@postComment').its('response.statusCode').should('eq', 200);
  });
  it('should repost the feed', () => {
    cy.visit(APP_URL + 'feeds');
    cy.wait('@getFeeds');

    cy.contains('Feeds').should('be.visible');
    cy.contains('div', 'Repost').should('exist').click();

    cy.get('textarea[name="repost"]').type('this is reposted by cypress');
    cy.contains('button', 'Post').click();
    cy.wait('@postRepost').its('response.statusCode').should('eq', 200);
  });
});
