import { API_SERVER, API_SERVER_V3, APP_URL, CITY, FIRSTNAME, LASTNAME, ORGANIZATION_EMAIL, ORGANIZATION_USERNAME, USERNAME } from "../authentication/constants";
import { generateRandomEmail, OrganizationUser } from "../authentication/utilities";
import { ORGANIZATION_PROJECTS } from "../jobs/mocks";
import { CATEGORIES, IDENTITY_SERVICES, ORG_ODENTITY, ORG_PROFESSIONALS, SERCVISES, SERVICE_DETAIL } from "./mocks";

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

const orgName = organizationUser.getIdentity()[0].meta.name;

const getMockSearchResponse = (shouldReturnEmpty) => {
    return shouldReturnEmpty
        ? { "page": 1, "limit": 20, "total_count": 0, "items": [] }
        : ORG_PROFESSIONALS;
};

describe('organization applying to professionals', () => {
    let returnEmpty = false;
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

        cy.intercept('GET', `${APP_URL}/identities*t=*`,
            req => {
                req.reply(200);
            }
        ).as('getOrganizationIdentity');

        cy.intercept('GET', `${APP_URL}/dashboard/my_organization/user/impact-points?t=*`,
            req => {
                req.reply(200, { "page": 1, "limit": 10, "total_count": 0, "items": [] });
            }
        );

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

        cy.intercept('GET', `${APP_URL}/dashboard/identities?t=*`,
            req => {
                req.reply(200, organizationUser.getIdentity());
            }
        ).as('getApplicants');
        cy.intercept('GET', `${APP_URL}/dashboard/my_organization/orgs/by-shortname/my_organization?t=*`,
            req => {
                req.reply(200, organizationUser.getIdentity());
            }
        ).as('getApplicants');
        cy.intercept('GET', `${APP_URL}/dashboard/my_organization/identities?t=*`,
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

        // =============== after clicking on find professionals ==============//

        // cy.intercept('POST', `${APP_URL}/search/v2?limit=10&page=1`,
        //     req => {
        //         req.reply(200, ORG_PROFESSIONALS);
        //     }
        // );
        // cy.intercept('POST', `${APP_URL}/dashboard/my_organization/search/v2?limit=10&page=1`,
        //     req => {
        //         req.reply(200, ORG_PROFESSIONALS);
        //     }
        // );
        // cy.intercept('GET', `${APP_URL}/dashboard/*/projects/categories?t=*`,
        //     req => {
        //         req.reply(200, CATEGORIES);
        //     }
        // );
        // cy.intercept('GET', `${APP_URL}/projects/categories?t=*`,
        //     req => {
        //         req.reply(200, CATEGORIES);
        //     }
        // );
        // cy.intercept('GET', `${APP_URL}/dashboard/*/notifications?t=*&page=1&limit=50`,
        //     req => {
        //         req.reply(200);
        //     }
        // );

        cy.intercept('POST', `${APP_URL}/search/v2?page=1&limit=20`, (req) => {
            const response = getMockSearchResponse(returnEmpty);
            req.reply(200, response);
        });
        cy.intercept('GET', `${APP_URL}/search/v2?page=1&limit=20`, (req) => {
            const response = getMockSearchResponse(returnEmpty);
            req.reply(200, response);
        }).as('mockSearch');
        
        cy.intercept('POST', `${APP_URL}/dashboard/my_organization/search/v2?limit=10&page=1`, (req) => {
            const response = getMockSearchResponse(returnEmpty);
            req.reply(200, response);
        }).as('getProfessionals');


        //===============search detail ==============//
        cy.intercept('POST', new RegExp(`${APP_URL}/search/v2.*`), (req) => {
            const response = getMockSearchResponse(returnEmpty);
            req.reply(200, response);
        }).as('mockSearch');

        cy.intercept('GET', `${APP_URL}/jobs/identities?t=*`,
            req => {
                req.reply(200, organizationUser.getIdentity());
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

    it('organization navigates to services page and gets the services', () => {
        returnEmpty = false;
        cy.visit(`${APP_URL}/dashboard/my_organization/org`);

        cy.contains('Find services').should('be.visible');
        cy.get('[data-testid="card-button"]').eq(0).should('exist').should('be.enabled');
        cy.get('[data-testid="card-button"]').eq(0).click({ force: true });

    });
})