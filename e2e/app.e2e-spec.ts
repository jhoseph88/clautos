import { ClautosPage } from './app.po';

describe('clautos App', () => {
  let page: ClautosPage;

  beforeEach(() => {
    page = new ClautosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
