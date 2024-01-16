describe('Sign in', () => {
  beforeEach(() => {
    // Mock the register API call
    cy.intercept('POST', `${Cypress.env('api_server')}/auth/login`, (req) => {
      if (req.body.password === 'wrongPassword')
        req.reply({
          statusCode: 400,
        });
      else
        req.reply({
          statusCode: 200,
          body: {
            access_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwYmRkMTUwLTUxZjUtNGI2Yy04MzQ3LTA3NTBhNWEyMjQwMSIsInJlZnJlc2giOmZhbHNlLCJpYXQiOjE2OTIwOTM3MjIsImV4cCI6MTY5MjI2NjUyMn0.IXAK6TS8-htzWyiz4mlJZQJAOVMEqyO_d-j8qM6vvZg',
            refresh_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwYmRkMTUwLTUxZjUtNGI2Yy04MzQ3LTA3NTBhNWEyMjQwMSIsInJlZnJlc2giOnRydWUsImlhdCI6MTY5MjA5MzcyMiwiZXhwIjoxNjk0Njg1NzIyfQ.38XG3Pc70kjF_D_RrSrcvd7C0J13bzgKnGuuGsfgtuQ',
            token_type: 'Bearer',
          },
        });
    });

    cy.intercept('GET', `${Cypress.env('api_server')}/auth/otp/confirm?email=*`, {
      statusCode: 200,
      body: { message: 'success' },
    });
  });

  it('logs in with valid credentials', () => {
    // Visit the login page
    cy.visit(`${Cypress.env('app_url')}/sign-in`);

    // Fill in the username and password
    cy.get('input[name=email]').type(Cypress.env('email'));
    cy.get('input[name=password]').type(Cypress.env('password'));

    // Click submit
    cy.contains('button', 'Continue').click();

    // wait for router to switch page
    cy.wait(3000);

    // Check if the login was successful
    cy.url().should('include', `${Cypress.env('app_url')}/jobs`);
  });

  it('fails to log in with invalid credentials', () => {
    // Visit the login page
    cy.visit(`${Cypress.env('app_url')}/sign-in`);

    // Fill in the username and password
    cy.get('input[name=email]').type(Cypress.env('email'));
    cy.get('input[name=password]').type('wrongPassword');

    // Click the 'Sign in' button
    cy.contains('button', 'Sign in').click();

    // Check if the login failed
    cy.url().should('include', '/sign-in');
  });
});
