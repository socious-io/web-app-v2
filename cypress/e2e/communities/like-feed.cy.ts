import { FEEDS } from './mocks';
import { Notification } from './notificationMock';
import {
    API_SERVER,
    APP_URL,
    ACCESS_TOKEN,
    TOKEN_TYPE,
    FIRSTNAME,
    REFRESH_TOKEN,
    LASTNAME,
    USERNAME
} from '../authentication/constants';
import {LIKE_RESPONSE} from './Like-response';
import { User, generateRandomEmail } from '../authentication/utilities';

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

describe('Like Feed items', () => {
    beforeEach(() => {

        cy.setCookie('access_token', ACCESS_TOKEN);
        cy.setCookie('refresh_token', REFRESH_TOKEN);
        cy.setCookie('token_type', TOKEN_TYPE);
        
        cy.intercept('GET', `**/posts*`, req => {
            req.reply(200, {FEEDS});
        }).as('getFeeds');

        cy.intercept('GET', `**/identities*`, req => {
            req.reply(user.getIdentity());
        }).as('getIdentities');

        cy.intercept('POST', `**/batch*`, req => req.reply(200, { message: 'success' })).as(
            'postWallet',
        );
        cy.intercept('GET', `**/batch*`, req => req.reply(200, { message: 'success' })).as(
            'getWallet',
        );
        cy.intercept('GET', `**/w3m/v1/getDesktopListings*`, req => req.reply(200, { message: 'success' })).as(
            'getDesktopListings',
        );
        cy.intercept('GET', `**/w3m/v1/getMobileListings*`, req => req.reply(200, { message: 'success' })).as(
            'getMobileListings',
        );
        cy.intercept('POST', '**/cdn-cgi/rum*', req => req.reply(200, { message: 'success' })).as('getrum');
        cy.intercept('GET', '**/chats/unreads/counts*', req => req.reply(200, { "count": 0 })).as('getUnreadCounts');
        cy.intercept('POST', '**/cdn-cgi/zaraz/t*', req => req.reply(200, { message: 'success' })).as('postT');
        cy.intercept('GET', '**/notifications*', req => req.reply(200, Notification)).as('getNotifications');

        cy.intercept('POST', '**/posts/*/like', (req) => {
            req.reply(200, LIKE_RESPONSE);
        }).as('likePost');

    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    it('should open the Feeds and like the first post', () => {

        cy.getCookie('access_token').should('exist');
        cy.getCookie('refresh_token').should('exist');
        cy.getCookie('token_type').should('exist');

        cy.visit(APP_URL + '/feeds');
        cy.wait('@getFeeds');

        // cy.get('#Feeds-Title').should('be.visible');

        cy.get('[data-testid="like-button"]').first().click();
        cy.wait('@likePost').its('response.statusCode').should('eq', 200);

    });

});

