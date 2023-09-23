class CreateOrganizationPage {
  elements = {
    switchAccount: () => cy.get('._avatar_anzop_65'),
    addOrgLink: () => cy.get('._accountList__btn_16na8_19'),
    continueBtn: () => cy.get('._button_16z98_1.undefined'),
    orgTyp: () => cy.get('._container_164mg_1 > div:nth-of-type(2)'),
    orgTyp2: () => cy.get('._container_164mg_1 > div:nth-of-type(3)'),
    socialCauseLbl: () => cy.contains('Select up to 5 social causes.'),
    searchedSocialcause: () => cy.contains('Poverty'),
    socialCauseSearchTxt: () => cy.get('._container_6spvv_1 > ._input_6spvv_11'),
    orgname: () => cy.get('._main_1fsyp_59 ._space_9qonp_16:nth-of-type(1) ._outline_1n8jd_12 [role]'),
    orgbio: () => cy.get('textarea#Bio'),
    orgemail: () =>
      cy.get(
        '._main_1fsyp_59 ._space_9qonp_16:nth-of-type(2) ._formContainer_1fsyp_81 > .undefined:nth-of-type(1) [role]'
      ),
    orgAddress: () => cy.get('input#Address'),
    orgWebsite: () => cy.get('input#Website'),
    countryTxt: () => cy.get('div:nth-of-type(2) > ._inputContainer_1p1vn_1 > ._input_1p1vn_1'),
    cityTxt: () => cy.get('div:nth-of-type(3) > ._inputContainer_1p1vn_1 > ._input_1p1vn_1'),
    selectedCountry: () => cy.get('._option_1p1vn_32'),
    selectedCity: () => cy.get(':nth-child(3) > ._options_1p1vn_32 > :nth-child(1)'),
    agreement: () => cy.get('input#agreement'),
    skipBtn: () => cy.contains('Skip'),
    OrgCultureLabel: () => cy.contains("Tell us about your organization's culture."),
    orgCulture: () => cy.get("textarea[role='textbox']"),
    orgCreatedLbl: () => cy.contains('Organization created'),
    getVerified: () => cy.contains('Get verified'),
  };

  gotoCreateOrg() {
    this.elements.switchAccount().click();
    this.elements.addOrgLink().click();
  }

  clickOnContinueBtn() {
    this.elements.continueBtn().click();
  }

  selectOrgTyp() {
    this.elements.orgTyp().click();
    this.elements.orgTyp2().click();
  }

  assertShowingSocialCauseStep() {
    this.elements.socialCauseLbl().should('be.visible');
    this.elements.continueBtn().should('be.disabled');
  }
  selectSocialCause() {
    this.elements.socialCauseSearchTxt().type('poverty');
    this.elements.searchedSocialcause().click({ force: true });
  }
  setOrganizationName(organizationName) {
    this.elements.orgname().click({ force: true }).type(organizationName);
    return this;
  }
  setOrganizationBio(organizationBio) {
    this.elements.orgbio().click({ force: true }).type(organizationBio);
    return this;
  }
  setOrganizationEmail(organizationEmail) {
    this.elements.orgemail().click({ force: true }).type(organizationEmail);
    return this;
  }
  selectCountry() {
    this.elements.countryTxt().type('iran');
    this.elements.selectedCountry().click();
  }
  selectCity() {
    this.elements.cityTxt().type('abadan');
    this.elements.selectedCity().click();
  }
  checkAgreement() {
    this.elements.agreement().check();
  }
  clickOnSkip() {
    this.elements.skipBtn().click();
  }
  assertShowingOrgCultureLabel() {
    this.elements.OrgCultureLabel().should('be.visible');
    this.elements.OrgCultureLabel().click();
  }
  assertDisabledButton() {
    this.elements.continueBtn().should('be.disabled');
  }
  setOrganizationCulture(organizationCulture) {
    this.elements.orgCulture().click({ force: true }).type(organizationCulture);
  }
  removeOrganizationCulture() {
    this.elements.orgCulture().click({ force: true }).type('');
  }
  assertShowingOrgCreatedLabel() {
    this.elements.orgCreatedLbl().should('be.visible');
    this.elements.orgCreatedLbl().click();
  }
  assertShowingGetVerifiedLabel() {
    this.elements.getVerified().first().should('be.visible');
  }
}

export default CreateOrganizationPage;
