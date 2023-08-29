/// <reference types = "cypress"/>
import CreateJobPage from './pages/CreateJobPage'
import TestingData from '../fixtures/TestingData.json'

describe('Create job suit', ()=>{
    beforeEach(() => {        
       cy.loginUsingUI(TestingData.EmailForLogin,TestingData.PasswordForLogin)       
     });  
   it('create job1 Volunteer Fixed', () =>{       
       const createjob = new CreateJobPage()
       cy.intercept('POST', `${Cypress.env('api_server')}/projects`, (req) => {
        req.reply({
            statusCode: 200,
            body: {
                description: "Automated Test Job Descrirption1- Remote, Full time, More than 6months, Volunteer & Fixed-payment Job",
                project_type: "FULL_TIME",
                project_length: "6_MONTHS_OR_MORE",
                payment_range_lower: "1",
                payment_range_higher: "2",
                experience_level: 0,    
                payment_type: "VOLUNTEER",
                payment_scheme: "FIXED",
                title: "Automated Test Job Title1-Remote, Full time, More than 6months, Volunteer & Fixed-payment Job",    
                country: "IR",
                skills: ["ACCOUNTING"],
                causes_tags: ["POVERTY"],    
                remote_preference: "REMOTE",    
                city: "Abadan"              
            },
          });
      }).as ('reqAlias') 
       cy.visit(`${Cypress.env('app_url')}/jobs`);           
       createjob.clickOnswitchAccountLink()
       createjob.selectOrgAccount()
       cy.wait(3000); 
       createjob.clickOnCreatedLink()       
       createjob.clickOncreateJobLink()
       createjob.assertShowingSocialCauseStep()
       createjob.selectSocialCause()
       createjob.clickOnContinueButton()
       createjob.assertShowingSkillStep()
       createjob.selectSkills()
       createjob.clickOnContinueButton()
       createjob.setTitle(TestingData.JobTitle1)
       createjob.setDesc(TestingData.JobDescription1)
       createjob.selectJobCategory(TestingData.JobCategory)
       createjob.selectCountry()       
       createjob.selectCity()
       createjob.selectRemotePreference(TestingData.RemotePreferenceTextRemote)
       createjob.selectJobTyp(TestingData.JobTypeTextFullTime)
       createjob.selectJobLength(TestingData.JobLengthTextMorethan6)
       createjob.selectPaymentVolunteer()
       createjob.selectPaySchemeFixed()
       createjob.selectMinCommitment(1)
       createjob.selectMaxCommitment(2)
       //createjob.selectExperienceLevel(TestingData.ExperienceLevelExpert)
       createjob.clickOnContinueButton()
       createjob.clickOnSkipBtnInScreenerStep()       
       cy.wait('@reqAlias')
       cy.get('@reqAlias').then( (req) => {
           expect(req.response.statusCode).to.equal(200)
           expect(req.response.body).to.have.ownProperty('description',TestingData.JobDescription1)
           expect(req.response.body.city).to.equal('Abadan')
           //expect(req.response.body.causes_tags).to.equal('POVERTY')
           expect(req.response.body.experience_level).to.equal(0)           
       })

   })
   /* it('create job2', () =>{

   }) */
   /* it('create job3', () =>{

   }) */
   /* it('create job4', () =>{

   }) */
})