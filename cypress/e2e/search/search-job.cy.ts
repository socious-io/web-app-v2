import { APP_URL, CITY, FIRSTNAME, LASTNAME, ORGANIZATION_EMAIL, ORGANIZATION_USERNAME, USERNAME } from "../authentication/constants";
import { PROJECTS, SKILLS } from "../authentication/mocks";
import { generateRandomEmail, OrganizationUser, User } from "../authentication/utilities";
import { QUESTIONS } from "../jobs/mocks";
import { PROFILE } from "../userProfile/mocks";
import { NOTIFICATIONS, ONE_NOTIFICATION, USER_IDENTTITY } from "../userSettings/mocks";
import { ORGS_DETAIL, SEARCH_RESULT, SEARCH_RESULT_DETAIL, SEARCHED_JOBS } from "./mocks";

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

const SEARCH_KEYWORD = 'development';

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


describe('search bar test automation for jobs', () => {
    beforeEach(() => {
        //====================general interceptions===================//
        cy.intercept('GET', `${APP_URL}/projects*t=*&page=*&status=*&limit=*`,
            req => {
                req.reply(200, PROJECTS);
            }
        ).as('getProjects');

        cy.intercept('GET', `${APP_URL}/identities*t=*`,
            req => {
                req.reply(user.getIdentity());
            }
        ).as('getIdentities');

        cy.intercept('POST', `https://pulse.walletconnect.org/batch*projectId=*&st=*&sv=*`,
            req => {
                req.reply(200);
            }
        );

        cy.intercept('GET', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings*projectId=*&sdkType=*&sdkVersion=*&page*&entries=*&version=*`,
            req => {
                req.reply(200);
            }
        );

        cy.intercept('GET', `${APP_URL}/skills*t=*&limit=*`,
            req => {
                req.reply(200, SKILLS);
            }
        ).as('getSkills');

        cy.intercept('GET', `${APP_URL}/notifications*t=*&page=*&limit=*`,
            req => {
                req.reply(200, NOTIFICATIONS);
            }
        ).as('getNotification');

        cy.intercept('GET', `${APP_URL}/user/*/recommend/jobs*t=*`,
            req => {
                req.reply(200, { "page": 1, "limit": 10, "total_count": 0, "items": [] });
            }
        ).as('getRecommendedJobs');

        cy.intercept('GET', `${APP_URL}/chats/unreads/counts*t=*`,
            req => {
                req.reply(200, { "count": 1 });
            }
        ).as('getUnreadCounts');

        //====================== interceptions ================//
        cy.intercept('POST', `${APP_URL}/search/v2?page=1&limit=20`,
            req => {
                req.reply(200, SEARCHED_JOBS);
            }
        );
        cy.intercept('GET', `${APP_URL}/search/v2?page=1&limit=20`,
            req => {
                req.reply(200, SEARCHED_JOBS);
            }
        );

        cy.intercept('POST', `${APP_URL}/search/v2?limit=10&page=*`,
            req => {
                req.reply(200, SEARCH_RESULT);
            }
        ).as('postSearch');

        //===============search detail ==============//
        cy.intercept('GET', `${APP_URL}/projects/*?t=*`,
            req => {
                req.reply(200, SEARCH_RESULT_DETAIL);
            }
        ).as('searchDetail');
        cy.intercept('GET', `${APP_URL}/jobs/projects/*?t=*`,
            req => {
                req.reply(200, SEARCH_RESULT_DETAIL);
            }
        ).as('searchDetail');
        cy.intercept('GET', `${APP_URL}/orgs/*?t=*`,
            req => {
                req.reply(200, ORGS_DETAIL);
            }
        ).as('orgsDetail');

        cy.intercept('GET', `${APP_URL}/jobs/identities?t=*`,
            req => {
                req.reply(200, user.getIdentity());
            }
        ).as('getreadMoreIdentities');

        cy.intercept('GET', `${APP_URL}/jobs/identities?t=*`,
            req => {
                req.reply(200, organizationUser.getIdentity());
            }
        ).as('getApplicants');
        cy.intercept('GET', `${APP_URL}/projects/*/questions?t=*`,
            req => {
                req.reply(200, QUESTIONS);
            }
        ).as('getApplicants');


    });

    it('user naviagatios to dashboard and searches for a DEVELOPMENT job and chooses from the suggestion', () => {
        cy.visit(`${APP_URL}/jobs`);
        cy.url().should('contain', '/jobs');
        cy.contains('Find work that matters to you and the world').should('be.visible');

        cy.get('#search-input').click();
        cy.get('#search-modal').type('development');
        cy.get('[data-testid="search-result"]').should('exist');
        cy.get('[data-testid="search-result"]').first().click();

    });
    it('user naviagatios to dashboard and searches for a DEVELOPMENT job', () => {
        cy.visit(`${APP_URL}/jobs`);
        cy.url().should('contain', '/jobs');
        cy.contains('Find work that matters to you and the world').should('be.visible');

        cy.get('#search-input').click();
        cy.get('#search-modal').type('development{enter}');
        cy.wait('@postSearch');

        cy.contains(`Search for ${SEARCH_KEYWORD}`);        
    });
    it('user naviagatios to dashboard and searches for a user and clicks on people', () => {
        cy.visit(`${APP_URL}/jobs`);
        cy.url().should('contain', '/jobs');
        cy.contains('Find work that matters to you and the world').should('be.visible');

        cy.get('#search-input').click();
        cy.get('#search-modal').type('Shant');

        cy.contains('div', 'People').click();
        cy.wait('@postSearch');

    });
})