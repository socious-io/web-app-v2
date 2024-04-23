import { API_SERVER, APP_URL, FIRSTNAME, LASTNAME, USERNAME } from '../authentication/constants';
import { PROJECT, SENT_APPLICATION, UPLOAD } from '../authentication/mocks';
import { User, generateRandomEmail } from '../authentication/utilities';

const SIGNINGUP_EMAIL = generateRandomEmail();
const user = new User(FIRSTNAME, LASTNAME, SIGNINGUP_EMAIL, USERNAME);

describe('User Application', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_SERVER}/identities*`, req => {
      req.reply(user.getIdentity());
    });
    cy.intercept('GET', `${API_SERVER}/projects/*`, req => req.reply(200, PROJECT)).as('getProject');
    cy.intercept('GET', `${API_SERVER}/skills*`, req => req.reply(200, { message: 'success' })).as('getSkills');
    cy.intercept('GET', `${API_SERVER}/notifications*`, req => req.reply(200, { message: 'success' })).as(
      'getNotifications',
    );
    cy.intercept('GET', `${API_SERVER}/chats/unreads/counts*`, req => req.reply(200, { message: 'success' })).as(
      'getUnreadChatsCount',
    );
    cy.intercept('POST', `${API_SERVER}/projects/*/applicants`, req => req.reply(200, SENT_APPLICATION)).as(
      'sendApplication',
    );
    cy.intercept('POST', `${API_SERVER}/media/upload`, req => req.reply(200, UPLOAD));
  });
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  it('it should open job detail page and apply fill out the apply form', () => {
    // Visit jobs page
    cy.visit(`${APP_URL}/jobs`);

    // Go to the job details
    cy.contains('a', 'Read more').click();
    cy.url().should('include', '/jobs/');

    // wait for router to switch page
    cy.contains('button', 'Apply now').should('not.be.disabled');
    cy.contains('button', 'Apply now').click({ force: true });
    cy.get('#apply-job').should('exist');

    // Filling the application form
    cy.get('textarea[name=coverLetter]').type('Example Cover Letter');
    cy.fixture('example.pdf').then(fileContent => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'example.pdf',
        mimeType: 'application/pdf',
      });
    });
    cy.contains('button', 'Submit').click();
  });
});
