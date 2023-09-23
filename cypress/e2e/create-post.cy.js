/// <reference types = "cypress"/>
import CreatePostPage from './pages/CreatePostPage';
import TestingData from '../fixtures/TestingData.json';

const createpost = new CreatePostPage();

describe('Create post', () => {
  beforeEach(() => {
    cy.loginUsingUI(TestingData.EmailForLogin, TestingData.PasswordForLogin);
    cy.intercept('POST', `${Cypress.env('api_server')}/posts`, { fixture: 'responses/CreatePost.json' }).as('reqAlias');
    cy.intercept('POST', `${Cypress.env('api_server')}/media/upload`, { fixture: 'responses/CreatePost.json' })
    cy.intercept('POST', `${Cypress.env('api_server')}/auth/refresh`, TestingData.refresh_token);
  });

  TestingData.posts.forEach((data) => {
    it('create post', () => {
      cy.visit(`${Cypress.env('app_url')}/feeds`);
      createpost.clickOnCreatePostLink();
      createpost.selectSocialCause();
      createpost.setContext(data.text);
      createpost.setContextImg(data.img);
      createpost.clickOnNextButton();
      createpost.clickOnPostButton();
      cy.wait('@reqAlias');
      cy.get('@reqAlias').then((req) => {
        expect(req.response.statusCode).to.equal(200);
        //expect(req.response.body).to.have.ownProperty('content', data.text);
        // expect(req.response.body).to.have.ownProperty('causes_tags',TestingData.SocialCause)
      });
    });
  });
});
