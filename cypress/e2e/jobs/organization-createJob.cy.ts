import { APP_URL, CITY, FIRSTNAME, LASTNAME, ORGANIZATION_EMAIL, ORGANIZATION_USERNAME, USERNAME } from "../authentication/constants";
import { generateRandomEmail, OrganizationUser, User } from "../authentication/utilities";
import { CATEGORIES, LOCATION, ORGANIZATION_PROJECTS, PROJECT_SKILLS } from "./mocks";

const SIGNINGUP_EMAIL = generateRandomEmail();
const socialCauses = ['Health', 'Security', 'Bullying'];
const organizationUser = new OrganizationUser(
    FIRSTNAME,
    LASTNAME,
    SIGNINGUP_EMAIL,
    USERNAME,
    ORGANIZATION_EMAIL,
    ORGANIZATION_USERNAME,
    CITY,
    socialCauses,
);

describe('logs in by organization and creates a Job', () => {
    beforeEach(() => {
        cy.intercept('POST', `https://pulse.walletconnect.org/batch?projectId=*&st=*&sv=*`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('GET', `${APP_URL}/identities*t=*`,
            req => {
                req.reply(200);
            }
        ).as('getOrganizationIdentity');

        cy.intercept('GET', `${APP_URL}/getDesktopListings?projectId=*&sdkType=*&sdkVersion=*&page=*&entries=*&version=*`,
            req => {
                req.reply(200);
            }
        ).as('getDesktopListings');

        cy.intercept('GET', `${APP_URL}/projects?t=*&identity_id=*&page=*&limit*`,
            req => {
                req.reply(200, ORGANIZATION_PROJECTS);
            }
        ).as('getOrganizationProjects');

        cy.intercept('GET', `${APP_URL}/notifications?t=*&page=*&limit=*`,
            req => {
                req.reply(200);
            }
        ).as('getNotifications');

        cy.intercept('GET', `${APP_URL}/chats/unreads/counts?t=*`,
            req => {
                req.reply(200, { "count": 4 });
            }
        ).as('getUnreadCounts');

        cy.intercept('GET', `${APP_URL}/projects/*/applicants?t=*&page=*&status=PENDING&limit=100`,
            req => {
                req.reply(200, { "page": 1, "limit": 100, "total_count": 0, "items": [] });
            }
        ).as('getApplicants');

        cy.intercept('GET', `${APP_URL}/jobs/identities?t=*`,
            req => {
                req.reply(200, organizationUser.getIdentity());
            }
        ).as('getApplicants');

        cy.intercept('GET', `${APP_URL}/getDesktopListings?projectId=*&sdkType=*&sdkVersion=*&page=*&entries=*&version=*`,
            req => {
                req.reply(200);
            }
        ).as('getApplicants');

        cy.intercept('GET', `${APP_URL}/user/umayanigina/recommend/jobs?t=*`,
            req => {
                req.reply(200);
            }
        ).as('getApplicants');

        cy.intercept('GET', `${APP_URL}/jobs/projects?t=*&identity_id=*&page=1&limit=10`,
            req => {
                req.reply(200, ORGANIZATION_PROJECTS);
            }
        ).as('getorgJobs');
        cy.intercept('GET', `${APP_URL}/jobs/projects/*/applicants?t=*&page=*&status=PENDING&limit=100`,
            req => {
                req.reply(200, { "page": 1, "limit": 100, "total_count": 0, "items": [] });
            }
        ).as('getorgJobs');
        cy.intercept('GET', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings?projectId=*`,
            req => {
                req.reply(200);
            }
        );

        //======================after clicking create job========================//

        cy.intercept('GET', `${APP_URL}/jobs/projects/categories*t=*`,
            req => {
                req.reply(200, CATEGORIES);
            }
        ).as('getProjectCategories');
        cy.intercept('GET', `${APP_URL}/jobs/skills*t=*&limit=*`,
            req => {
                req.reply(200, PROJECT_SKILLS);
            }
        ).as('getProjectSkills');
        cy.intercept('GET', `${APP_URL}/geo/locations?search=*&limit=*&page=*&t=*`,
            req => {
                req.reply(200, LOCATION);
            }
        ).as('getLocation');
    });

    it('organization navigates to create a job', () => {
        cy.visit(`${APP_URL}/jobs/created`);
        cy.contains('Jobs listing');

        // cy.get('[data-testid="create-job-button"]')
        //     .contains(/create job/i)
        //     .click({ force: true });
        cy.contains('Create job').click({ force: true });

        cy.url()
            .should('include', '/jobs/create');
    });

    it('should not let user publish by empty inputs', () => {
        cy.visit(`${APP_URL}/jobs/create`);
        cy.contains('Create a new job').should('be.visible');

        cy.get('[data-testid="create-job-button"]')
            .contains('Publish')
            .should('be.visible').then($el => {
                $el[0].click();
            });

        cy.contains('Required');
    });

    it('organization creates a job by selecting anywhere', () => {
        cy.visit(`${APP_URL}/jobs/create`);
        cy.contains('Create a new job')
            .should('be.visible');
        cy.contains('Search a cause')
            .click({ force: true });

        // cy.get('[data-testid="option"]')
        //     .first()
        //     .then($el => {
        //         $el[0].click();
        //     });
        cy.get('#cause-option-0')
            .first()
            .then($el => {
                $el[0].click();
            });

        cy.get('input[name="title"]')
            .invoke('val', 'Software Engineer');

        //=========================== important section============================//

        cy.contains('Select a category')
            .should('exist')
            .should('be.visible')
            .trigger('click');
        cy.get('[data-testid="option"]')
            .eq(1)
            .then($el => {
                cy.wrap($el).click();
            });

        //=========================================================================//

        cy.get('textarea[name="description"]')
            .should('be.visible')
            .focus()
            .invoke('val', 'we need a software engineer to test this application');
        // cy.get('input[name="Country / City"]').check({ force: true });
        cy.get('input[name="Anywhere"]').then($el => {
            $el[0].click();
        });

        // cy.get('[data-testid="remote-preference"]').scrollIntoView().type('Onsite');
        cy.get('[data-testid="remote-preference"]')
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });
    });

    it('organization creates a job by selecting city/country', () => {
        cy.visit(`${APP_URL}/jobs/create`);
        cy.contains('Create a new job')
            .should('be.visible');
        cy.contains('Search a cause')
            .click({ force: true });

        cy.get('[data-testid="option"]')
            .first().then($el => {
                $el[0].click();
            });

        cy.get('input[name="title"]').invoke('val', 'Software Engineer');

        //=========================== important section============================//

        cy.contains('Select a category')
            .should('exist')
            .should('be.visible')
            .trigger('click');
        cy.get('[data-testid="option"]').eq(1).then($el => {
            cy.wrap($el).click();
        });

        //=========================================================================//

        cy.get('textarea[name="description"]')
            .should('be.visible')
            .focus()
            .invoke('val', 'we need a software engineer to test this application');
        // cy.get('input[name="Country / City"]').check({ force: true });
        cy.get('input[name="Country / City"]').then($el => {
            // Trigger a click using JavaScript
            $el[0].click();
        });
        cy.contains('Search for a city');
        cy.contains('Search for a city')
            .parent()
            .children()
            .find('input').should('be.visible')
            .type('t');
        // cy.get('#city')
        cy.wait('@getLocation');

        cy.wait('@getProjectCategories');
    });
})