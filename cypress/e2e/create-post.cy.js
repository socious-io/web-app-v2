/// <reference types = "cypress"/>
import CreatePostPage from './pages/CreatePostPage'
import TestingData from '../fixtures/TestingData.json'

describe('Create post', ()=>{
     beforeEach(() => {        
        //cy.loginUsingApi('testazintest4@gmail.com','Socious1234') 
        cy.loginUsingUI('testazintest2@gmail.com','Socious1234')  
        
      });  
    it('create post', () =>{
        
        const createpost = new CreatePostPage()
        //cy.visit(`${Cypress.env('app_url')}/jobs`);
        cy.visit(`${Cypress.env('app_url')}/feeds`);        
        cy.intercept('POST', `${Cypress.env('api_server')}/posts`).as('reqAlias') 
        cy.visit(`${Cypress.env('app_url')}/feeds`);           
        createpost.clickOnCreatePostLink()
        createpost.selectSocialCause()
        createpost.setContext(TestingData.PostText)        
        createpost.clickOnNextButton()
        createpost.clickOnPostButton()
        cy.wait('@reqAlias')
        cy.get('@reqAlias').then( (req) => {
            expect(req.response.statusCode).to.equal(200)
            expect(req.response.body).to.have.ownProperty('content',TestingData.PostText)
           // expect(req.response.body).to.have.ownProperty('causes_tags',TestingData.SocialCause)
        })

    })
    /* it('create post including image', () =>{

    }) */
})