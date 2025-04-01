import { HtmlHTMLAttributes } from "react";
import { APP_URL, ORGANIZATION_USERNAME, VALID_EMAIL } from "../authentication/constants";
import { PROFILE } from "../userProfile/mocks";
import { NOTIFICATIONS, ONE_NOTIFICATION, USER_IDENTTITY } from "../userSettings/mocks";
import { LOCATION } from "../jobs/mocks";

describe('user navigates to dashboard and creates organization', () => {
    beforeEach(() => {
        cy.intercept('GET', `${APP_URL}/dashboard/user/profile?t=*`, req => {
            req.reply(200, PROFILE);
        }).as('getProfile');
        cy.intercept('GET', `${APP_URL}/dashboard/user/impact-points?t=*`, req => {
            req.reply(200, { page: 1, limit: 10, total_count: 0, items: [] });
        }).as('getProfile');
        cy.intercept('GET', /http:\/\/localhost:3000\/dashboard\/identities\?t=\d+/, req => {
            req.reply(200, USER_IDENTTITY);
        }).as('getIdentity');
        cy.intercept('GET', `${APP_URL}/dashboard/notifications*t=*`, req => {
            req.reply(200, NOTIFICATIONS);
        }).as('getNotifications');
        cy.intercept('GET', `${APP_URL}/chats/unreads/counts*t=*`, req => {
            req.reply(200, { count: 1 });
        }).as('getUnreadCounts');
        cy.intercept('POST', `${APP_URL}/dashboard/notifications/read/all`, req => {
            req.reply(200);
        }).as('readAll');
        cy.intercept('POST', `https://pulse.walletconnect.org/batch*`, req => {
            req.reply(200);
        });
        cy.intercept('GET', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings*`, req => {
            req.reply(200);
        }).as('getDesktopListings');
        cy.intercept('GET', `${APP_URL}/dashboard/chats/summary*t=*`, req => {
            req.reply(200, ONE_NOTIFICATION);
        }).as('getOneNotification');
        cy.intercept('GET', `${APP_URL}/socket.io/*`, req => {
            req.reply(200);
        }).as('socket');
        cy.intercept('GET', `${APP_URL}/chats/contacts/chats/summary*t=*`, req => {
            req.reply(200);
        }).as('socket');
        cy.intercept('GET', `${APP_URL}/chats/contacts/identities*t=*`, req => {
            req.reply(200);
        }).as('socket');
        cy.intercept('GET', `${APP_URL}/chats/contacts/chats/*`, req => {
            req.reply(200);
        }).as('socket');

        // ================== after clicking on create organization ========================//

        cy.intercept('GET', `${APP_URL}/sign-up/user/identities?t=*`,
            req => {
                req.reply(200);
            }
        );

        // ================== organization info ===================//

        cy.intercept('POST', `${APP_URL}/sign-up/user/auth/preregister`,
            req => {
                req.reply(200, { "shortname": null });
            }
        ).as('postPreRegister');

        cy.intercept('GET', `${APP_URL}/geo/locations?search=*&limit=*&page=*&t=*`,
            req => {
                req.reply(200, LOCATION);
            }
        ).as('getLocation');
    });

    it('user successfuly creates a new organization', () => {
        cy.visit(`${APP_URL}/dashboard/user`);
        cy.get('[data-testid="icon-dropdown"]').click()

        cy.contains('Create an organization').should('be.visible');
        cy.contains('Create an organization').click();

        cy.url().should('contain', '/onboarding');
        cy.contains('button', 'Create your organization').click({ force: true });

        cy.get('[data-testid="org-name-input"]').should('exist');

        cy.get('#name').then(($el) => {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'value'
            )?.set;
            nativeInputValueSetter?.call($el[0], 'TEST_ORGANIZATION');

            $el[0].dispatchEvent(new Event('input', { bubbles: true }));
            $el[0].dispatchEvent(new Event('change', { bubbles: true }));
        });

        cy.contains('button', 'Next: Organization type').should('be.enabled');
        cy.window().then((window) => {
            const button = window.document.querySelector('[data-testid="continue-button"]') as HTMLButtonElement;
            if (button) {
                button.click();
            }
        });

        cy.contains('Please select the category that best describes your organization').should('be.visible');
        cy.contains('div', 'Social Business').should('exist');

        cy.window().then((window) => {
            const button = window.document.querySelector('[data-testid="select-card-group]') as HTMLButtonElement;
            if (button) {
                button.click();
            }
        });
        cy.contains('button', 'Next: Social causes').scrollIntoView().should('be.visible');
        cy.window().then((window) => {
            const button = window.document.querySelector('[data-testid="next-button"]') as HTMLButtonElement;
            if (button) {
                button.click();
            }
        });

        // cy.contains('Poverty').click({ force: true });
        cy.window().then((window) => {
            const element = window.document.querySelector('[data-testid="multi-select"]') as HTMLElement;
            if (element) {
                element.click();
            }
        });
        cy.window().then((window) => {
            const button = window.document.querySelector('[data-testid="next-button"]') as HTMLButtonElement;
            if (button) {
                button.click();
            }
        });

        cy.contains('Tell us more about your organization').should('be.visible');
        cy.window().then((window) => {
            const button = window.document.querySelector('[data-testid="next-button"]') as HTMLButtonElement;
            if (button) {
                button.click();
            }
        });

        cy.contains('Add your contact information').should('be.visible');

        cy.get('#email').then(($el) => {
            const input = $el[0] as HTMLInputElement;
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'value'
            )?.set;

            if (nativeInputValueSetter) {
                nativeInputValueSetter.call(input, VALID_EMAIL);
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        cy.get('#username').then(($el) => {
            const input = $el[0] as HTMLInputElement;
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'value'
            )?.set;

            if (nativeInputValueSetter) {
                nativeInputValueSetter.call(input, ORGANIZATION_USERNAME);
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        cy.contains('div', 'Search for a city')
            .parent()
            .find('input')
            .invoke('val', 'tehran')
            .trigger('change')
            .trigger('input');


        // cy.contains('div', 'Search for a city')
        //     .parent()
        //     .find('input')
        //     .then(($input) => {
        //         cy.wrap($input).invoke('val', 'tehran').trigger('input');
        //     });

        cy.wait('@getLocation');
        cy.contains('Search an industry').click();
        cy.contains('Select a company size').focus().type('tehran');

        cy.window().then((window) => {
            const button = window.document.querySelector('[data-testid="next-button"]') as HTMLButtonElement;
            if (button) {
                button.click();
            }
        });


    });
})