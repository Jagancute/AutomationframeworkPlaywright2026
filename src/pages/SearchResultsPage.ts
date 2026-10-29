import {Locator, Page} from '@playwright/test';
import { BasePage } from './BasePage.js';
export class SearchResultsPage extends BasePage
{
   private readonly resultsHeader:Locator;
   private readonly searchResults:Locator

    constructor (page:Page)
    {
        super(page);
        this.resultsHeader=page.locator("h1");
        this.searchResults=page.locator("div.product-thumb");
    }

    async getSearchResultsPageHeader():Promise<string>
    {
       return await this.resultsHeader.innerText();
    }

    async getSearchResultsCount():Promise<number>
    {
        return await this.searchResults.count();
    }
    async selectAndClickOnProduct(productName:string):Promise<void>
    {
        const productLocator:Locator=this.searchResults.getByText(productName, {exact:true});
        console.log(`Clicking on the product with Name: ${productName}`);
        await productLocator.click();
    }
}       