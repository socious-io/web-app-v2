/// <reference types = "cypress"/>
import ApplyPage from './pages/ApplyPage';
import TestingData from '../fixtures/TestingData.json';

const apply = new ApplyPage();
describe('Apply', () => {
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
    cy.intercept('GET', `${Cypress.env('api_server')}/projects/*/questions*`).as(
      'reqQuestions'
    );
  });
  TestingData.apply.forEach((data) => {
    it('Apply job without attachment', () => {
      cy.visit(`${Cypress.env('app_url')}/jobs/`+ data.jobId);
      apply.assertShowingApplyButton();
      apply.clickOnApplyBtn();
      apply.setMessage(data.message);
      apply.uploadResume(data.cv);
      apply.clickOnSubmitBtn();
      // apply.assertApplyBtnIsDisabled()
      cy.wait('@reqApply');
      cy.get('@reqApply').then((req) => {
        //expect(req.response.statusCode).to.equal(200);
        //expect(req.response.body).to.have.ownProperty('content', TestingData.PostText);
        // expect(req.response.body).to.have.ownProperty('causes_tags',TestingData.SocialCause)
      });
    });
  });
});
