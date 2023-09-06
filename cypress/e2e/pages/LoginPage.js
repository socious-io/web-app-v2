class LoginPage {
  elements = {
    email_textbox: () => cy.get('input[name=email]'),
    password_textbox: () => cy.get('input[name=password]'),
    login_button: () => cy.contains('button', 'Sign in'),
  };

  gotoLoginPage(login_url) {
    cy.visit(login_url);
  }

  login(email, password) {
    this.elements.email_textbox().type(email);
    this.elements.password_textbox().type(password);
    this.elements.login_button().click();
  }
}

export default LoginPage;
