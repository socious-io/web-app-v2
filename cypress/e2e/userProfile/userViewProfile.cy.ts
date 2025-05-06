import {
    APP_URL,
    ACCESS_TOKEN,
    TOKEN_TYPE,
    FIRSTNAME,
    REFRESH_TOKEN,
    LASTNAME,
    USERNAME
} from '../authentication/constants';
import { User, generateRandomEmail } from '../authentication/utilities';
import { Notification } from '../communities/notificationMock';
import { PROFILE } from './mocks';

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

describe('user view their profile', () => {
    beforeEach(() => {

        cy.setCookie('access_token', ACCESS_TOKEN);
        cy.setCookie('refresh_token', REFRESH_TOKEN);
        cy.setCookie('token_type', TOKEN_TYPE);

        cy.intercept('GET', `**/identities*`, req => {
            req.reply(user.getIdentity());
        }).as('getIdentities');

        cy.intercept('GET', `**/notifications*`, req => {
            req.reply(200, Notification);
        }).as('getNotifications');

        cy.intercept('POST', 'https://webapp2.socious.io/cdn-cgi/zaraz/t', req =>
            req.reply(200, { message: 'success' })
        ).as('postT');

        cy.intercept('GET', '**/chats/unreads/counts*', req => req.reply(200, { "count": 0 })).as('getUnreadCounts');
        cy.intercept('GET', '**/user/impact-points*', req => req.reply(200, { "page": 1, "limit": 10, "total_count": 0, "items": [] })).as('getImpactPoints');
        cy.intercept('GET', '**/user/profile?t=*', req => {
            req.reply(200, PROFILE);
        }).as('getProfile');

        cy.intercept('GET', `**/w3m/v1/getMobileListings*`, req => req.reply(200, { message: 'success' })).as(
            'getMobileListings',
        );
        cy.intercept('POST', `**/batch*`, req => req.reply(200, { message: 'success' })).as(
            'getMobileListings',
        );

        //after clicking the view profile button
        cy.intercept('GET', '**/user/reviews?t=*', req => {
            req.reply(200, {"page":1,"limit":5,"total_count":0,"items":[]})
        }).as('getReviews');

    });

    it('should navigate to home page and hit the view profile button', () => {

        cy.getCookie('access_token').should('exist');
        cy.getCookie('refresh_token').should('exist');
        cy.getCookie('token_type').should('exist');

        cy.visit(APP_URL + '/dashboard/user');
        cy.wait('@getIdentities');
        cy.wait('@getProfile');

        cy.contains(PROFILE.username).should('be.visible');

        cy.get('[data-testId="viewProfile-button"]').click();
        cy.wait('@getReviews');
        cy.wait('@getProfile');

        cy.contains('[data-testId="username"]').should('be.visible');

    });
});