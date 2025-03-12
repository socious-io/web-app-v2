//Server
export const API_SERVER = Cypress.env('api_server') || 'https://dev.socious.io/api/v2';
export const APP_URL = Cypress.env('app_url') || 'http://localhost:3000';

//Credentials
// export const VALID_EMAIL = 'valid_email@gmail.com';
export const VALID_EMAIL = 'imshantik@gmail.com';
// export const VALID_PASSWORD = 'v@lidP@$$wd';
export const VALID_PASSWORD = 'Sh@ntik2001';

export const INVALID_EMAIL = 'wrong_email@gmail.com';
export const INVALID_PASSWORD = 'wrong_password';

export const FIRSTNAME = 'Umaya';
export const LASTNAME = 'Nigina';
export const USERNAME = 'umayanigina';

//Authentication
export const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzNWY3MjRlLTU4MjQtNDEyOS04ZWQ2LTk2YzZkZGE4MWEzYSIsInJlZnJlc2giOmZhbHNlLCJpYXQiOjE3NDE3NjcwMDAsImV4cCI6MTc0MTkzOTgwMH0.5kIAein21r4DHdzrI6GWx1OZWX5ELGsAP2Vrp6wzyQ8';
// export const REFRESH_TOKEN = 'VALID_REFRESH_TOKEN';
export const REFRESH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzNWY3MjRlLTU4MjQtNDEyOS04ZWQ2LTk2YzZkZGE4MWEzYSIsInJlZnJlc2giOnRydWUsImlhdCI6MTc0MTU4MjMyNSwiZXhwIjoxNzQ0MTc0MzI1fQ.pjSqb3nfz3Jbm17AgXfQGRgqXYMXqwRyyNmG-4FEIEM';
// export const TOKEN_TYPE = 'VALID_TOKEN_TYPE';
export const TOKEN_TYPE = 'Bearer';

//Sign-up
export const EXISTING_EMAIL_ADDRESS = 'existingEmail@test.com';
export const PASSWORD = '$3cur3P@ssw0rd12345';
export const CITY = 'Tokyo';
export const ORGANIZATION_NAME = 'My Organization';
export const ORGANIZATION_EMAIL = 'myorganization@test.com';
export const ORGANIZATION_USERNAME = 'my_organization';
