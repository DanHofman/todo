import { FormFunPage } from './app.po';

describe('form-fun App', () => {
  let page: FormFunPage;

  beforeEach(() => {
    page = new FormFunPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ff works!');
  });
});
