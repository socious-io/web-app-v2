import { APP_URL, VALID_EMAIL, VERIFICATION_CODE } from './constants';

describe('organization sign up test', () => {
  beforeEach(() => {
    cy.intercept('POST', `${APP_URL}/batch?projectId=*&st=events_sdk&sv=*`, req => {
      req.reply(200);
    }).as('postProject');

    cy.intercept('GET', `${APP_URL}/projects?t=/*&page=1&status=ACTIVE&limit=10`, req => {
      req.reply(200);
    }).as('getProjects');

    cy.intercept('GET', `${APP_URL}/identities?t=*`, req => {
      req.reply(200);
    });

    cy.intercept('GET', `${APP_URL}/projects?t=*&page=1&status=ACTIVE&limit=10`, req => {
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

    cy.intercept('POST', `${APP_URL}/sign-up/user/auth/preregister`, req => {
      req.reply(200);
    }).as('postPreRegister');
    cy.intercept('POST', `${APP_URL}/sign-up/user/auth/register?event_id=`, req => {
      req.reply(200);
    }).as('postRegister');

    // =============== email verification api intercepts ====================//

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
  });

  it('organization navigates to page intro and choses sign up as organization from the intro page', () => {
    cy.visit(`${APP_URL}`);
    cy.contains('Get Started').should('be.visible');

    cy.contains('div', 'I am hiring purpose-driven talent').click();

    cy.contains('button', 'Continue').should('be.enabled').click();

    cy.contains('Create an account');

    cy.get('#email').type(`${VALID_EMAIL}`);
    cy.contains('Continue').click();

    cy.get('input[aria-label^="Please enter OTP character"]').each(($el, index) => {
      cy.wrap($el).type(`${VERIFICATION_CODE}`);
    });

    cy.contains('button', 'Verify email').click();
    cy.wait('@confirmVerification').its('response.statusCode').should('eq', 200);
  });
});
