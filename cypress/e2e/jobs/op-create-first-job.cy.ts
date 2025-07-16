import { CREATED_JOB } from './mocks';
import {
  API_SERVER,
  APP_URL,
  CITY,
  FIRSTNAME,
  LASTNAME,
  ORGANIZATION_EMAIL,
  ORGANIZATION_USERNAME,
  USERNAME,
} from '../authentication/constants';
import { CATEGORIES, LOCATIONS, SKILLS } from '../authentication/mocks';
import { OrganizationUser, generateRandomEmail } from '../authentication/utilities';

const SIGNINGUP_EMAIL = generateRandomEmail();
const socialCauses = ['Health', 'Security', 'Bullying'];

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
describe('Create First Job', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_SERVER}/identities*`, req => {
      req.reply(organizationUser.getIdentity());
    });
    cy.intercept('GET', `${API_SERVER}/projects*`, req =>
      req.reply(200, { page: 1, limit: 5, total_count: 0, items: [] }),
    ).as('getProject');

    cy.intercept('GET', `${API_SERVER}/notifications*`, req => req.reply(200, { message: 'success' })).as(
      'getNotifications',
    );
    cy.intercept('GET', `${API_SERVER}/chats/unreads/counts*`, req => req.reply(200, { message: 'success' })).as(
      'getUnreadChatsCount',
    );

    cy.intercept('GET', `${API_SERVER}/projects/*/applicants*`, req => req.reply(200, [])).as('getApplicants');
    cy.intercept('GET', `${API_SERVER}/skills*`, req => req.reply(SKILLS));
    cy.intercept('GET', `${API_SERVER}/projects/categories*`, req => req.reply(CATEGORIES));
    cy.intercept('POST', `${API_SERVER}/projects`, req => req.reply(200, CREATED_JOB)).as('createJob');
    cy.intercept('GET', `${API_SERVER}/geo/locations*`, req => req.reply(LOCATIONS));
  });
  Cypress.on('uncaught:exception', () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it('it should open created jobs page and create the first job ', () => {
    // Visit jobs page
    cy.visit(`${APP_URL}jobs/created`);
    cy.get('#create-first-job').should('exist');
    cy.get('#create-first-job').click();

    cy.url().should('include', '/jobs/create');
    // select social causes
    cy.get('#cause').click();
    cy.get('#cause-option-0').click();

    // enter job title
    cy.get('input[name=title]').type('First job, Volunteer-Fixed');

    //select category
    cy.get('#category').click();
    cy.get('#category-option-0').click();

    cy.get('textarea[name=description]').type('Example Description');

    //select country
    cy.get('input[name="Country / City"]').check();
    cy.get('input[aria-labelledby="searchDropdown-city"]').should('exist');
    cy.get('input[aria-labelledby="searchDropdown-city"]').type(CITY);
    cy.get('#city-option-0').click();

    cy.get('#preference').click();
    cy.get('#preference-option-0').click();

    cy.get('#job-type').click();
    cy.get('#job-type-option-0').click();

    cy.get('#length').click();
    cy.get('#length-option-0').click();

    //select voulnteer fixed hours
    cy.get('input[name=Volunteer]').check();
    cy.get('input[name=Fixed]').check();
    cy.get('#commitmentHoursLower').type('20');
    cy.get('#commitmentHoursHigher').type('30');

    //select experience level
    cy.get('#experience-level').click();
    cy.get('#experience-level-option-0').click();

    //select skill
    cy.get('#skills').type('c');
    cy.contains('span', 'C++').parent().click();

    //publish job
    cy.contains('button', 'Publish').click();
  });
});
