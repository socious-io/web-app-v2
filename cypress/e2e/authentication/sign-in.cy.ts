import {
  API_SERVER,
  APP_URL,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_TYPE,
  VALID_EMAIL,
  VALID_PASSWORD,
} from './constants';
import { IDENTITIES, PROJECT, PROJECTS } from './mocks';

describe('Sign in', () => {
  beforeEach(() => {
    // Mock the register API call
    cy.intercept('POST', `${API_SERVER}/auth/login`, (req) => {
      if (req.body.email === INVALID_EMAIL || req.body.password === INVALID_PASSWORD)
        req.reply({
          statusCode: 400,
        });
      else
        req.reply({
          statusCode: 200,
          body: {
            access_token: ACCESS_TOKEN,
            refresh_token: REFRESH_TOKEN,
            token_type: TOKEN_TYPE,
          },
        });
    });

    cy.intercept('GET', `${API_SERVER}/identities*`, (req) => {
      if (req.headers.authorization === `${TOKEN_TYPE} ${ACCESS_TOKEN}`) req.reply(IDENTITIES);
      else return req.reply(401, { error: 'Unauthorized' });
    });

    cy.intercept('GET', `${API_SERVER}/auth/otp/confirm?email=*`, {
      statusCode: 200,
      body: { message: 'success' },
    });

    cy.intercept('GET', `${API_SERVER}/projects*`, (req) => req.reply(200, PROJECTS)).as('getProjects');
    cy.intercept('GET', `${API_SERVER}/projects/*`, (req) => req.reply(200, PROJECT)).as('getProject');
    // cy.intercept('GET', `${API_SERVER}/projects/*/questions`, (req) => req.reply(200, { message: 'success' })).as(
    //   'getProjectQuestions',
    // );
    cy.intercept('GET', `${API_SERVER}/notifications*`, (req) => req.reply(200, { message: 'success' })).as(
      'getNotifications',
    );
    cy.intercept('GET', `${API_SERVER}/user/profile*`, (req) => req.reply(200, { message: 'success' })).as(
      'getUserProfile',
    );
    cy.intercept('GET', `${API_SERVER}/chats/unreads/counts*`, (req) => req.reply(200, { message: 'success' })).as(
      'getUnreadChatsCount',
    );
    cy.intercept('GET', `${API_SERVER}/skills*`, (req) => req.reply(200, { message: 'success' })).as('getSkills');
    cy.intercept('POST', `${API_SERVER}/auth/refresh`, (req) => req.reply(200, { message: 'success' })).as(
      'refreshAuthorization',
    );
  });

  /*
    Attention!
    FIXME:
    When Cypress detects uncaught errors originating from your application it will automatically fail the current test.
    This lines of code will disable this feature!
    Errors from "Firebase" caused cypress to fail the tests even they are a right tests.
  */
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it('it will logs in with valid credentials', () => {
    // Visit the login page
    cy.visit(`${APP_URL}/sign-in`);

    // Fill in the username and password
    cy.get('input#email').type(VALID_EMAIL);
    cy.get('input#password').type(VALID_PASSWORD);

    // Click submit
    cy.contains('button', 'Continue').click();
    // cy.wait([
    //   '@getUserProfile',
    //   '@getProjects',
    //   '@getUnreadChatsCount',
    //   '@getSkills',
    //   '@getNotifications',
    //   '@refreshAuthorization',
    // ]);

    // Check if the login was successful
    cy.getCookies()
      .should('have.length', 4)
      .then((cookies) => {
        expect(cookies[1]).to.have.property('name', 'access_token');
        expect(cookies[1]).to.have.property('value', ACCESS_TOKEN);

        expect(cookies[2]).to.have.property('name', 'refresh_token');
        expect(cookies[2]).to.have.property('value', REFRESH_TOKEN);

        expect(cookies[3]).to.have.property('name', 'token_type');
        expect(cookies[3]).to.have.property('value', TOKEN_TYPE);
      });
    cy.url().should('include', `${APP_URL}/jobs`);
  });

  it('fails to log in with invalid credentials', () => {
    // Visit the login page
    cy.visit(`${APP_URL}/sign-in`);

    // Fill in the username and password
    cy.get('input#email').type(INVALID_EMAIL);
    cy.get('input#password').type(INVALID_PASSWORD);

    // Click the 'Sign in' button
    cy.contains('button', 'Continue').click();

    cy.getCookies().should('have.length', 1);

    // Check if the login failed
    cy.url().should('include', '/sign-in');
  });
});
