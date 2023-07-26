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
<!-- ##### 5.![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
 -->
##### 5. <img src="https://blog.openreplay.com/images/why-should-you-use-material-ui/images/hero.png" width="100px" height="40px" >

##### 6.![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) 
##### 7. ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)


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
##### 2. The user must create, view, update or delete there Expenses.  
##### 3. The user must view or update his profile. 
##### 4. The user must logout from the system. 
<br>

### Functions
##### In the controller file, a list of functions where executed, which are:
##### 1. Signup, Signin and signout.
##### 2. Create, update, and delete Expenses.
##### 3. Create, update, and delete Category.
##### 4. Upload the reciept.
##### 4. View and edit user profile

##### Some of functions where needed to apply a problem-solving strategy like: 

##### 1. Applying icons using fontawsome package

```sh
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faSearch} />
```

##### 2. Using Proxy to change path of axios to Backend

```sh
"proxy": "http://localhost:4006/>
```

##### 3. Search function using 'Filter'
```sh
const [inputValue, setInputValue] = useState('');

function handleSearch() {
        if (inputValue.length > 0) {
            const filtered_posts = posts.filter((p) => {
            return p.jobTitle.match(inputValue);
        });
        setPosts(filtered_posts)
        console.log(filtered_posts);
        }
        //props.onSearch(inputValue);
      }
```



##### 4. uplaod file function using multer:
```sh
const multer  = require('multer')
//let upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

upload = multer({ storage: storage })
```


### Screenshots
![Wireframe](/front-end/src/screenshots.png)
<br>
## Futurework and Unsolved problems
<hr>

##### 1. add emojis to the catogeries.  
##### 2. view notification on functionalities..
##### 3. link user bank accounts.

## Resources
#### 1.[Wireframes](https://www.figma.com/file/vekeQ0qIF6KzdnIoElHbcn/Untitled?type=design&node-id=0%3A1&mode=design&t=Ewbkq1Aypp5a1A0j-1)

#### 2.[User Stories](https://trello.com/invite/b/6cQKfD36/ATTI9b9fcdfdf1c02fb3ee2adda601714b55B7A02468/expenss-management)

#### 3.[ERD](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1#G1e34bfKHxG2csdqVHrLjxx3Ao8ZG8NyQH)

#### 4.[Deployed Application]()


