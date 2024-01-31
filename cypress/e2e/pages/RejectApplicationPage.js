class RejectApplicationPage {
  elements = {
    switchAccount: () => cy.get('._avatar_anzop_65'),
    OrgAccount: () => cy.get('._name_xy33b_15').contains('IO company'),
    createdLink: () =>
    cy.get(':nth-child(3) > ._container_c9ywk_1 > :nth-child(2) > ._menuItem_459xl_7 > ._container_1ww5x_1'),
    ongoingLink: () => cy.get("[for='on-going']"),
    firstJobLink: () => cy.get(':nth-child(1) > ._container_1oado_1 > ._title_1oado_14'),
    applicantsTab: () => cy.get('._tabs_1lz0w_31 > :nth-child(2)'),
    toReviewTab: () => cy.get('div:nth-of-type(1) > ._tab_1rj3k_7 > ._tabLabel_1rj3k_16.false'),
    openApplication: () => cy.get('div:nth-of-type(1) > ._container_1jt0l_1 > ._container_30tv4_1._etc_30tv4_10'),
    openCoverLetter: () => cy.get('div:nth-of-type(1) > ._tab_1rj3k_7 > ._tabLabel_1rj3k_16.false'),
    rejectBtn: () => cy.get('._btnContainer_wo3rq_27 > button:nth-of-type(2)'),
  };

  clickOnswitchAccountLink() {
    this.elements.switchAccount().click();
  }
  selectOrgAccount() {
    this.elements.OrgAccount().click();
  }
  clickOnCreatedLink() {
    this.elements.createdLink().click();
  }
  clickOnOngoingLink() {
    this.elements.ongoingLink().click();
  }
  clickOnFirstJob(){
    this.elements.firstJobLink().click();
  }
  clickOnapplicantsTab() {
    this.elements.applicantsTab().click();
  }
  clickOntoReviewTab() {
    this.elements.toReviewTab().click();
  }
  clickOnopenApplication() {
    this.elements.openApplication().click();
  }
  clickOnrejectBtn() {
    this.elements.rejectBtn().click();
  }
}

export default RejectApplicationPage;
