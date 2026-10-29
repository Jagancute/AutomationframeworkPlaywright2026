import {test,expect} from'@playwright/test';
import { request } from 'node:http';
let AUTH_TOKEN={'Authorization':'Bearer a810a98829aae4f91bb5d434ee0d283d9d6baf156aefa8d97b7eb39c54a42f50'};

test("Fetch a specific user data API(GET)", async({request})=>
{
   let response=await request.get("https://gorest.co.in/public/v2/users/8687947",{headers:AUTH_TOKEN});
//    console.log(response);
   let responseBody=await response.json();
   console.log(responseBody);
   console.log("Response code is :" + response.status());
   console.log("Response Messages is: "+response.statusText());
})

test("Fetch a data for multiple API data(GET)", async({request})=>
{

   let response=await request.get("https://gorest.co.in/public/v2/users/",{headers:AUTH_TOKEN});
   console.log(response);
   let responseBody=await response.json();
   console.log(responseBody);
   console.log("Response code is :" + response.status());
   console.log("Response Messages is: "+response.statusText());
})

test("Creating a fresh login user API(POST)", async({request})=>
{
   let userData=
   { 
    "name": "Testing round", 
    "email": `jagadesh${Date.now()}@gmail.com`, 
    "gender": "male", 
    "status": "active" 
   }
   let response=await request.post("https://gorest.co.in/public/v2/users/",{headers:AUTH_TOKEN,data:userData});
   console.log(response);
   let responseBody=await response.json();
   console.log(responseBody);
   console.log("Response code is :" + response.status());
   console.log("Response Messages is: "+response.statusText());
})


test("Update created  login user(PUT)", async({request})=>
{
   let userData=
   { 
    "name": "Testing round API", 
    "email": `jagadesh${Date.now()}@gmail.com`, 
    "gender": "male", 
    "status": "Inactive" 
   }
   let response=await request.put("https://gorest.co.in/public/v2/users/8689093",{headers:AUTH_TOKEN,data:userData});
   console.log(response);
   let responseBody=await response.json();
   console.log(responseBody);
   console.log("Response code is :" + response.status());
   console.log("Response Messages is: "+response.statusText());
})

test("Deleting the created user(DELETE)", async({request})=>
{
   let response=await request.delete("https://gorest.co.in/public/v2/users/8689093",{headers:AUTH_TOKEN});
   console.log(response);

   console.log("Response code is :" + response.status());
   console.log("Response Messages is: "+response.statusText());
})
