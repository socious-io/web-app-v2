import { APP_URL } from "../authentication/constants";

describe('organization navigating to credentials', () => {
    beforeEach(() => {

        //===================== issued ==================//

        cy.intercept('GET', `${APP_URL}/credentials/experiences?t=*&page=1&limit=10`,
            req => {
                req.reply(200, { "page": 1, "limit": 10, "total_count": 0, "items": [] });
            }
        ).as('getCredentialsExperiences');

        cy.intercept('GET', `${APP_URL}/credentials/educations?t=*&page=1&limit=10`,
            req => {
                req.reply(200, { "page": 1, "limit": 10, "total_count": 0, "items": [] });
            }
        ).as('getCredentialsEducations');

        cy.intercept('POST', `https://cloudflareinsights.com/cdn-cgi/rum`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('POST', `https://webapp2.socious.io/cdn-cgi/zaraz/t`,
            req => {
                req.reply(200);
            }
        );

        //====================== Requested =====================//

        


    });

});