import { TestapolloPage } from './app.po';

describe('testapollo App', () => {
  let page: TestapolloPage;

  beforeEach(() => {
    page = new TestapolloPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
