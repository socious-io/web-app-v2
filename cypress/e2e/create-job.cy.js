/// <reference types = "cypress"/>
import CreateJobPage from './pages/CreateJobPage';
import TestingData from '../fixtures/TestingData.json';

const createjob = new CreateJobPage();
describe('Create job suit', function () {
  beforeEach(() => {
    cy.loginUsingUI(TestingData.EmailForLogin, TestingData.PasswordForLogin);
  });
  TestingData.jobs.forEach((data) => {
    it('create job', function () {
      cy.intercept('POST', `${Cypress.env('api_server')}/projects`, (req) => {
        req.reply({
          statusCode: 200,
          body: {
            description:
              'Automated Test Job Descrirption1- Remote, Full time, More than 6months, Volunteer & Fixed-payment Job',
            project_type: 'FULL_TIME',
            project_length: '6_MONTHS_OR_MORE',
            payment_range_lower: '1',
            payment_range_higher: '2',
            experience_level: 0,
            payment_type: 'VOLUNTEER',
            payment_scheme: 'FIXED',
            title: 'Automated Test Job Title1-Remote, Full time, More than 6months, Volunteer & Fixed-payment Job',
            country: 'IR',
            skills: ['ACCOUNTING'],
            causes_tags: ['POVERTY'],
            remote_preference: 'REMOTE',
            city: 'Abadan',
          },
        });
      }).as('reqAlias');
      cy.visit(`${Cypress.env('app_url')}/jobs`);
      createjob.clickOnswitchAccountLink();
      createjob.selectOrgAccount();
      cy.wait(5000);
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
      cy.wait('@reqAlias');
      cy.get('@reqAlias').then((req) => {
        //expect(req.response.statusCode).to.equal(200);
        // expect(req.response.body).to.have.ownProperty('description', TestingData.JobDescription1);
        // expect(req.response.body.city).to.equal('Abadan');
        //expect(req.response.body.causes_tags).to.equal('POVERTY')
        // expect(req.response.body.experience_level).to.equal(0);
      });
      /* createjob.clickOnswitchAccountLink();
    createjob.logout(); */
    });
  });
});
