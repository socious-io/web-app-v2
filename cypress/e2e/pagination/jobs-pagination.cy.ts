import { APP_URL, FIRSTNAME, LASTNAME, USERNAME } from "../authentication/constants";
import { generateRandomEmail, User } from "../authentication/utilities";
import { MARK_AS_SAVE, NOT_INTERESTED, NOTIFICATIONS, PROJECT_DETAILS, PROJECTS, QUESTIONS, SAVED_JOBS, SKILLS } from "../jobs/mocks";

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

describe('user must apply to a job', () => {
    beforeEach(() => {
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

        //================Read more api mock section==============>

        cy.intercept('GET', `${APP_URL}/jobs/projects/*?t=*`,
            req => {
                req.reply(200, PROJECT_DETAILS);
            }
        ).as('getReadMoreProjects');

        cy.intercept('GET', `${APP_URL}/jobs/projects/*/questions?t=*`,
            req => {
                req.reply(200, QUESTIONS);
            }
        ).as('getReadMoreQuestions');

        cy.intercept('GET', `${APP_URL}/jobs/identities?t=*`,
            req => {
                req.reply(200, user.getIdentity());
            }
        ).as('getreadMoreIdentities');

        //========================== not interested =======================//

        cy.intercept('POST', `${APP_URL}/projects/*/mark?mark_as=NOT_INTERESTED`,
            req => {
                req.reply(200, NOT_INTERESTED);
            }
        ).as('postNotInterested');

        //============================ mark as save =====================//

        cy.intercept('POST', `${APP_URL}/projects/*/mark?mark_as=SAVE`,
            req => {
                req.reply(200, MARK_AS_SAVE);
            }
        ).as('postMarkAsSave');

        //=========================saved jobs==========================//

        cy.intercept('GET', `${APP_URL}/projects/mark?t=*&page=*&filter.marked_as=SAVE&limit=*`,
            req => {
                req.reply(200, SAVED_JOBS);
            }
        ).as('getSavedJobs')
    });
    it('user navigates to the jobs pannel and clicks not interested on a job', () => {
        cy.visit(`${APP_URL}/jobs`);
        cy.contains('Next').scrollIntoView().should('be.visible');
        cy.contains('Next').click();
    });
    it('Previous button must be desabled for the user that is on first page', () => {
        cy.visit(`${APP_URL}/jobs`);
        cy.contains('Previous').scrollIntoView().should('be.visible');
        cy.contains('Previous').should('be.disabled');
    });
    it('Previous button must be inabled for the user after navitgating to the second page', () => {
        cy.visit(`${APP_URL}/jobs`);
        cy.contains('Previous').scrollIntoView().should('be.visible');
        cy.contains('Previous').should('be.disabled');

        cy.contains('Next').should('be.visible');
        cy.contains('Next').click();

        cy.contains('Previous').should('be.enabled');

    });
    it('user clicks on the last page and the button Next must be disabled', () => {
        cy.visit(`${APP_URL}/jobs`);
        cy.contains('Previous').scrollIntoView().should('be.visible');
        cy.contains('Previous').should('be.disabled');

        cy.contains('14').should('exist').click();
        cy.contains('Next').should('be.disabled');
        cy.contains('Previous').should('be.enabled');

    });
})