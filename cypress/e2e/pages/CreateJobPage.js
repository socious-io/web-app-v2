class CreateJobPage {
  elements = {
    switchAccount: () => cy.get('._avatar_anzop_65'),
    logoutBtn: () => cy.contains('Log out'),
    OrgAccount: () => cy.get('._name_xy33b_15').contains('IO company'),
    createdLink: () =>
      cy.get(':nth-child(3) > ._container_c9ywk_1 > :nth-child(2) > ._menuItem_459xl_7 > ._container_1ww5x_1'),

    createJobLink: () => cy.get('._button_16z98_1._createJobBtn_xdc50_21'),
    socialCauseLbl: () => cy.contains('Select up to 1 social cause'),
    socialCauseSearchTxt: () =>
      cy.get(
        '[style="transition: all 180ms ease 0ms; opacity: 1; visibility: visible;"] > ._content_t5srj_16 > ._container_16m87_1 > ._search_osujm_18 > ._container_6spvv_1 > ._input_6spvv_11'
      ),
    searchedSocialcause: () => cy.contains('Poverty'),
    continueBtn: () =>
      cy.get(
        '[style="transition: all 180ms ease 0ms; opacity: 1; visibility: visible;"] > ._content_t5srj_16 > ._container_16m87_1 > ._bottom_16m87_19 > ._button_16z98_1'
      ),
    skillLbl: () => cy.contains('Select up to 10 relevant skills'),
    skillSearchTxt: () =>
      cy.get(
        '[style="transition: all 180ms ease 0ms; opacity: 1; visibility: visible;"] > ._content_t5srj_16 > ._container_16m87_1 > ._search_osujm_18 > ._container_6spvv_1 > ._input_6spvv_11'
      ),
    searchedSkills: () => cy.contains('ccountin'),
    titletxt: () => cy.get('input[id="Job title"]'),
    desctxt: () => cy.get('textarea[id="Job description"]'),
    jobcategory: () => cy.get(':nth-child(2) > ._inputContainer_1p1vn_1 > ._input_1p1vn_1'),
    selectedJobcategory: () => cy.contains('Backend development'),
    countryTxt: () => cy.get(':nth-child(4) > ._inputContainer_1p1vn_1 > ._input_1p1vn_1'),
    cityTxt: () => cy.get(':nth-child(5) > ._inputContainer_1p1vn_1 > ._input_1p1vn_1'),
    selectedCountry: () => cy.get(':nth-child(4) > ._options_1p1vn_32 > ._option_1p1vn_32'),
    selectedCity: () => cy.get(':nth-child(5) > ._options_1p1vn_32 > :nth-child(1)'),
    remoteTxt: () => cy.get(':nth-child(6) > ._inputContainer_1p1vn_1 > ._input_1p1vn_1'),
    selectedRemote: () => cy.get(':nth-child(6) > ._options_1p1vn_32 > ._option_1p1vn_32'),
    JobTypeText: () => cy.get(':nth-child(7) > ._inputContainer_1p1vn_1 > ._input_1p1vn_1'),
    selectedJobTyp: () => cy.get(':nth-child(7) > ._options_1p1vn_32 > ._option_1p1vn_32'),
    JobLengthText: () => cy.get(':nth-child(8) > ._inputContainer_1p1vn_1 > ._input_1p1vn_1'),
    selectedJobLength: () => cy.get(':nth-child(8) > ._options_1p1vn_32 > ._option_1p1vn_32'),
    PaidPaymentTyp: () => cy.get(':nth-child(1) > :nth-child(3) > ._container_81b5x_1 > label'),
    VolunteerPaymentTyp: () => cy.get(':nth-child(1) > :nth-child(2) > ._container_81b5x_1 > label'),
    paymentSchemeFixed: () => cy.get(':nth-child(2) > :nth-child(3) > ._container_81b5x_1 > label'),
    paymentSchemeHourly: () => cy.get(':nth-child(2) > :nth-child(2) > ._container_81b5x_1 > label'),
    ExperienceLvlTxt: () => cy.get(':nth-child(1) > ._inputContainer_1p1vn_1 > ._input_1p1vn_1'),
    selectedExperienceLvl: () => cy.get(':nth-child(3) > .mt-6 .block'),
    minCommitment: () => cy.get(':nth-child(1) > ._outline_1n8jd_12 > ._textbox_1n8jd_6'),
    maxCommitment: () => cy.get('._inputs_kgpc9_36 > :nth-child(2) > ._outline_1n8jd_12 > ._textbox_1n8jd_6'),
    screenerQuestionsLbl: () => cy.get('.font-worksans'),
    addQuestionBtn: () => cy.get('._addQuestions_hrony_21'),
    cancelQuestionBtn: () => cy.get('._bottom_16m87_19 > :nth-child(2)'),
    skipBtnInScreenerStep: () => cy.get('button[type="submit"]').contains('skip'),
    BackToJobBtn: () =>
      cy.get(
        '[style="transition: all 180ms ease 0ms; opacity: 1; visibility: visible;"] > ._content_t5srj_16 > ._btns_p8zh0_45 > ._button_16z98_1'
      ),
  };

  clickOnswitchAccountLink() {
    this.elements.switchAccount().click();
  }
  logout() {
    this.elements.logoutBtn().click();
    cy.wait(4000);
  }
  selectOrgAccount() {
    this.elements.OrgAccount().click();
  }
  clickOnCreatedLink() {
    this.elements.createdLink().click();
  }
  clickOncreateJobLink() {
    this.elements.createJobLink().click();
  }
  assertShowingSocialCauseStep() {
    this.elements.socialCauseLbl().should('be.visible');
    this.elements.continueBtn().should('be.disabled');
  }
  selectSocialCause() {
    this.elements.socialCauseSearchTxt().type('poverty');
    this.elements.searchedSocialcause().click();
  }
  assertShowingSkillStep() {
    this.elements.skillLbl().should('be.visible');
    this.elements.continueBtn().should('be.disabled');
  }
  selectSkills() {
    cy.wait(1000);
    this.elements.skillSearchTxt().type('acco');
    cy.wait(500);
    this.elements.searchedSkills().click();
  }
  setTitle(title) {
    this.elements.titletxt().clear().type(title);
    return this;
  }
  setDesc(desc) {
    this.elements.desctxt().clear().type(desc);
    return this;
  }
  selectJobCategory(JobCategory) {
    this.elements.jobcategory().click(), this.elements.jobcategory().type(JobCategory);
    this.elements.selectedJobcategory().click();
  }
  selectCountry() {
    this.elements.countryTxt().type('iran');
    this.elements.selectedCountry().click();
  }
  selectCity() {
    this.elements.cityTxt().type('abadan');
    this.elements.selectedCity().click();
  }
  selectRemotePreference(RemotePreferenceText) {
    this.elements.remoteTxt().type(RemotePreferenceText);
    this.elements.selectedRemote().click();
  }
  selectJobTyp(JobTypeText) {
    this.elements.JobTypeText().type(JobTypeText);
    this.elements.selectedJobTyp().click();
  }
  selectJobLength(JobLengthText) {
    this.elements.JobLengthText().type(JobLengthText);
    this.elements.selectedJobLength().click();
  }
  selectPaymentType(paymenttype) {
    if (paymenttype == 'paid') {
      this.elements.PaidPaymentTyp().click();
    } else if (paymenttype == 'volunteer') {
      this.elements.VolunteerPaymentTyp().click();
    }
  }

  selectPaymentScheme(paymentScheme) {
    if (paymentScheme == 'fixed') {
      this.elements.paymentSchemeFixed().click();
    } else if (paymentScheme == 'hourly') {
      this.elements.paymentSchemeHourly().click();
    }
  }

  selectExperienceLevel(ExperienceLevelText) {
    this.elements.ExperienceLvlTxt().type(ExperienceLevelText);
    this.elements.selectedExperienceLvl().click();
  }
  selectMinCommitment(min) {
    this.elements.minCommitment().type(min);
  }
  selectMaxCommitment(max) {
    this.elements.maxCommitment().type(max);
  }
  clickOnContinueButton() {
    this.elements.continueBtn().click();
  }
  clickOnSkipBtnInScreenerStep() {
    this.elements.addQuestionBtn().click({ force: true });
    this.elements.cancelQuestionBtn().click({ force: true });
    this.elements.BackToJobBtn().click({ force: true });
  }
}

export default CreateJobPage;
