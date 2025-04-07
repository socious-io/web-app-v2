import { APP_URL, CITY, FIRSTNAME, LASTNAME, ORGANIZATION_EMAIL, ORGANIZATION_USERNAME, USERNAME } from "../authentication/constants";
import { PROJECTS, SKILLS } from "../authentication/mocks";
import { generateRandomEmail, OrganizationUser, User } from "../authentication/utilities";
import { QUESTIONS } from "../jobs/mocks";
import { PROFILE } from "../userProfile/mocks";
import { NOTIFICATIONS, ONE_NOTIFICATION, USER_IDENTTITY } from "../userSettings/mocks";
import { ORGS_DETAIL, SEARCH_ORGANIZATIONS, SEARCH_PEOPLE, SEARCH_RESULT, SEARCH_RESULT_DETAIL, SEARCHED_JOBS } from "./mocks";

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

const SEARCH_KEYWORD = 'OrganizationTest';

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

const getMockSearchResponse = (shouldReturnEmpty) => {
    return shouldReturnEmpty
        ? { "page": 1, "limit": 20, "total_count": 0, "items": [] }
        : SEARCH_ORGANIZATIONS;
};


describe('search bar test automation for jobs', () => {
    let returnEmpty = false; // Default value
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
        cy.intercept('POST', `${APP_URL}/search/v2?page=1&limit=20`, (req) => {
            const response = getMockSearchResponse(returnEmpty);
            req.reply(200, response);
        });
        cy.intercept('GET', `${APP_URL}/search/v2?page=1&limit=20`, (req) => {
            const response = getMockSearchResponse(returnEmpty);
            req.reply(200, response);
        }).as('mockSearch');


        //===============search detail ==============//
        cy.intercept('POST', new RegExp(`${APP_URL}/search/v2.*`), (req) => {
            const response = getMockSearchResponse(returnEmpty);
            req.reply(200, response);
        }).as('mockSearch');

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
        cy.intercept('GET', `${APP_URL}/connections/related/*?t=*`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('GET', `${APP_URL}/projects/categories?t=*`,
            req => {
                req.reply(200);
            }
        );


    });

    it('user navigates to jobs page and opens the search organization modal', () => {
        returnEmpty = false;
        cy.visit(`${APP_URL}/jobs`);
        cy.url().should('contain', '/jobs');
        cy.contains('Find work that matters to you and the world').should('be.visible');

        cy.get('#search-input').click();
        cy.contains('div', 'Organizations').click();

        cy.get('#search-modal').type(`${SEARCH_KEYWORD}{enter}`);

        cy.contains(`Search for ${SEARCH_KEYWORD}`).should('be.visible');
        cy.contains('button', 'Filters').should('be.visible');
        cy.contains('Filters').click({ force: true });
    });

})