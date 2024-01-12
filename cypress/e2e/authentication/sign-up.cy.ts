describe('Sign up', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('api_server')}/auth/preregister*`, {
      statusCode: 200,
      body: { message: 'success' },
    });

    // Mock the register API call
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
          body: { message: 'OTP verified successfully' },
      });
      } else {
        req.reply({
          statusCode: 400,
          body: { message: 'Invalid OTP' },
        });
      }
    });

    // cy.intercept('GET', `${Cypress.env('api_server')}/auth/otp/confirm?email=*`, {
    //   statusCode: 200,
    //   body: { message: 'success' },
    // });
  });

  it('it should check sign up process', () => {
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


  });

  it('it should checks if emal already exists', () => {
    cy.visit(`${Cypress.env('app_url')}/sign-up/user/email`);

    // Fill in the username
    cy.get('input[name=email]').type('existingEmail@test.com');

    // Click submit
    cy.contains('button', 'Continue').click();
    cy.wait(2000);
    cy.url().should('include', `${Cypress.env('app_url')}/sign-up/user/email`);
  });
});
