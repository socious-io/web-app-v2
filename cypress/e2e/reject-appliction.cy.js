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
    //cy.intercept('POST', `${Cypress.env('api_server')}/auth/refresh`, TestingData.refresh_token);
    cy.intercept('GET', `${Cypress.env('api_server')}/projects*`);
    cy.intercept('GET', `${Cypress.env('api_server')}/projects/*/offers*`);
    cy.intercept('GET', `${Cypress.env('api_server')}/projects/*/applicants*`);
    cy.intercept('GET', `${Cypress.env('api_server')}/projects/*/missions*`);
    cy.intercept('GET', `${Cypress.env('api_server')}/projects/categories*`);
    cy.intercept('GET', `https://explorer-api.walletconnect.com/v3/wallets?projectId=*`)
    
    cy.intercept('POST', `${Cypress.env('api_server')}/applicants/*/reject`, { fixture: 'responses/Reject.json' }).as(
      'reqReject'
    );    
    cy.intercept('GET', `${Cypress.env('api_server')}/projects/*/questions*`);
  });
  TestingData.rejectApplication.forEach((data) => {
    it('Reject application', () => {
      reject.clickOnswitchAccountLink();
      reject.selectOrgAccount();
      cy.visit(`${Cypress.env('app_url')}/jobs`);
      reject.clickOnCreatedLink();
      reject.clickOnOngoingLink();
      reject.clickOnFirstJob();
      //cy.visit(`${Cypress.env('app_url')}/d/jobs/created` + data.jobId+`/overview`);
      reject.clickOnapplicantsTab();
      reject.clickOntoReviewTab();
      reject.clickOnopenApplication();
      //reject.clickOnrejectBtn();
      cy.wait('@reqReject');
      cy.get('@reqReject').then((req) => {});
    });
  });
});
