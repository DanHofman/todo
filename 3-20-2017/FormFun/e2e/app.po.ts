import { browser, element, by } from 'protractor';

export class FormFunPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ff-root h1')).getText();
  }
}
