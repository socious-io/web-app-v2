import { NOTIFICATIONS, ONE_NOTIFICATION, USER_IDENTTITY, LOCATION, PROFILE, INDUSTRY } from './mocks';
import { API_SERVER, APP_URL, ORGANIZATION_USERNAME, VALID_EMAIL } from '../authentication/constants';

describe('user navigates to dashboard and creates organization', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_SERVER}/user/profile?t=*`, req => {
      req.reply(200, PROFILE);
    }).as('getProfile');
    cy.intercept('GET', `${API_SERVER}/user/impact-points?t=*`, req => {
      req.reply(200, { page: 1, limit: 10, total_count: 0, items: [] });
    }).as('getProfile');
    cy.intercept('GET', `${API_SERVER}/identities?t=*`, req => {
      req.reply(200, USER_IDENTTITY);
    }).as('getIdentity');
    cy.intercept('GET', `${API_SERVER}/notifications*t=*`, req => {
      req.reply(200, NOTIFICATIONS);
    }).as('getNotifications');
    cy.intercept('GET', `${API_SERVER}/chats/unreads/counts*t=*`, req => {
      req.reply(200, { count: 1 });
    }).as('getUnreadCounts');
    cy.intercept('POST', `${API_SERVER}/notifications/read/all`, req => {
      req.reply(200);
    }).as('readAll');
    cy.intercept('POST', `https://pulse.walletconnect.org/batch*`, req => {
      req.reply(200);
    });
    cy.intercept('GET', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings*`, req => {
      req.reply(200);
    }).as('getDesktopListings');
    cy.intercept('GET', `${API_SERVER}/dashboard/chats/summary*t=*`, req => {
      req.reply(200, ONE_NOTIFICATION);
    }).as('getOneNotification');
    cy.intercept('GET', `${API_SERVER}/socket.io/*`, req => {
      req.reply(200);
    }).as('socket');
    cy.intercept('GET', `${API_SERVER}/chats/contacts/chats/summary*t=*`, req => {
      req.reply(200);
    }).as('socket');
    cy.intercept('GET', `${API_SERVER}/chats/contacts/identities*t=*`, req => {
      req.reply(200);
    }).as('socket');
    cy.intercept('GET', `${API_SERVER}/chats/contacts/chats/*`, req => {
      req.reply(200);
    }).as('socket');

    // ================== after clicking on create organization ========================//

    cy.intercept('GET', `${API_SERVER}/sign-up/user/identities?t=*`, req => {
      req.reply(200);
    });

    // ================== organization info ===================//

    cy.intercept('POST', `${API_SERVER}/auth/preregister`, req => {
      req.reply(200, { shortname: null });
    }).as('postPreRegister');

    cy.intercept('GET', `${API_SERVER}/geo/locations?search=*&limit=*&page=*&t=*`, req => {
      req.reply(200, LOCATION);
    }).as('getLocation');
    cy.intercept('GET', `${API_SERVER}/orgs/d/industries?q=Community&t=*&page=1&limit=20`, req => {
      req.reply(200, INDUSTRY);
    });
    cy.intercept('POST', `${API_SERVER}/orgs?auto_member=true`, req => {
      req.reply(200);
    });
  });

  it('user successfuly creates a new organization', () => {
    cy.visit(`${APP_URL}dashboard/user`);
    cy.get('[data-testid="icon-dropdown"]').click();

    cy.contains('Create an organization').should('be.visible');
    cy.contains('Create an organization').click();

    cy.url().should('contain', '/onboarding');
    cy.contains('button', 'Create your organization').click({ force: true });

    cy.get('[data-testid="org-name-input"]').should('exist');

    cy.get('#name').then($el => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      nativeInputValueSetter?.call($el[0], 'TEST_ORGANIZATION');

      $el[0].dispatchEvent(new Event('input', { bubbles: true }));
      $el[0].dispatchEvent(new Event('change', { bubbles: true }));
    });

    cy.contains('button', 'Next: Organization type').should('be.enabled');
    cy.contains('button', 'Next: Organization type').click();

    cy.contains('Please select the category that best describes your organization').should('be.visible');
    cy.contains('div', 'Social Business').should('exist');

    cy.window().then(window => {
      const button = window.document.querySelector('[data-testid="select-card-group]') as HTMLButtonElement;
      if (button) {
        button.click();
      }
    });
    cy.contains('button', 'Next: Social causes').scrollIntoView();
    cy.contains('button', 'Next: Social causes').should('be.visible');
    cy.window().then(window => {
      const button = window.document.querySelector('[data-testid="next-button"]') as HTMLButtonElement;
      if (button) {
        button.click();
      }
    });
    cy.window().then(window => {
      const element = window.document.querySelector('[data-testid="multi-select"]') as HTMLElement;
      if (element) {
        element.click();
      }
    });
    cy.window().then(window => {
      const button = window.document.querySelector('[data-testid="next-button"]') as HTMLButtonElement;
      if (button) {
        button.click();
      }
    });

    cy.contains('What is your organization about?').should('be.visible');
    cy.contains('Poverty').should('be.visible');
    cy.contains('Poverty').click();
    cy.contains('Next: Logo').should('be.enabled');
    cy.contains('Next: Logo').click();

    cy.contains('Add your logo and short description').should('be.visible');
    cy.contains('Next: Contact information').should('be.enabled');
    cy.contains('Next: Contact information').click();

    cy.get('#email').then($el => {
      const input = $el[0] as HTMLInputElement;
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(input, VALID_EMAIL);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    cy.get('#username').then($el => {
      const input = $el[0] as HTMLInputElement;
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(input, ORGANIZATION_USERNAME);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    cy.contains('div', 'Search for a city')
      .parent()
      .find('input')
      .then($el => {
        const input = $el[0] as HTMLInputElement;
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(input, 'tehran');
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    cy.contains('Tehran').click();

    cy.contains('div', 'Search an industry')
      .parent()
      .find('input')
      .then($el => {
        const input = $el[0] as HTMLInputElement;
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(input, 'Community');
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    cy.contains('Community Services').click();

    cy.contains('div', 'Select a company size').should('be.visible');
    cy.contains('div', 'Select a company size').click();

    cy.contains('1-10 employees').should('be.visible');
    cy.contains('1-10 employees').click();

    cy.window().then(window => {
      const button = window.document.querySelector('[data-testid="next-button"]') as HTMLButtonElement;
      if (button) {
        button.click();
      }
    });
  });
});
