import { LIKE_RESPONSE } from './Like-response';
// import { POST } from './postMock';
import { COMMENT, COMMENT_REPLIES, COMMETNS, FEEDS, REACT, REPLY_COMMENT, REPOST_FEED } from './mocks';
import {
  APP_URL,
  FIRSTNAME,
  LASTNAME,
  USERNAME,
} from '../authentication/constants';
import { User, generateRandomEmail } from '../authentication/utilities';
import { NOTIFICATIONS } from '../userSettings/mocks';

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

describe('Like Feed items', () => {
  beforeEach(() => {
    cy.intercept('GET', `http://localhost:3000/posts*t=*&page=*&limit=*`, req => {
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
    cy.intercept('GET', `${APP_URL}/notifications*t=*`, req => {
      req.reply(200, NOTIFICATIONS);
    }).as('getNotifications');

    cy.intercept('POST', '**/posts/*/like', req => {
      req.reply(200, LIKE_RESPONSE);
    }).as('likePost');

    cy.intercept('POST', `${APP_URL}/posts/*/comments`, req => {
      req.reply(200, COMMENT);
    }).as('postComment');

    cy.intercept('POST', `${APP_URL}/posts/*/share`, req => {
      req.reply(200, REPOST_FEED);
    }).as('postRepost');

    cy.intercept('GET', `${APP_URL}/posts/*/comments?t=*&page=1&limit=10`, req => {
      req.reply(200, COMMETNS);
    }).as('getComments');

    cy.intercept('POST', `${APP_URL}/posts/*/comments/*/react`, req => {
      req.reply(200, REACT);
    }).as('postReact');

    cy.intercept('POST', `${APP_URL}/posts/*/comments`, req => {
      req.reply(200, REPLY_COMMENT);
    }).as('replyComment');

    cy.intercept('GET', `${APP_URL}/posts/comments/*?t=*&page=1&limit=10`, req => {
      req.reply(200, COMMENT_REPLIES);
    }).as('getCommentReplies');



  });
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  it('should open the Feeds and like the first post', () => {
    cy.visit(APP_URL + '/feeds');
    cy.wait('@getFeeds');
    cy.wait('@getIdentities');

    cy.get('#Feeds-Title').should('be.visible');

    cy.get('[data-testid="like-button"]').first().click();

    cy.wait('@likePost', { timeout: 5000 }) // 5s timeout to give the app time
      .its('response.statusCode')
      .should('eq', 200);
  });

  it('should open the comment box from the feed and type in it', () => {
    cy.visit(APP_URL + '/feeds');
    cy.wait('@getFeeds');

    cy.get('#Feeds-Title').should('be.visible');

    cy.get('[data-testid="comment-button"]').click();
    cy.get('input[name="comment"]').type('hello this is the comment that it is being tested by');

    cy.contains('button', 'Send').should('be.visible').click();
    // cy.wait('@postComment').its('response.statusCode').should('eq', 200);
  });
  it('should open the comment box from the feed and get other comments', () => {
    cy.visit(APP_URL + '/feeds');
    cy.wait('@getFeeds');

    cy.get('#Feeds-Title').should('be.visible');

    cy.get('[data-testid="comment-button"]').click();
    cy.get('[data-testid="comment-box"]').should('exist');
  });
  it('should open the comment box from the feed and react to one comment', () => {
    cy.visit(APP_URL + '/feeds');
    cy.wait('@getFeeds');

    cy.get('#Feeds-Title').should('be.visible');

    cy.get('[data-testid="comment-button"]').click();
    cy.get('[data-testid="comment-box"]').should('exist');

    cy.contains('❤️').first().should('exist');
    cy.contains('❤️').first().click();
    cy.wait('@postReact').its('response.statusCode').should('eq', 200);

    cy.contains('1❤️').should('be.visible');
  });


  it('should open the comment box from the feed and react to one comment with multiple reactions', () => {
    cy.visit(APP_URL + '/feeds');
    cy.wait('@getFeeds');

    cy.get('#Feeds-Title').should('be.visible');

    cy.get('[data-testid="comment-button"]').click();
    cy.get('[data-testid="comment-box"]').should('exist');

    cy.contains('❤️').first().should('exist');
    cy.contains('❤️').first().click();
    cy.wait('@postReact').its('response.statusCode').should('eq', 200);

    cy.contains('👌').first().should('exist');
    cy.contains('👌').first().click();
    cy.wait('@postReact').its('response.statusCode').should('eq', 200);

    cy.contains('🙂').first().should('exist');
    cy.contains('🙂').first().click();
    cy.wait('@postReact').its('response.statusCode').should('eq', 200);

    cy.contains('1❤️').should('be.visible');
    cy.contains('1👌').should('be.visible');
    cy.contains('1🙂').should('be.visible');
  });

  it('should repost the feed', () => {
    cy.visit(APP_URL + '/feeds');
    cy.wait('@getFeeds');

    cy.get('#Feeds-Title').should('be.visible');
    cy.contains('div', 'Repost').should('exist').click();

    cy.get('textarea[name="repost"]').type('this is reposted by cypress');
    cy.contains('button', 'Post').click();
    cy.wait('@postRepost').its('response.statusCode').should('eq', 200);
  });

  it('should open the comment box and reply to a comment', () => {
    cy.visit(APP_URL + '/feeds');
    cy.wait('@getFeeds');

    cy.get('#Feeds-Title').should('be.visible');

    cy.get('[data-testid="comment-button"]').click();
    cy.get('[data-testid="comment-box"]').should('exist');

    cy.contains('Reply').first().should('be.visible');
    cy.contains('Reply').first().click()

    cy.get('input[name="reply"]').scrollIntoView().should('be.visible');
    cy.get('input[name="reply"]').type('this is an automation test reply');

    cy.contains('button', 'Reply').should('exist').click();
    cy.wait('@replyComment').its('response.statusCode').should('eq', 200);
  });

  it('should open the comment box and click on show replies', () => {
    cy.visit(APP_URL + '/feeds');
    cy.wait('@getFeeds');

    cy.get('#Feeds-Title').should('be.visible');

    cy.get('[data-testid="comment-button"]').click();
    cy.get('[data-testid="comment-box"]').should('exist');

    cy.contains('Show replies').should('be.visible');
    cy.contains('Show replies').first().click();

    cy.wait('@getCommentReplies').its('response.statusCode').should('eq', 200);
  });
  it('should open the comment box and click custom emoji picker', () => {
    cy.visit(APP_URL + '/feeds');
    cy.wait('@getFeeds');

    cy.get('#Feeds-Title').should('be.visible');

    cy.get('[data-testid="comment-button"]').click();
    cy.get('[data-testid="comment-box"]').should('exist');

    cy.get('span.icon-face-smile.text-Gray-light-mode-500').should('exist');
    cy.get('span.icon-face-smile.text-Gray-light-mode-500').click();

    cy.get('[data-testid="emoji-picker"]').should('be.visible');

  });


});
