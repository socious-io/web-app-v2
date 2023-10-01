/// <reference types = "cypress"/>
import RejectApplicationPage from './pages/RejectApplicationPage';
import TestingData from '../fixtures/TestingData.json';

const reject = new RejectApplicationPage();
describe('Reject', () => {
  before(function () {
    Cypress.config('defaultCommandTimeout', 9000);
  });
  beforeEach(() => {
    cy.loginUsingUI(TestingData.EmailForLogin, TestingData.PasswordForLogin);
    cy.intercept('GET', `${Cypress.env('api_server')}/identities*`, (req) => {
      req.headers['Authorization'] = TestingData.token_type + TestingData.access_token;
    });
    cy.intercept('GET', `${Cypress.env('api_server')}/projects*`);
    cy.intercept('POST', `${Cypress.env('api_server')}/projects/*/applicants`, { fixture: 'responses/Apply.json' }).as(
      'reqApply'
    );
    cy.intercept('GET', `${Cypress.env('api_server')}/projects/*/questions*`).as('reqQuestions');
  });
  TestingData.rejectApplication.forEach((data) => {
    it('Reject application', () => {
      cy.visit(`${Cypress.env('app_url')}/jobs/` + data.jobId);
      reject.clickOnswitchAccountLink();
      reject.selectOrgAccount();
      reject.clickOnCreatedLink();
      reject.clickOnOngoingLink();
      reject.clickOnapplicantsTab();
      reject.clickOntoReviewTab();
      reject.clickOnopenApplication();
      //reject.clickOnrejectBtn();
      cy.wait('@reqApply');
      cy.get('@reqApply').then((req) => {});
    });
  });
});
