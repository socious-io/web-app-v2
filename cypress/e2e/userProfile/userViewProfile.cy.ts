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
import { User, generateRandomEmail } from '../authentication/utilities';
import { Notification } from '../communities/notificationMock';
import { PROFILE } from './mocks';

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

describe('user view their profile', () => {
    beforeEach(() => {

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
        cy.intercept('GET', '**/user/impact-points*', req => req.reply(200, { "page": 1, "limit": 10, "total_count": 0, "items": [] })).as('getUnreadCounts');
        cy.intercept('GET', '**/user/profile/*', req =>
            req.reply(200, PROFILE)
        ).as('getProfile');

        cy.intercept('GET', `**/w3m/v1/getMobileListings*`, req => req.reply(200, { message: 'success' })).as(
            'getMobileListings',
        );
        cy.intercept('POST', `**/batch*`, req => req.reply(200, { message: 'success' })).as(
            'getMobileListings',
        );


    });

    it('shoud navigate to home page', () => {
        cy.visit(APP_URL + '/dashboard/user');
        // cy.wait('@getIdentities');
        cy.wait('@getProfile');
    });
});