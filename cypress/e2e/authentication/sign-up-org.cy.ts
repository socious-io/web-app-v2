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
  ORGANIZATION_NAME,
  ORGANIZATION_EMAIL,
  ORGANIZATION_USERNAME,
} from './constants';
import { INDUSTRIES, LOCATIONS, PROJECTS, SKILLS } from './mocks';
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

describe('Sign up', () => {
  beforeEach(() => {
    // Mock the register API call
    cy.intercept('GET', `${API_SERVER}/identities*`, req => {
      if (req.headers.authorization == `${TOKEN_TYPE} ${ACCESS_TOKEN}`) req.reply(user.getIdentity());
      else req.reply(401, { message: 'unauthorized' });
    });
    cy.intercept('GET', `${API_SERVER}/skills*`, req => req.reply(SKILLS));
    cy.intercept('GET', `${API_SERVER}/orgs/d/industries*`, req => req.reply(INDUSTRIES));
    cy.intercept('POST', `${API_SERVER}/orgs?auto_member=true`, req => req.reply(200, { message: 'success' }));
    cy.intercept('GET', `${API_SERVER}/orgs/by-shortname/*`, req => req.reply(200, organizationUser.get()));
    cy.intercept('GET', `${API_SERVER}/geo/locations*`, req => req.reply(LOCATIONS));
    cy.intercept('POST', `${API_SERVER}/user/change-password-direct*`, req => req.reply(200, { message: 'success' }));
    cy.intercept('POST', `${API_SERVER}/user/update/profile*`, req => req.reply(200, { message: 'success' }));
    cy.intercept('GET', `${API_SERVER}/user/profile*`, req => req.reply(200, { message: 'success' }));
    cy.intercept('GET', `${API_SERVER}/notifications*`, req => req.reply(200, { message: 'success' })).as(
      'getNotifications',
    );
    cy.intercept('GET', `${API_SERVER}/projects*`, req => req.reply(200, PROJECTS)).as('getProjects');
    cy.intercept('GET', `${API_SERVER}/chats/unreads/counts*`, req => req.reply(200, { message: 'success' })).as(
      'getUnreadChatsCount',
    );
    cy.intercept('GET', `${API_SERVER}/connections/related/*`, req => req.reply(200, { connect: null }));
    cy.intercept('POST', `${API_SERVER}/auth/preregister*`, req =>
      req.reply(200, { username: null, shortname: null, message: 'success' }),
    );
    cy.intercept('POST', `${API_SERVER}/auth/register`, req => {
      if (req.body.email === EXISTING_EMAIL_ADDRESS) req.reply({ statusCode: 400 });
      else req.reply(200, { message: 'success' });
    });
    cy.intercept('POST', `${API_SERVER}/auth/refresh`, req => req.reply(200, { message: 'success' })).as(
      'refreshAuthorization',
    );
    cy.intercept('GET', `${API_SERVER}/user/by-username/**`, req => {
      return req.reply(200, user.getProfile(socialCauses, skills, CITY));
    });
    cy.intercept('GET', `${API_SERVER}/auth/otp/confirm*`, req => {
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

  it('it should check the sign up process for organization user', () => {
    //Approach the sign-up page
    cy.visit(`${APP_URL}/intro`);
    cy.contains('div', 'I am hiring purpose-driven talent').parent().parent().click();
    cy.contains('button', 'Continue').click();

    // Fill in the random email address, continue and check the route
    cy.get('input#email').type(organizationUser.email);
    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/sign-up/user/verification');

    // Type in 1 on each input field, Click verify and check the route
    cy.get('input[type="tel"]').each($input => {
      cy.wrap($input).type('1');
    });
    cy.contains('button', 'Verify email').click();
    cy.url().should('include', '/sign-up/user/password');

    // Enter password & Confirm password, continue and check the route
    cy.get('input[name=password]').type(PASSWORD);
    cy.get('input[name=confirm]').type(PASSWORD);
    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/sign-up/user/complete');

    // Fill Username and Lastname, continue and check the route
    cy.get('input[name=firstName]').type(organizationUser.firstname);
    cy.get('input[name=lastName]').type(organizationUser.lastname);
    cy.get('input[name=username]').type(organizationUser.username);
    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/sign-up/user/congrats');

    //Just hit continue and check the route
    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/sign-up/user/onboarding');

    //Just hit Create your organization
    cy.contains('button', 'Create your organization').click();

    //Select 3 social causes
    cy.get('input#name').type(ORGANIZATION_NAME);
    cy.contains('button', 'Next: Organization type').parent().click();
    cy.contains('button', 'Next: Social causes').parent().click();

    //Select 3 social causes
    socialCauses.forEach(socialCause => cy.contains('span', socialCause).parent().click());
    cy.contains('button', 'Next: Logo').parent().click();
    cy.contains('button', 'Next: Contact information').parent().click();

    //Fill the organization form
    cy.get('input[name=email]').type(organizationUser.orgEmail);
    cy.get('input[name=username]').type(organizationUser.orgUsername);

    // cy.wait(2000);

    //Select location (FIXME: name or data-* instead of id)
    cy.get('input[aria-labelledby="searchDropdown-city"]').type(CITY);
    cy.get('#city-option-0').click();

    //Select industry (FIXME: name or data-* instead of id)
    cy.get('#industry').click();
    cy.get('input[aria-labelledby="searchDropdown-industry"]').type('A');
    cy.get('#industry-option-0').click();

    cy.get('#size').click();
    cy.get('#size-option-0').click();

    cy.contains('button', 'Continue').click();
    cy.url().should('include', '/profile/organizations/my_organization/view');
  });
});
