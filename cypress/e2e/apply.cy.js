/// <reference types = "cypress"/>
import ApplyPage from './pages/ApplyPage';
import TestingData from '../fixtures/TestingData.json';

const apply = new ApplyPage();
describe('Apply', () => {
  beforeEach(() => {
    cy.loginUsingUI(TestingData.EmailForLogin, TestingData.PasswordForLogin);
  });
  TestingData.posts.forEach((data) => {
  it('Apply job without attachment', () => {    
    cy.intercept('POST', `${Cypress.env('api_server')}/projects/fa0807ce-c1b5-4754-8dcb-b42bba5f7351/applicants`).as('reqAlias');
    cy.visit(`${Cypress.env('app_url')}/jobs/fa0807ce-c1b5-4754-8dcb-b42bba5f7351`);
    //apply.clickOnTheFirstJobPost();
    //apply.assertShowingApplyButton();
    apply.clickOnApplyBtn();
    apply.setMessage(data.text);
    apply.uploadResume(data.cv);
    apply.clickOnSubmitBtn();
   // apply.assertApplyBtnIsDisabled()
    cy.wait('@reqAlias');
    cy.get('@reqAlias').then((req) => {
      expect(req.response.statusCode).to.equal(200);
      //expect(req.response.body).to.have.ownProperty('content', TestingData.PostText);
      // expect(req.response.body).to.have.ownProperty('causes_tags',TestingData.SocialCause)
    });
  });
})  
});
