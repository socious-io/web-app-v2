Cypress.Commands.add('loginUsingApi', (email, password) => {
  cy.session(
    email,
    () => {
      cy.request('POST', `${Cypress.env('api_server')}auth/login`, { email: email, password: password }).then(
        ($resp) => {
          expect($resp.status).to.eq(200);
          window.localStorage.clear();
          window.localStorage.setItem('access_token', $resp.body.access_token);
        }
      );
    },
    { cacheAcrossSpecs: true }
  );
});
Cypress.Commands.add('loginUsingUI', (email, password) => {
  //cy.session([email,password], () => {
  cy.visit(`${Cypress.env('app_url')}/sign-in`);
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.contains('button', 'Sign in').click();
  cy.wait(5000);
  cy.location('pathname').should('eq', '/jobs');
  //})
});
