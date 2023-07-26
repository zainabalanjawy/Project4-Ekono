# Ekono
![Logo](/frontend/src/logo2.png)


## Table of contents
1. [Introduction](#Introduction)
    * [1.2 Purpose](#Purpose)
2. [Technologies](#Technologies)
3. [Design](#Design)
    * [3.1 Wireframe](#Wireframe)
    * [3.2 UserStories](#UserStories)
    * [3.3 ERD](#ERD)
4. [Planning](#Planning)
5. [Development](#Development)
    * [5.1 Definition](#Definition)
    * [5.2 Functions](#Functions)
    * [5.3 Screenshots](#Screenshots)
6. [Future work and Unsolved problems](#Futurework)
7. [Resources](#Resources)


## Introduction
<hr>

### Description
##### Ekono is an expenses tracker web app. It helps individuals maintain their expenses within a certain budget and not exceed it. Econo categorize expenditures made throughout the month under different categories made by the user and preview them in a dashboard of graphs and charts.

<br>

### Purpose
##### Build a full-stack application using Django,Python and React.
<br>

## Technologies
<hr>

##### 1. ![Django](https://img.shields.io/badge/django-%2320232a.svg?style=for-the-badge&logo=django&logoColor=%2361DAFB)

##### 2. ![Python](https://img.shields.io/badge/Python.js-000000?style=for-the-badge&logo=python&logoColor=white)

##### 2. ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

##### 4. ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
##### 5. <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--gaI7Ff9D--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/6lu26u1oaysf8cdfiiux.png" width="100px" height="40px" >

##### 6. <img src="https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/media/logo-colored@2x.png?raw=true" width="100px" height="40px" >

##### 7.![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) 
##### 8. ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)


## Design
<hr>

### Wireframe
##### A basic design for Expanses " Ekono" , containing the process of creating, updating and deleting Expanses. View and update user profile.

![Wireframe](/mediafiles/images/Figma.png)
<br>
<br>

### UserStories
##### A user story is a general explanation of functionalities written from the perspective of the user. It moves through differnt process till it reach to the testing and the deployment part. 

![userstories](/mediafiles/images/userstories.png)
<br>

### ERD
##### An Entity Relationship Digram shows main entities that used inside the portal, fields realted to each one of them and the relationship between these entities. 
<br>

![ERD](/mediafiles/images/Expenss.png)
<br>

### Planning
##### The planning part started with structure the components needed for the views and controllers file. Then,each of the functionalites where tested in Postman. Finally, it ended with the frontend part where a list of components where declared and applying http request on their parts. 
<br>

## Development
<hr>

### Definition
##### A graph of definitions where given to the user to declare the idea, which are basicly the main functions of the app. The developer has to logicly declare and apply them.
##### 1. The user signup then signin . 
##### 2. The user must create, view, update or delete Expenses.  
##### 3. The user must view or update his profile. 
##### 4. The user must create, view, update or delete Catgrories.
##### 5. The user able to scan a recipet and view its details.
##### 6. The user is able to view the budget status and multiple graphs in dashboard.
##### 7. The user must logout from the system.
<br>

### Functions
##### In the backend folder, a list of functions where executed, which are:
##### 1. Signup, Signin and signout.
##### 2. Create, update, and delete Expenses.
##### 3. Create, update, and delete Category.
##### 4. Upload the reciept.
##### 5. View and edit user profile
##### 6. View dashboard.

##### Some of functions where needed to apply a problem-solving strategy like: 

##### 1. Scanning receipt using 'Taggun' Api. 

```sh
let url = "https://api.taggun.io/api/receipt/v1/verbose/file";
    
try {
    const res = await axios.post(url, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'apikey': "7bdc551026fe11XXXXXXXXXXX"
                    }})
        
    }
```

##### 2. Linking backend with frontend

```sh
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ]
}
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = (
    'http://localhost:8000',
)

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]
AUTH_USER_MODEL = 'auth_app.User'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000"
]

```

##### 3. Using Chart component for data in dashboard
```sh
<Chart
chartType="ColumnChart"
data={expenses}
options={{
hAxis: {
    title: "Item",
    minValue: 0,
},
vAxis: {
    title: "Amount in BD",
}
}}
```
##### 4. Message based on whether exeed the budget.
```sh
function userMessage() {
    console.log(user.budget);
    console.log(Number(total));
    if (user.budget == Number(total)) {
      setMessage('You have spent exactly as per your budget!')
    }
    else if (user.budget > Number(total)) {
      setMessage('You are all good, keep it up!')
    }
    else {
      setMessage('You exceeded the limit, Be careful!')
    }
  }
```


### Screenshots
![Screenshots](/mediafiles/images/screenshot.png)
<br>
## Futurework and Unsolved problems
<hr>

##### 1. Add emojis to the catogeries.  
##### 2. View notification on functionalities.
##### 3. Link user bank accounts.

## Resources
#### 1.[Wireframes](https://www.figma.com/file/vekeQ0qIF6KzdnIoElHbcn/Untitled?type=design&node-id=0%3A1&mode=design&t=Ewbkq1Aypp5a1A0j-1)

#### 2.[User Stories](https://trello.com/invite/b/6cQKfD36/ATTI9b9fcdfdf1c02fb3ee2adda601714b55B7A02468/expenss-management)

#### 3.[ERD](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1#G1e34bfKHxG2csdqVHrLjxx3Ao8ZG8NyQH)

#### 4.[Deployed Application]()


