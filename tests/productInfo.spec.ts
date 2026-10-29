import { HomePage } from 'src/pages/HomePage.js';
import {test,expect} from '../src/fixtures/pageFixtures.js'
import { SearchResultsPage } from 'src/pages/SearchResultsPage.js';
import { ProductInfoPage } from 'src/pages/ProductInfoPage.js';


test.beforeEach(async ({loginPage}) =>
{
 await loginPage.goToLoginPage();
 await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!);
})

test("Verify Product Images Count Test", async({homePage,searchResultsPage, productInfoPage})=>
{
    await homePage.doSearch("macBook");
    await searchResultsPage.selectAndClickOnProduct("MacBook Air");
    let imagesCount= await productInfoPage.getProductImagesCount();
    expect(imagesCount).toBeGreaterThan(1);
})

test("Verify Product Information Test", async({homePage,searchResultsPage, productInfoPage})=>
{
    await homePage.doSearch("macBook");
    await searchResultsPage.selectAndClickOnProduct("MacBook Pro");
    let completeInfo= await productInfoPage.getProductCompleteInfo();
    console.log(completeInfo);
    expect.soft(completeInfo.get("Brand")).toBe("Apple");
    expect.soft(completeInfo.get("Product Code")).toBe("Product 18");
    expect.soft(completeInfo.get("Reward Points")).toBe("800");
    expect.soft(completeInfo.get("Availability")).toBe("In Stock");
    expect.soft(completeInfo.get("Product Price")).toBe("$2,000.00");
   
})

test("Verify Common logo Test", async({productInfoPage})=>
{
   let isLogoVisible= await productInfoPage.isLogoVisible();
   expect(isLogoVisible).toBe(true);   
})

test("Verify Common Footer Count Test", async({productInfoPage})=>
{
   let footerCount= await productInfoPage.getPageFootersCount();
   expect(footerCount).toBe(15);   
})