//Server
export const API_SERVER = Cypress.env('api_server') || 'https://dev.socious.io/api/v2';
export const APP_URL = Cypress.env('app_url') || 'http://localhost:3000';

//Credentials
export const VALID_EMAIL = 'valid_email@gmail.com';
export const VALID_PASSWORD = 'v@lidP@$$wd';

export const INVALID_EMAIL = 'wrong_email@gmail.com';
export const INVALID_PASSWORD = 'wrong_password';

export const FIRSTNAME = 'Umaya';
export const LASTNAME = 'Nigina';
export const USERNAME = 'umayanigina';

//Authentication
export const ACCESS_TOKEN = 'VALID_ACCESS_TOKEN';
export const REFRESH_TOKEN = 'VALID_REFRESH_TOKEN';
export const TOKEN_TYPE = 'VALID_TOKEN_TYPE';

//Sign-up
export const EXISTING_EMAIL_ADDRESS = 'existingEmail@test.com';
export const PASSWORD = '$3cur3P@ssw0rd12345';
export const CITY = 'Tokyo';
export const CITY_OPTION_VALUE = 'Tokyo, Japan';
export const ORGANIZATION_NAME = 'My Organization';
export const ORGANIZATION_EMAIL = 'myorganization@test.com';
export const ORGANIZATION_USERNAME = 'my_organization';
