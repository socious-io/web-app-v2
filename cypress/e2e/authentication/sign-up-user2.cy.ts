import {
  APP_URL,
  FIRSTNAME,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  LASTNAME,
  USERNAME,
  VALID_EMAIL,
  VALID_PASSWORD,
  VERIFICATION_CODE,
  WRONG_EMAIL,
} from './constants';

describe('user signs up to the platform', () => {
  beforeEach(() => {
    cy.intercept('POST', `${APP_URL}/batch?projectId=*&st=events_sdk&sv=*`, req => {
      req.reply(200);
    }).as('postProject');

    cy.intercept('GET', `${APP_URL}/projects?t=/*&page=1&status=ACTIVE&limit=10`, req => {
      req.reply(200);
    }).as('getProjects');
    cy.intercept(
      'GET',
      `${APP_URL}/getDesktopListings?projectId=*&sdkType=wcm&sdkVersion=js-2.7.0&page=1&entries=9&version=2`,
      req => {
        req.reply(200);
      },
    ).as('getDesktopListing');
    cy.intercept('POST', `${APP_URL}/sign-up/user/auth/preregister`, req => {
      req.reply(200);
    }).as('postPreRegister');
    cy.intercept('POST', `${APP_URL}/getDesktopListings?projectId=&sdkTyp`, req => {
      req.reply(200);
    });
    cy.intercept('POST', `${APP_URL}/sign-up/user/auth/register?event_id=`, req => {
      req.reply(200);
    }).as('postRegister');

    //================= verification api===================//

    cy.intercept('GET', `${APP_URL}/sign-up/user/auth/otp/confirm?t=*&email=VALID-EMAIL%40GMAIL.COM&code=*`, req => {
      if (req.url.includes('code=000000')) {
        // Simulating incorrect OTP
        req.reply({
          statusCode: 400,
          body: { message: 'Invalid verification code' },
        });
      } else {
        req.reply(200);
      }
    }).as('confirmVerification');

    cy.intercept(
      'GET',
      `${APP_URL}/getDesktopListings?projectId=*&sdkType=*&sdkVersion=*&page=1&entries=9&version=2`,
      req => {
        req.reply(200);
      },
    );
    cy.intercept('GET', `${APP_URL}/projects?t=*&page=1&status=ACTIVE&limit=10`, req => {
      req.reply(200);
    });
    cy.intercept('GET', `${APP_URL}/identities?t=*`, req => {
      req.reply(200);
    });
    cy.intercept('GET', `${APP_URL}/getDesktopListings?projectId=*&sdkTy`, req => {
      req.reply(200);
    });
    cy.intercept('GET', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings?projectId=*&sdkTyp`, req => {
      req.reply(200);
    });

    // =============== password chosing page =============/

    cy.intercept('GET', `${APP_URL}/sign-up/user/identities?t=*`, req => {
      req.reply(200);
    }).as('getIdentities');

    cy.intercept('GET', `https://pulse.walletconnect.org/batch?projectId=*&st=events_sdk&sv=js-2.17.0`, req => {
      req.reply(200);
    });
    cy.intercept('POST', `https://pulse.walletconnect.org/batch?projectId=*&st=events_sdk&sv=js-2.17.0`, req => {
      req.reply(200);
    });
    cy.intercept(
      'GET',
      `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings?projectId=*&sdkType=wcm&sdkVersion=js-2.7.0&page=1&entries=9&version=2`,
      req => {
        req.reply(200);
      },
    );
    cy.intercept('POST', `${APP_URL}/sign-up/user/user/change-password-direct`, req => {
      req.reply(200);
    });
    cy.intercept('GET', `${APP_URL}/sign-up/user/user/profile?t=*`, req => {
      req.reply(200);
    });
  });
  it('user signs up with valid email with username not beeing available', () => {
    cy.visit(`${APP_URL}`);
    cy.contains('Get Started').should('be.visible');

    cy.contains('div', 'I am seeking impact work').should('exist');
    cy.contains('div', 'I am seeking impact work').click();

    cy.contains('button', 'Continue').click();
    cy.url().should('contain', `/sign-up/user/email`);

    cy.get('#email').type(`${VALID_EMAIL}`);
    cy.contains('Continue').click();
    cy.wait('@postRegister');

    cy.get('input[aria-label^="Please enter OTP character"]').each(($el, index) => {
      cy.wrap($el).type(`${VERIFICATION_CODE}`);
    });

    cy.contains('button', 'Verify email').click();
    cy.wait('@confirmVerification').its('response.statusCode').should('eq', 200);

    cy.visit(`${APP_URL}/sign-up/user/password`);

    cy.get('#password').type(`${VALID_PASSWORD}`);
    cy.get('#confirm-password').type(`${VALID_PASSWORD}`);

    cy.get('img[src="/icons/check-circle-green.svg"]').should('be.visible');

    cy.contains('button', 'Continue').should('be.enabled').click();
    cy.url().should('include', '/complete');

    cy.get('#first-name').type(`${FIRSTNAME}`);
    cy.get('#last-name').type(`${LASTNAME}`);
    cy.get('#username').type(`${USERNAME}`);

    cy.contains('Username is not available').should('be.visible');
  });

  it('passwords mismatch in choose a password page', () => {
    cy.visit(`${APP_URL}`);
    cy.contains('Get Started').should('be.visible');

    cy.contains('div', 'I am seeking impact work').should('exist');
    cy.contains('div', 'I am seeking impact work').click();

    cy.contains('button', 'Continue').click();
    cy.url().should('contain', `/sign-up/user/email`);

    cy.get('#email').type(`${VALID_EMAIL}`);
    cy.contains('Continue').click();
    cy.wait('@postRegister');

    cy.get('input[aria-label^="Please enter OTP character"]').each(($el, index) => {
      cy.wrap($el).type(`${VERIFICATION_CODE}`);
    });

    cy.contains('button', 'Verify email').click();
    cy.wait('@confirmVerification').its('response.statusCode').should('eq', 200);

    cy.visit(`${APP_URL}/sign-up/user/password`);

    cy.get('#password').type(`${VALID_PASSWORD}`);
    cy.get('#confirm-password').type(`${INVALID_PASSWORD}`);

    cy.contains('button', 'Continue').should('be.disabled');
  });

  it('user signs up with valid email with a valid username', () => {
    cy.visit(`${APP_URL}`);
    cy.contains('Get Started').should('be.visible');

    cy.contains('div', 'I am seeking impact work').should('exist');
    cy.contains('div', 'I am seeking impact work').click();

    cy.contains('button', 'Continue').click();
    cy.url().should('contain', `/sign-up/user/email`);

    cy.get('#email').type(`${VALID_EMAIL}`);
    cy.contains('Continue').click();
    cy.wait('@postRegister');

    cy.get('input[aria-label^="Please enter OTP character"]').each(($el, index) => {
      cy.wrap($el).type(`${VERIFICATION_CODE}`);
    });

    cy.contains('button', 'Verify email').click();
    cy.wait('@confirmVerification').its('response.statusCode').should('eq', 200);

    cy.visit(`${APP_URL}/sign-up/user/password`);

    cy.get('#password').type(`${VALID_PASSWORD}`);
    cy.get('#confirm-password').type(`${VALID_PASSWORD}`);

    cy.get('img[src="/icons/check-circle-green.svg"]').should('be.visible');

    cy.contains('button', 'Continue').should('be.enabled').click();
    cy.url().should('include', '/complete');

    cy.get('#first-name').type(`${FIRSTNAME}`);
    cy.get('#last-name').type(`${LASTNAME}`);
    cy.get('#username').type(`${USERNAME}`);

    cy.contains('button', 'Continue').should('be.enabled').click();
  });

  it('user signs up with valid email and inserts the wrong validation code', () => {
    cy.visit(`${APP_URL}`);
    cy.contains('Get Started').should('be.visible');

    cy.contains('div', 'I am seeking impact work').should('exist');
    cy.contains('div', 'I am seeking impact work').click();

    cy.contains('button', 'Continue').click();
    cy.url().should('contain', `/sign-up/user/email`);

    cy.get('#email').type(`${VALID_EMAIL}`);
    cy.contains('Continue').click();
    cy.wait('@postRegister');

    cy.get('input[aria-label^="Please enter OTP character"]').each(($el, index) => {
      cy.wrap($el).type(`000000`);
    });

    cy.contains('button', 'Verify email').click();

    cy.wait('@confirmVerification').its('response.statusCode').should('eq', 400);
  });

  it('user inserts invalid email and gets enter a correct email error', () => {
    cy.visit(`${APP_URL}`);
    cy.contains('Get Started').should('be.visible');

    cy.contains('div', 'I am seeking impact work').should('exist');
    cy.contains('div', 'I am seeking impact work').click();

    cy.contains('button', 'Continue').click();
    cy.url().should('contain', `/sign-up/user/email`);

    cy.get('#email').type(`${WRONG_EMAIL}`);
    cy.contains('Continue').click();

    cy.contains('Enter a correct email');
  });
});
