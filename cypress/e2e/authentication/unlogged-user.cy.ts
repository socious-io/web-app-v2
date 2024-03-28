import {
  API_SERVER,
  APP_URL,
  EXISTING_EMAIL_ADDRESS,
  FIRSTNAME,
  LASTNAME,
  PASSWORD,
  USERNAME,
  CITY,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_TYPE,
  ORGANIZATION_EMAIL,
  ORGANIZATION_USERNAME,
} from './constants';
import { INDUSTRIES, LOCATIONS, ORGS, PROJECT, PROJECTS, SENT_APPLICATION, SKILLS, UPLOAD } from './mocks';
import { OrganizationUser, User, generateRandomEmail } from './utilities';

const SIGNINGUP_EMAIL = generateRandomEmail();
const socialCauses = ['Health', 'Security', 'Bullying'],
  skills = ['C', 'C#', 'C++'];

const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);
const organizationUser = new OrganizationUser(
  FIRSTNAME,
  LASTNAME,
  SIGNINGUP_EMAIL,
  USERNAME,
  ORGANIZATION_EMAIL,
  ORGANIZATION_USERNAME,
  CITY,
  socialCauses,
);

describe('User Application', () => {
  beforeEach(() => {
    // Mock the register API call
    cy.intercept('GET', `${API_SERVER}/identities*`, (req) => {
      if (req.headers.authorization == `${TOKEN_TYPE} ${ACCESS_TOKEN}`) req.reply(user.getIdentity());
      else req.reply(401, { message: 'unauthorized' });
    });
    cy.intercept('POST', `${API_SERVER}/projects/*/applicants`, (req) => req.reply(200, SENT_APPLICATION)).as(
      'sendApplication',
    );
    cy.intercept('GET', `${API_SERVER}/projects/*/questions*`, (req) => req.reply(200, { questions: [] })).as(
      'getProjectQuestions',
    );
    cy.intercept('GET', `${API_SERVER}/projects/*`, (req) => req.reply(200, PROJECT)).as('getProject');
    cy.intercept('GET', `${API_SERVER}/projects*`, (req) => req.reply(200, PROJECTS)).as('getProjects');
    cy.intercept('GET', `${API_SERVER}/skills*`, (req) => req.reply(SKILLS));
    cy.intercept('GET', `${API_SERVER}/geo/locations*`, (req) => req.reply(LOCATIONS));
    cy.intercept('GET', `${API_SERVER}/orgs/d/industries*`, (req) => req.reply(INDUSTRIES));
    cy.intercept(
      'GET',
      RegExp(`${API_SERVER}orgs/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`, 'ig'),
      (req) => req.reply(ORGS),
    );
    cy.intercept('POST', `${API_SERVER}/media/upload`, (req) => req.reply(200, UPLOAD));
    cy.intercept('POST', `${API_SERVER}/orgs?auto_member=true`, (req) => req.reply(200, { message: 'success' }));
    cy.intercept('GET', `${API_SERVER}/orgs/by-shortname/*`, (req) => req.reply(200, organizationUser.get()));
    cy.intercept('POST', `${API_SERVER}/user/change-password-direct*`, (req) => req.reply(200, { message: 'success' }));
    cy.intercept('POST', `${API_SERVER}/user/update/profile*`, (req) => req.reply(200, { message: 'success' }));
    cy.intercept('GET', `${API_SERVER}/user/profile*`, (req) => req.reply(200, { message: 'success' }));
    cy.intercept('GET', `${API_SERVER}/notifications*`, (req) => req.reply(200, { message: 'success' })).as(
      'getNotifications',
    );
    cy.intercept('GET', `${API_SERVER}/chats/unreads/counts*`, (req) => req.reply(200, { message: 'success' })).as(
      'getUnreadChatsCount',
    );
    cy.intercept('POST', `${API_SERVER}/auth/preregister*`, (req) =>
      req.reply(200, { username: null, shortname: null, message: 'success' }),
    );
    cy.intercept('POST', `${API_SERVER}/auth/register`, (req) => {
      if (req.body.email === EXISTING_EMAIL_ADDRESS) req.reply({ statusCode: 400 });
      else req.reply(200, { message: 'success' });
    });
    cy.intercept('GET', `${API_SERVER}/user/by-username/**`, (req) => {
      return req.reply(200, user.getProfile(socialCauses, skills, CITY));
    });
    cy.intercept('POST', `${API_SERVER}/auth/refresh`, (req) => req.reply(200, { message: 'success' })).as(
      'refreshAuthorization',
    );
    cy.intercept('GET', `${API_SERVER}/auth/otp/confirm*`, (req) => {
      const url = new URL(req.url);
      const code = url.searchParams.get('code');

      if (code === '111111')
        req.reply(200, {
          access_token: ACCESS_TOKEN,
          refresh_token: REFRESH_TOKEN,
          token_type: TOKEN_TYPE,
        });
      else req.reply(400, { message: 'Invalid OTP' });
    });
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

  it('it should redirect user after the sign-up process to the very exact job details page [Normal User]', () => {
    // Visit jobs page
    cy.visit(`${APP_URL}/jobs`);

    // Go to the job details
    cy.contains('a', 'Read more').click();
    cy.url().should('include', '/jobs/');

    // wait for router to switch page
    cy.contains('button', 'Apply now').should('not.be.disabled');
    cy.contains('button', 'Apply now').parent().parent().scrollIntoView().click({ force: true });
    cy.get('#auth-guard-modal').should('exist');

    //check if it ask you to login
    cy.contains('button', 'Create an account').click();
    cy.get('#signup-modal').should('exist');

    // Fill in the random email address, continue and check the route
    cy.get('input#email').type(user.email);
    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/sign-up/user/verification');
    cy.contains('button', 'Verify email').should('be.disabled');

    // Type in 1 on each input field, Click verify and check the route
    cy.get('input[type="tel"]').each(($input) => {
      cy.wrap($input).type('1');
    });
    cy.contains('button', 'Verify email').click();
    cy.url().should('include', '/sign-up/user/password');
    cy.contains('button', 'Continue').should('be.disabled');

    // Enter password & Confirm password, continue and check the route
    cy.get('input[name=password]').type(PASSWORD);
    cy.get('input[name=confirm]').type(PASSWORD);
    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/sign-up/user/complete');
    cy.contains('button', 'Continue').should('be.disabled');

    // Fill Username and Lastname, continue and check the route
    cy.get('input[name=firstName]').type(user.firstname);
    cy.get('input[name=lastName]').type(user.lastname);
    cy.get('input[name=username]').type(user.username);
    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/sign-up/user/congrats');
    cy.contains('button', 'Continue').should('not.be.disabled');

    //Just hit continue and check the route
    cy.contains('button', 'Continue').click();
    cy.get('#apply-job').should('exist');
    cy.get('textarea[name=coverLetter]').eq(1).type('Example Cover Letter');
    cy.fixture('example.pdf').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'example.pdf',
        mimeType: 'application/pdf',
      });
    });
    cy.contains('button', 'Submit').click();
    cy.get('#apply-job').should('not.exist');
  });
});
