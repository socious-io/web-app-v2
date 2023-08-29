describe('Sign up', () => {
  beforeEach(() => {
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

    cy.intercept('GET', `${Cypress.env('api_server')}/auth/otp/confirm?email=*`, {
      statusCode: 200,
      body: { message: 'success' },
    });
  });

  it('it should check sign up process', () => {
    cy.visit(`${Cypress.env('app_url')}/sign-up/user/email`);

    // Fill in the username
    cy.get('input[name=email]').type(Cypress.env('email'));

    // Click submit
    cy.contains('button', 'Continue').click();
    // Wait for the register API call to complete
    cy.wait(2000);

    cy.url().should('include', '/sign-up/user/verification');

    cy.get('input[type="number"]').each(($input) => {
      cy.wrap($input).type('1');
    });
    cy.contains('button', 'Verify email').click();

    cy.url().should('include', '/sign-up/user/complete');
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
