/// <reference types = "cypress"/>
import CreateOrganizationPage from './pages/CreateOrganizationPage';
import TestingData from '../fixtures/TestingData.json';

const createorganization = new CreateOrganizationPage();

describe('Add org', () => {
  before(function () {
    Cypress.config('defaultCommandTimeout', 9000);
  });
  beforeEach(() => {
    cy.loginUsingUI(TestingData.EmailForLogin, TestingData.PasswordForLogin);
    cy.intercept('POST', `${Cypress.env('api_server')}/orgs`, { fixture: 'responses/AddOrganization.json' }).as(
      'AddOrg'
    );
    cy.intercept('POST', `${Cypress.env('api_server')}/auth/refresh`, TestingData.refresh_token);
  });

  TestingData.organization.forEach((data, index) => {
    it('create org', () => {
      cy.visit(`${Cypress.env('app_url')}/jobs`);
      createorganization.gotoCreateOrg();
      createorganization.clickOnContinueBtn();
      createorganization.selectOrgTyp();
      createorganization.clickOnContinueBtn();
      createorganization.assertShowingSocialCauseStep();
      createorganization.selectSocialCause();
      createorganization.clickOnContinueBtn();
      createorganization.setOrganizationName(data.organizationName);
      createorganization.setOrganizationBio(data.organizationBio);
      createorganization.setOrganizationEmail(data.organizationEmail);
      createorganization.selectCountry();
      createorganization.selectCity();
      createorganization.checkAgreement();
      createorganization.clickOnContinueBtn();
      createorganization.clickOnSkip();
      createorganization.assertShowingOrgCultureLabel();
      createorganization.assertDisabledButton();
      createorganization.setOrganizationCulture(data.organizationCulture);
      createorganization.clickOnContinueBtn();
      createorganization.assertShowingOrgCreatedLabel();
      createorganization.clickOnContinueBtn();
      createorganization.assertShowingGetVerifiedLabel();
      createorganization.clickOnContinueBtn();
      cy.wait('@AddOrg');
      cy.get('@AddOrg').then((req) => {
        expect(req.response.statusCode).to.equal(200);
        cy.log(JSON.stringify(req.response.body));
        const res = req.response.body.addOrganization[index];
        expect(res).to.have.property('name', data.organizationName);
        expect(res).to.have.property('bio', data.organizationBio);
        expect(res).to.have.property('culture', data.organizationCulture);
      });
    });
  });
});
