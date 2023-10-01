class ApplyPage {
  elements = {
    ApplyBtn: () => cy.get('._btnContainer_1y259_36 > ._button_16z98_1'),
    Messagetxt: () => cy.get('#Message'),
    UploadBtn: () => cy.get('._fileInput_1paew_34'),
    SubmitBtn: () => cy.get('._bottom_16m87_19 > ._button_16z98_1'),
  };

  assertShowingApplyButton() {
    this.elements.ApplyBtn().should('be.visible');
  }
  clickOnApplyBtn() {
    this.elements.ApplyBtn().click();
  }
  setMessage(message) {
    this.elements.Messagetxt().click(), this.elements.Messagetxt().type(message);
  }
  uploadResume(cv) {
    if (cv == 'attachCV') {
      this.elements.UploadBtn().selectFile('cypress/fixtures/simplefile.pdf', { force: true });
    } else if (cv == 'null') {
    }
  }
  selectContactInfo() {
    this.elements.ContactInfo().check();
  }
  clickOnSubmitBtn() {
    this.elements.SubmitBtn().click();
  }
  assertApplyBtnIsDisabled() {
    this.elements.ApplyBtn().should('be.disabled');
  }
}

export default ApplyPage;
