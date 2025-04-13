import { FOLLOW, FOLLOWERS, IDENTITES } from "./mocks";
import {
    APP_URL,
    CITY,
    FIRSTNAME,
    LASTNAME,
    ORGANIZATION_EMAIL,
    ORGANIZATION_USERNAME,
    USERNAME,
} from '../authentication/constants';
import { User, OrganizationUser, generateRandomEmail } from '../authentication/utilities';

const socialCauses = ['Health', 'Security', 'Bullying'];

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

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

describe('user connection', () => {
    beforeEach(() => {

        cy.intercept('GET', `${APP_URL}/identities*t=*`, req => {
            req.reply(200, organizationUser.getIdentity());
        });

        // ========================= Connection followers ================//

        cy.intercept('GET', `${APP_URL}/follows/followers?t=*&page=1&limit=10`,
            req => {
                req.reply(200, FOLLOWERS);
            }
        ).as('getFollowers');

        cy.intercept('GET', `${APP_URL}/connections?t=*&page=1&limit=*&filter.status=CONNECTED`,
            req => {
                req.reply(200);
            }
        ).as('getConnections');

        cy.intercept('POST', `https://pulse.walletconnect.org/batch?projectId=*&st=events_sdk&sv=js-2.17.0`,
            req => {
                req.reply(200);
            }
        );

        cy.intercept('POST', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings?proj`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('GET', `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings?projectId=*&sdkType=wcm&sdkVersion=js-2.7.0&page=1&entries=9&version=2`,
            req => {
                req.reply(200);
            }
        );
        cy.intercept('GET', `${APP_URL}/chats/unreads/counts?t=*`,
            req => {
                req.reply(200);
            }
        ).as('getUnreadCounts');
        cy.intercept('GET', `${APP_URL}/notifications?t=*&page=1&limit=50`,
            req => {
                req.reply(200);
            }
        ).as('getNotifications');

        //===================== after following =====================//

        cy.intercept('POST', `${APP_URL}/follows/*`,
            req => {
                req.reply(200, FOLLOW);
            }
        ).as('postFollow');
    });

    it('organization navigates to connections and goes to followers tab', () => {
        cy.visit(`${APP_URL}/connections`);

        cy.contains('Connections').should('be.visible');
        cy.contains('Followers').should('be.visible');
        cy.contains('Followers').click().pause();

        cy.contains('button', 'Follow').should('be.visible');
        cy.contains('button', 'Follow').click();
        cy.wait('@postFollow').its('response.statusCode').should('eq', 200);
    });
})