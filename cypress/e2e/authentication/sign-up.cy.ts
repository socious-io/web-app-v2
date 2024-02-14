
import cypress from 'cypress';

describe('Sign up', () => {
 
  beforeEach(() => {
    // Mock the register API call
    // cy.intercept('GET', `${Cypress.env('api_server')}/identities*`, {
    //   statusCode: 401,
    //   body: { message: 'unauthorized' },
    // });
    
    cy.intercept('GET', `${Cypress.env('api_server')}/identities*`, {
       statusCode: 200,
       body: {
    "current": true,
    "primary": true,
    "id": "f0850c9f-0acb-495d-adb4-fb14743e4937",
    "type": "users",
    "meta": {
      "id": "f0850c9f-0acb-495d-adb4-fb14743e4937",
      "city": null,
      "name": "Umaya Doe",
      "email": "gomed67739@seosnaps.com",
      "avatar": null,
      "status": "ACTIVE",
      "address": null,
      "country": null,
      "username": "umayadoe56",
      "open_to_work": false,
      "wallet_address": null,
      "open_to_volunteer": false
    },
    "created_at": "2022-10-10T08:18:28.121Z"
  },
     });
    cy.intercept('POST', `${Cypress.env('api_server')}/auth/register`, (req) => {
      if (req.body.email === 'existingEmail@test.com')
        req.reply({
          statusCode: 400,
        });
      else
        req.reply({
          statusCode: 200,
          body: { message: 'success' },
        });
    });

    cy.intercept('GET', `${Cypress.env('api_server')}/auth/otp/confirm*`, (req) => {
      console.log('Intercepted OTP request:', req);
      const url = new URL(req.url);
      const code = url.searchParams.get('code');
      const email = url.searchParams.get('email');

      if (code === '111111') {
        req.reply({
          statusCode: 200,
          body: { message: 'OTP verified successfully',
         
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjY5YmFlLWE2YjktNGY1Mi1iNTcwLTY1YWY1ZDU1NmUwYyIsInJlZnJlc2giOmZhbHNlLCJpYXQiOjE3MDc4NTk5NjQsImV4cCI6MTcwODAzMjc2NH0.QKnjj6NDDjgp9l98NdXEeiccWFQAKUCdurjBuVo9Nl8",
            "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjY5YmFlLWE2YjktNGY1Mi1iNTcwLTY1YWY1ZDU1NmUwYyIsInJlZnJlc2giOnRydWUsImlhdCI6MTcwNzg1OTk2NCwiZXhwIjoxNzEwNDUxOTY0fQ.LGhM8vfH1XP4nq0gUIeSGjDk-uhBdrC2Rd3d6_-9KOY",
            "token_type": "Bearer"
                } ,
        });
      } else {
        req.reply({
          statusCode: 400,
          body: { message: 'Invalid OTP' },
        });
      }
    });

    cy.intercept('POST', `${Cypress.env('api_server')}/user/change-password-direct`, {
      statusCode: 200,
      body: { message: 'success' },
    });
    

    cy.intercept('GET', `${Cypress.env('api_server')}/user/profile*`, {
      statusCode: 200,
      body: { 
        "id": "f0850c9f-0acb-495d-adb4-fb14743e4937",//53b69bae-a6b9-4f52-b570-65af5d556e0c
        "username": "gomed677399069",
        "first_name": null,
        "last_name": null,
        "city": null,
        "country": null,
        "geoname_id": null,
        "mission": null,
        "bio": null,
        "impact_points": 0,
        "skills": null,
        "followers": 0,
        "followings": 0,
        "created_at": "2024-02-13T20:04:36.596Z",
        "wallet_address": null,
        "proofspace_connect_id": null,
        "phone": null,
        "address": null,
        "social_causes": null,
        "avatar": null,
        "cover_image": null,
        "reported": false,
        "mobile_country_code": null,
        "open_to_work": false,
        "open_to_volunteer": false,
        "educations": null,
        "portfolios": null,
        "certificates": null,
        "recommendations": null,
        "languages": null,
        "experiences": null
     },
    });

    cy.intercept('POST', `${Cypress.env('api_server')}/auth/preregister`, {
      statusCode: 200,
      body: { 
        "username": null,
        "email": null
      },
  }).as('reqAlias');

    cy.intercept('POST', `${Cypress.env('api_server')}/user/update/profile`, {
      statusCode: 200,
      body: { 
        "id": "f0850c9f-0acb-495d-adb4-fb14743e4937",
  "username": "umayadoe56",
  "first_name": "Umaya",
  "last_name": "Doe",
  "city": null,
  "country": null,
  "geoname_id": null,
  "mission": null,
  "bio": null,
  "impact_points": 0,
  "skills": [],
  "followers": 0,
  "followings": 0,
  "created_at": "2024-02-13T20:04:36.596Z",
  "wallet_address": null,
  "proofspace_connect_id": null,
  "phone": null,
  "address": null,
  "social_causes": null,
  "avatar": null,
  "cover_image": null,
  "reported": false,
  "mobile_country_code": null,
  "open_to_work": false,
  "open_to_volunteer": false,
  "educations": null,
  "portfolios": null,
  "certificates": null,
  "recommendations": null,
  "languages": null,
  "experiences": null
       },
    });
  });
 

  it.only('it should check sign up process', () => {
    cy.visit(`${Cypress.env('app_url')}/sign-up/user/email`);

    // Fill in the random email address
    cy.get('input[name=email]').type(`${Date.now()}@gmail.com`);

    // Click submit
    cy.contains('button', 'Continue').click();

    // Wait for the register API call to complete
    cy.wait(3000);

    cy.url().should('include', '/sign-up/user/verification');

    // Type in 1 on each input field
    cy.get('input[type="tel"]').each(($input) => {
      cy.wrap($input).type('1');
    });

    // Click on the Verify email button
    cy.contains('button', 'Verify email').click();

    // check whether we are on the password setting page
    cy.url().should('include', '/sign-up/user/password');

    // Enter password
    cy.get('input[name=password]').type('Socious1234!');

    // Confirm password
    cy.get('input[name=confirm]').type('Socious1234!');

    // Click continue
    cy.contains('button', 'Continue').click();

    // Wait for the API call to complete
    cy.wait(3000);

    // check whether we are on the complete page
    cy.url().should('include', '/sign-up/user/complete');
    // Type first name
    cy.get('input[name=firstName]').type('Umaya');

    // Type last name
    cy.get('input[name=lastName]').type('Nigina');

    // Type false user name
    cy.get('input[name=username]').type(`a12`);
    cy.get('input[name=username]').clear();
    // Type user name
    cy.get('input[name=username]').type(`umaya${Date.now()}`);
    cy.contains('Continue').focus().click();

    // cy.wait('@reqAlias')
    // cy.get('@reqAlias').then((req)=>{
       // Click on Continue
      //  cy.wait(1000);
      //  cy.contains('button', 'Continue').focus().click();
      //  cy.contains('button', 'Continue').click({force: true});
      //  cy.contains('button', 'Continue').trigger('mouseover').wait(1000).click().click({force:true});
      //  cy.contains('button', 'Continue').click().click();
      //  cy.contains('button', 'Continue').wait(1000).click();
      //  cy.contains('button', 'Continue').trigger("click");  
       
    //    cy.contains('Continue').click({force: true});
    // cy.contains('Continue').trigger('mouseover').wait(1000).click().click({force:true});
    // cy.contains('Continue').click().click();
    // cy.contains('Continue').wait(1000).click();
    // cy.contains('Continue').trigger("click");   
    //cy.contains('button', 'Continue').click().click();
    //cy.contains('Continue').should('be.visible').trigger('mouseover').click({ force: true }); 
   
    // cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary').focus().click();
    // cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary').trigger('mouseover').wait(1000).click().click({force:true});
    // cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary').click().click();
    // cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary').wait(1000).click();
    // cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary').trigger("click"); 
    //})   

    // Wait for the API call to complete
    //cy.wait(4000);
    // check whether we are on the congrats page
    cy.url().should('include', '/sign-up/user/congrats');
    //https://webapp2.dev.socious.io/sign-up/user/congrats
    cy.contains('button', 'Continue').click();
    cy.wait(4000);
    // check whether we are on the onboarding page
    cy.url().should('include', '/sign-up/user/onboarding');
    cy.contains('button', 'Complete your profile').click();

    // // Wait for the register API call to complete
    // cy.wait(3000);

    // // social causes
    // cy.get('input[id="social-causes"]').type('poverty').type('{enter}');
    // cy.contains('button', 'Next: Skills').click();

    // // skills
    // cy.get('input[id="skills"]').type('css').type('{enter}');
    // cy.contains('button', 'Next: Location').click();
  });

  
  it('it should checks if email already exists', () => {
    cy.visit(`${Cypress.env('app_url')}/sign-up/user/email`);

    // Fill in the username
    cy.get('input[name=email]').type('existingEmail@test.com');

    // Click submit
    cy.contains('button', 'Continue').click();
    cy.wait(2000);
    cy.url().should('include', `${Cypress.env('app_url')}/sign-up/user/email`);
  });
});
