
import {test,expect} from '../src/fixtures/pageFixtures.js';
import {CsvHelper} from '../src/utils/csvUtils.js';
import {ExcelHelper} from '../src/utils/excelUtils.js';
import {JsonHelper} from '../src/utils/jsonUtils.js';

test.beforeEach(async ({loginPage})=>
{
    await loginPage.goToLoginPage();
}
)
test("Login Page Title Test", async({loginPage})=>
{
   
    let title=await loginPage.getLoginPageTitle();
    expect(title).toBe("Account Login");

})  
test("Forgot Password Link Exist Test", async({loginPage})=>
{
    let isForgotPwdLinkAv= await loginPage.isForgotPwdLinkAvailable();
    expect(isForgotPwdLinkAv).toBe(true);
}) 

test("User doing the Actual Login Test", async({loginPage,homePage})=>
{
  await loginPage.doLogin(process.env.USER_NAME!,process.env.PASSWORD!);
//assertion
 let flag:boolean=await homePage.isLogoutLinkAvailable();
 expect(flag).toBeTruthy();
})

//Reading multiple data from the CSV File for Negative scenario.
let testData:Record<string, string>[]=CsvHelper.readCsv("src/testData/loginData.csv");
for (let data of testData)
{
test(`Negative Login Test with username : ${data.username} and ${data.password}`, async({loginPage})=>
{
 await loginPage.doLogin(data.username,data.password);
 let errorMessage = await loginPage.getPageErrorMessage(); 
 expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.");
}) 
}

//Reading multiple data from the Excel File for Negative scenario.
let testData2=ExcelHelper.readExcel("src/testData/LoginData.xlsx");
for (let data of testData2)
{
test(`Negative Login Test with username from excel sheet : ${data.username} and ${data.password}`, async({loginPage})=>
{
 await loginPage.doLogin(data.username,data.password);
 let errorMessage = await loginPage.getPageErrorMessage(); 
 expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.");
}) 

}


//Reading multiple data from the JSON File for Negative scenario.
let testData3=JsonHelper.readJson("src/testData/jsonData.json");
for (let data of testData3)
{
test(`Negative Login Test with username from JSON file : ${data.username} and ${data.password}`, async({loginPage})=>
{
 await loginPage.doLogin(data.username,data.password);
 let errorMessage = await loginPage.getPageErrorMessage(); 
 expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.");
}) 

}
