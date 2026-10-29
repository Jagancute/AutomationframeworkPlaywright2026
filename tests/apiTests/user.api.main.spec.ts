import {test,expect} from '../../src/fixtures/apiFixtures.js'

const TOKEN=process.env.API_TOKEN;
let userID:number;
let AUTH_TOKEN={Authorization:`Bearer ${TOKEN}`};

test.describe.serial ("End to End user API testcases",()=>

{


test("Fetch the All Users from API", async ({apiHelper})=>
{
    let response= await apiHelper.getRequest("/public/v2/users",AUTH_TOKEN)
    console.log(response.responseBody);

    // expect(response.statusCode).toBe(200);
    //expect(response.responseBody).toBeGreaterThan(5);
})
// test("Fetch the user from API",async({apiHelper})=>
// {
//  let response=await apiHelper.getRequest("/public/v2/users",AUTH_TOKEN)
// })

test("Create a new user from API",async({apiHelper})=>
{
 let userData=
 {
    "name": "Testing round11", 
    "email": `rodney${Date.now()}@gmail.com`, 
    "gender": "male", 
    "status": "active"     
 }
  let response=await apiHelper.postRequest("/public/v2/users",userData,AUTH_TOKEN);
console.log(response.responseBody);
expect(response.statusCode).toBe(201);
expect(response.responseBody.name).toBe(userData.name)
 userID=(response.responseBody.id);
 console.log(userID);
})

test("Update the Created user from API",async({apiHelper})=>
{
 let userData=
 {
    "name": "Testing round112565", 
    "email": `rodney${Date.now()}@gmail.com`, 
    "gender": "male", 
    "status": "active"     
 }
  let response=await apiHelper.updateRequest(`/public/v2/users/${userID}`,userData,AUTH_TOKEN);
console.log(response.responseBody);
console.log(userID);
// expect(response.statusCode).toBe(200);  
// expect(response.responseBody.name).toBe(userData.name);
// expect(response.responseBody.status).toBe(userData.status);
})

test("Delete the Created user from API",async({apiHelper})=>
{
 let response=await apiHelper.deleteRequest(`/public/v2/users/${userID}`,AUTH_TOKEN);
 //expect(response.statusCode).toBe(204);
 //expect(response.StatusText).toBe("No Content");
// expect(response.responseBody.name).toBe(userData.name);
// expect(response.responseBody.status).toBe(userData.status);
})
});