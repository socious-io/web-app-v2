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
    cy.intercept('GET', `${Cypress.env('api_server')}/projects*`);
    cy.intercept('POST', `${Cypress.env('api_server')}/projects`, { fixture: 'responses/CreateJob.json' }).as(
      'createJob'
    );
    cy.intercept('GET', `${Cypress.env('api_server')}/identities*`, (req) => {
      req.headers['Authorization'] = TestingData.token_type + TestingData.access_token;
    });
    cy.intercept('POST', `${Cypress.env('api_server')}/auth/refresh`, TestingData.refresh_token);
    cy.intercept('GET', `${Cypress.env('api_server')}/projects/*/offers*`);
    cy.intercept('GET', `${Cypress.env('api_server')}/projects/*/applicants*`);
    cy.intercept('GET', `${Cypress.env('api_server')}/projects/*/missions*`);
    cy.intercept('GET', `${Cypress.env('api_server')}/projects/categories*`);
  });
  TestingData.jobs.forEach((data, index) => {
    it('create job', function () {
      cy.intercept('GET', `${Cypress.env('api_server')}/projects/` + data.jobId + `*`); //overview
      //cy.visit(`${Cypress.env('app_url')}/jobs`);
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
      createjob.selectCountry(data.country);
      createjob.selectCity(data.city);
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
        cy.log(JSON.stringify(req.response.body.jobs));
        cy.log(JSON.stringify(req.response.body.jobs[index]));
        const res = req.response.body.jobs[index];
        expect(res).to.have.property('title', data.title);
        expect(res).to.have.property('description', data.description);
        expect(res).to.have.property('payment_range_lower', data.min_commitment);
        expect(res).to.have.property('payment_range_higher', data.max_commitment);
        expect(res).to.have.property('payment_type', data.payment_type.toUpperCase());
        expect(res).to.have.property('payment_scheme', data.payment_terms.toUpperCase());
        expect(res).to.have.property('remote_preference', data.remote_preference.toUpperCase());
        cy.visit(`${Cypress.env('app_url')}/d/jobs/created/` + data.jobId + `/overview`);
      });
    });
  });
});
