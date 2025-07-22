import { IDENTITIES, PROFILE, PROJECTS, SESSION } from './mocks';
import {
  ACCOUNT_CENTER_URL,
  API_SERVER,
  API_SERVER_V3,
  APP_URL,
  VALID_EMAIL,
  VALID_PASSWORD,
} from '../authentication/constants';

describe('Login with Socious Id', () => {
  let loginRequestCount = 0;
  let identitiesRequestCount = 0;
  beforeEach(() => {
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
    cy.intercept('POST', 'https://pulse.walletconnect.org/e?projectId=*&st=*&sv=*', req => {
      req.reply(200);
    });
    cy.intercept('GET', 'https://api.web3modal.org/getAnalyticsConfig?projectId=*&st=*&sv=*', req => {
      req.reply(200);
    });
    cy.intercept('GET', `${API_SERVER}/identities?t=*`, req => {
      identitiesRequestCount++;
      if (identitiesRequestCount <= 1) {
        req.reply(401);
      } else {
        req.reply(200, IDENTITIES);
      }
    }).as('getIdentities');
    cy.fixture('login.html').then(htmlContent => {
      cy.intercept('POST', 'https://dev-id.socious.io/auth/login', req => {
        loginRequestCount++;

        if (loginRequestCount === 1) {
          req.reply({
            statusCode: 302,
            headers: {
              'Content-Type': 'text/html',
            },
            body: htmlContent,
          });
        } else {
          req.redirect(`${APP_URL}oauth/socious?code=*&identity_id=*&session=*&status=success`);
        }
      }).as('postLogin');
    });
    cy.intercept('GET', 'https://dev-id.socious.io/auth/confirm', req => {
      cy.fixture('confirm.html').then(htmlContent => {
        req.reply({
          statusCode: 200,
          headers: {
            'Content-Type': 'text/html',
          },
          body: htmlContent,
        });
      });
    }).as('authConfirm');

    cy.intercept('POST', `${API_SERVER_V3}/auth/session`, req => {
      req.reply(200, SESSION);
    });
    cy.intercept('GET', `${API_SERVER}/user/profile?t=*`, req => {
      req.reply(200, PROFILE);
    });

    cy.intercept('GET', `${API_SERVER}/projects*`, req => req.reply(200, PROJECTS)).as('getProjects');
    cy.intercept('GET', `${API_SERVER}/skills*`, req => req.reply(200, { message: 'success' })).as('getSkills');
    cy.intercept('GET', `${API_SERVER}/notifications*`, req => req.reply(200, { message: 'success' })).as(
      'getNotifications',
    );
  });
  Cypress.on('uncaught:exception', err => {
    if (err.message.includes('WebAssembly.instantiate(): Out of memory')) {
      return false;
    }
  });

  it('should log in user from the intro page using Socious ID', () => {
    cy.visit(APP_URL + 'intro');

    cy.contains('Get Started').should('be.visible');
    cy.contains('button', 'Continue').should('be.visible');
    cy.contains('button', 'Continue').click();

    cy.origin(
      `${ACCOUNT_CENTER_URL}`,
      {
        args: {
          email: VALID_EMAIL,
          password: VALID_PASSWORD,
        },
      },
      ({ email, password }) => {
        cy.get('input[type="email"]', { timeout: 10000 }).should('be.visible');
        cy.location('pathname').should('include', '/auth/login');

        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').should('be.visible');
        cy.get('input[type="password"]').type(password);

        cy.contains('button', 'Sign in').should('be.enabled');
        cy.contains('button', 'Sign in').click();

        cy.contains('Your individual profile').should('be.visible');
        cy.contains('Your organization profiles').should('be.visible');

        cy.get('button.consent-account').should('be.visible');
        cy.wait('@postLogin');
        cy.get('button.consent-account').first().click();
      },
    );
  });
});
