/// <reference types = "cypress"/>
import CreateJobPage from './pages/CreateJobPage';
import TestingData from '../fixtures/TestingData.json';

const createjob = new CreateJobPage();
describe('Create job suit', function () {
  before(function () {
    Cypress.config('defaultCommandTimeout', 9000);
  });
  beforeEach(() => {
    cy.loginUsingUI(TestingData.EmailForLogin, TestingData.PasswordForLogin);
    cy.intercept('GET', `${Cypress.env('api_server')}/identities*`, (req) => {
      req.headers['Authorization'] = TestingData.token_type + TestingData.access_token;
    });
    cy.intercept('GET', `${Cypress.env('api_server')}/projects*`);
    cy.intercept('POST', `${Cypress.env('api_server')}/projects`, { fixture: 'responses/CreateJob.json' }).as(
      'createJob'
    );
    cy.intercept('POST', `${Cypress.env('api_server')}/auth/refresh`, TestingData.refresh_token);
  });
  TestingData.jobs.forEach((data) => {
    it('create job', function () {
      cy.visit(`${Cypress.env('app_url')}/jobs`);
      cy.log(Cypress.config('defaultCommandTimeout'));
      createjob.clickOnswitchAccountLink();
      createjob.selectOrgAccount();
      cy.visit(`${Cypress.env('app_url')}/jobs`);
      createjob.clickOnCreatedLink();
      createjob.clickOncreateJobLink();
      createjob.assertShowingSocialCauseStep();
      createjob.selectSocialCause();
      createjob.clickOnContinueButton();
      createjob.assertShowingSkillStep();
      createjob.selectSkills();
      createjob.clickOnContinueButton();
      createjob.setTitle(data.title);
      createjob.setDesc(data.description);
      createjob.selectJobCategory(data.category);
      createjob.selectCountry();
      createjob.selectCity();
      createjob.selectRemotePreference(data.remote_preference);
      createjob.selectJobTyp(data.type);
      createjob.selectJobLength(data.length);
      createjob.selectPaymentType(data.payment_type);
      createjob.selectPaymentScheme(data.payment_terms);
      createjob.selectMinCommitment(data.min_commitment);
      createjob.selectMaxCommitment(data.max_commitment);
      //createjob.selectExperienceLevel(TestingData.ExperienceLevelExpert)
      createjob.clickOnContinueButton();
      createjob.clickOnSkipBtnInScreenerStep();
      cy.wait('@createJob');
      cy.get('@createJob').then((req) => {
        expect(req.response.statusCode).to.equal(200);
      });
    });
  });
});
