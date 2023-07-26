import React, { useState,useEffect } from 'react';
import axios from 'axios';
import FooterHome from "components/Footer/FooterHome.js";
import { BrowserRouter as Router, Routes, Route, Link,useNavigate, Navigate } from 'react-router-dom'
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import PerfectScrollbar from "perfect-scrollbar";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel,
} from "reactstrap";
import Footer from 'components/Footer/Footer';
const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States",
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States",
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States",
  },
];
let ps = null;
  export default function CreateExpenses(){
    const [tabs, setTabs] = React.useState(1);
    React.useEffect(() => {
      if (navigator.platform.indexOf("Win") > -1) {
        document.documentElement.className += " perfect-scrollbar-on";
        document.documentElement.classList.remove("perfect-scrollbar-off");
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.body.classList.toggle("profile-page");
      // Specify how to clean up after this effect:
    }, []);
    const[Category,setCategory] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
      fetchCategory()
  }, [])
  const fetchCategory = async () => {
    const token = localStorage.getItem("token")
    console.log('tokkkken',token);
      const response = await axios.get(`http://127.0.0.1:8000/api/category/list/`,{
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      console.log("response___", response)
      setCategory(response.data)
  }
    const [Expenses,setExpenses] = useState({})
    const changeHandler = (e)=>{
      const expenses = {...Expenses}
      expenses[e.target.name] = e.target.value
      console.log('Expenses', expenses)
      setExpenses(expenses)
    }
    const createHandler = (event) => {
      event.preventDefault()
      const token = localStorage.getItem("token")
      console.log('tokkkken',token);
      axios.post('http://127.0.0.1:8000/api/Expenses/Create/', Expenses ,{
          headers: {
            'Authorization': `Token ${token}`
          }
        })
      .then(res => {
        window.location.pathname = 'Expenses/List'
        console.log('response: ', res)
      }).catch(err => {
        console.log(err)
      })
  }
  const category = Category.map((category, index) => {
    return(
      <>
        <option value={category.id}>{category.Category_name}</option>
      </>
    )
  })
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);
  return (
    <>
      <HomeNavbar />
      <div className="wrapper">
              <div className="page-header">
                <img
                  alt="..."
                  className="dots"
                  src={require("assets/img/dots.png")}
                />
                <img
                  alt="..."
                  className="path"
                  src={require("assets/img/path4.png")}
                />
                <Container className="align-items-center">
                  <Row>
                    <Col lg="6" md="6">
                      <h1 className="profile-title text-left">Create Expenses</h1>
                      <h5 className="text-on-back">Expenses</h5>
                    </Col>
                  </Row>
                  <Col md="6">
                  <Card className="card-plain">
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                          <label>Place Name: </label>
                          <Input type='text'name="PlaceName" id="PlaceName" placeholder="PlaceName" onChange={changeHandler}/>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                          <label>Items: </label>
                          <Input type='text' name="Items" id="Items" placeholder="Items" onChange={changeHandler}/>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                          <label>Categories : </label>
                          <div class= "selectcontainer">
                            <div class="selectExp">
                            <select name='Category' onChange={changeHandler}>
                            {category}
                            </select>
                            </div>
                          </div>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                          <label>Amount: </label>
                          <Input type="Number" name="Amount" id="Amount" placeholder="Amount" onChange={changeHandler}/>
                          </FormGroup>
                        </Col>
                        </Row>
                        <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                        onClick={createHandler}
                      >
                        Create
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip341148792"
                      >
                      </UncontrolledTooltip>
                        </Form>
                        </CardBody>
                  </Card>
                  </Col>
                  </Container>
                  </div>
                  </div>
                  <Footer/>
    </>
)
}


