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
    VALID_EMAIL,
    VALID_PASSWORD,
} from '../authentication/constants';

import { IDENTITIES } from '../authentication/mocks'

import { User, generateRandomEmail } from '../authentication/utilities';
const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);


describe('Like Feed items', () => {
    beforeEach(() => {


        cy.intercept('GET', `${API_SERVER}/posts/*`, (req) => {
            // req.headers['Authorization'] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
            req.reply(200, Feeds);
            console.log(req);
        }).as('getFeeds');

    });

    Cypress.on('uncaught:exception', (err, runnable) => {

        return false;
    });
    it('should open the Feeds and like the first post', () => {

        cy.visit(APP_URL + '/intro');
        cy.contains('button', 'Continue').click();
        cy.visit(APP_URL + '/sign-in');
        
        cy.get('input#email').type(VALID_EMAIL);
        cy.get('input#password').type(VALID_PASSWORD);
        cy.contains('button', 'Continue').click();

        cy.visit(APP_URL + '/feeds');
        cy.wait('@getFeeds');
        // cy.contains('Feeds')

        // cy.get('button').contains('Like').first().click();
        // cy.wait('@likePost').its('response.statusCode').should('eq', 200);
    });

});

