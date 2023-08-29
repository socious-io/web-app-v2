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
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5MWEyNzdlLWRmZmQtNDE1Yy1hNTQzLTc5ZTI4ZjJiMjU5MSIsInJlZnJlc2giOmZhbHNlLCJpYXQiOjE2OTIyODc5NTEsImV4cCI6MTY5MjQ2MDc1MX0.C6nJGe96yN-TxfeVg7ceEIS9V1jqukJcW4zIHbaKpP0',
            refresh_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5MWEyNzdlLWRmZmQtNDE1Yy1hNTQzLTc5ZTI4ZjJiMjU5MSIsInJlZnJlc2giOnRydWUsImlhdCI6MTY5MjI4Nzk1MSwiZXhwIjoxNjk0ODc5OTUxfQ.uhiOGvd41rMQanuRojlO2J8976m3_2ibezEpmtt2AU8',
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
    cy.contains('button', 'Sign in').click();

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
