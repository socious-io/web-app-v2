class CreatePostPage {
  elements = {
    Feed_Link: () => cy.get('_navLabel_anzop_49'),
    CreatePost_link: () => cy.contains('Create a post'),
    SocialCause_SearchTxt: () => cy.get('._title_a7g9j_23 > input'),
    SearchedSocialcause: () => cy.contains('Poverty'),
    ContextTxt: () => cy.get('._textbox_1pzom_17'),
    WrittenText: () => cy.contains('I am writing here for testing the create post'),
    UploadBtn: () => cy.get('input[type=file]'),
    SelectedSocialCause: () => cy.contains('Poverty', { exact: true }),
    NextBtn: () => cy.get('button[type="button"]').contains('Next'),
    PostBtn: () => cy.get('button[type="button"]').contains('Post'),
  };

  gotoFeed() {
    this.elements.Feed_Link().click();
  }

  clickOnCreatePostLink() {
    this.elements.CreatePost_link().click();
  }

  selectSocialCause() {
    this.elements.SocialCause_SearchTxt().click(),
      this.elements.SocialCause_SearchTxt().type('poverty'),
      this.elements.SearchedSocialcause().click();
  }

  setContext(PostText) {
    this.elements.ContextTxt().click(), this.elements.ContextTxt().type(PostText);
  }

  setContextImg(PostImg) {
    if (PostImg == 'postImg') {
      this.elements.UploadBtn().click(),
        this.elements.UploadBtn().selectFile('cypress/fixtures/NewPost.png', { force: true });
    } else if (PostImg == 'no') {
    }
  }

  clickOnNextButton() {
    this.elements.NextBtn().click();
  }

  clickOnSelectedSocialCause() {
    this.elements.SelectedSocialCause().click();
  }

  clickOnPostButton() {
    this.elements.PostBtn().click();
  }
}

export default CreatePostPage;
