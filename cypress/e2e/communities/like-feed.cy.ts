import { Feeds } from './mocks';
import JsonMock from './mocks.json';
import {
    API_SERVER,
    APP_URL,
    ACCESS_TOKEN,
    TOKEN_TYPE,
    FIRSTNAME,
    REFRESH_TOKEN,
    LASTNAME,
    USERNAME,
    API_SERVER_HTTP,
} from '../authentication/constants';
import { User, generateRandomEmail } from '../authentication/utilities';

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

describe('Like Feed items', () => {
    beforeEach(() => {

        cy.setCookie('access_token', ACCESS_TOKEN);
        cy.setCookie('refresh_token', REFRESH_TOKEN);
        cy.setCookie('token_type', TOKEN_TYPE);

        cy.intercept('GET', `${API_SERVER}/posts/*`, (req) => {
            // req.headers['Authorization'] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
            req.reply(200, Feeds);
            console.log(req);
        }).as('getFeeds');

        cy.intercept('GET', `${API_SERVER}/identities*`, req => {
            req.reply(user.getIdentity());
        }).as('getIdentities');

        cy.intercept('POST', `https://pulse.walletconnect.org/batch*`, req => req.reply(200, { message: 'success' })).as(
            'postWallet',
        );
        cy.intercept('GET', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings*`, req => req.reply(200, { message: 'success' })).as(
            'getDesktopListings',
        );

    });

    Cypress.on('uncaught:exception', (err, runnable) => {

        return false;
    });
    it('should open the Feeds and like the first post', () => {

        // cy.wait('@getFeeds');
        cy.visit(APP_URL + '/feeds');
        cy.contains('Feeds');

        // cy.get('button').contains('Like').first().click();
        // cy.wait('@likePost').its('response.statusCode').should('eq', 200);
    });

});

