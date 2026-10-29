
import {test,expect} from '../src/fixtures/pageFixtures.js';


test.beforeEach(async ({loginPage}) =>
{
 await loginPage.goToLoginPage();
 await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!);
})

test("Verify Search Header Functionality Test", async({homePage,searchResultsPage})=>
{
    await homePage.doSearch("samsung");
    let searchHeader:string=await searchResultsPage.getSearchResultsPageHeader();
    expect(searchHeader).toContain("samsung");
})

test("Verify Search Functionality Count Test", async({homePage,searchResultsPage})=>
{
    await homePage.doSearch("samsung");
    let searchCount:number=await searchResultsPage.getSearchResultsCount();
    expect(searchCount).toBeGreaterThan(0);
})

test("Verify Click Product Functionality Test", async({homePage,searchResultsPage,page})=>
{
    await homePage.doSearch("MacBook");
    await searchResultsPage.selectAndClickOnProduct("MacBook Pro");
    expect(page).toHaveTitle("MacBook Air");
})