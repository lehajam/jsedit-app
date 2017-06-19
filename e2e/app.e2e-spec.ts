import { TataAppPage } from './app.po';

describe('tata-app App', () => {
  let page: TataAppPage;

  beforeEach(() => {
    page = new TataAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
