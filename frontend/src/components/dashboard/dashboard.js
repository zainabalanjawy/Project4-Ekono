//link used for creating the dashboard: https://blog.logrocket.com/use-google-charts-react/
import { ClassNames } from '@emotion/react';
import React, { useState, useEffect } from 'react'
// core components
import HomeNavbar from "components/Navbars/HomeNavbar";
import Footer from "components/Footer/Footer.js";
import '../../App.css'
import '../../PageContainer.css'
import { Chart } from 'react-google-charts'
import axios from 'axios';
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
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

export default function Dashboard() {
  const [user, setUser] = useState([]);   //state that stores current user informtion
  const [data, setData] = useState([]);   //state that stores all user categories for the categories chart
  const [expenses, setExpenses] = useState([]); //state that stores all user categories for the expenditures per category chart
  const [receipt, setReceipt] = useState([]); //state that stores all user receipt and the amount sepnt on each
  const [total, setTotal] = useState(0) //state to keep track of user's total expenditures
  const [amount, setAmount] = useState([]); //state that stores all user categories for the expenditures per category chart
  const [message, setMessage] = useState(''); //state that stores a message based on the budget and expenditures

  useEffect(() => {
    handleUser()
    dataToDisplay()
    expensesToDisplay()
    receipstToDisplay()
    cat_amount()
    userMessage()
  }, [total]
  ) //passing the total in the dependency array so the useEffect run everytime the total has changed

  //change the user message based on whether or not they exeed the budget
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
  //get the uesr
  async function handleUser() {
    const token = localStorage.getItem('token')
    console.log('handleUse token: ', token)
    const response = await axios.get(`http://127.0.0.1:8000/auth/profile/`, {
      headers:
      {
        'Authorization': `Token ${token}`
      }
    })
    // console.log("profile response.data: ", response.data[0])
    setUser(response.data[0])
    console.log('User Info:', user)
  }
  //displays uncategorized cateogries multiple times. it shouldn't.
  const dataToDisplay = () => {
    const arrayData = [["Category", "Occurence"]]
    const token = localStorage.getItem("token")
    axios.get(`http://127.0.0.1:8000/api/category/list/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        response.data.forEach((value, index) => {
          arrayData.push([value.Category_name, 1])
        })
        // for (const obj in response.data){
        // }
        console.log("arrayData", arrayData);
        setData(arrayData)
      })
      .catch(error => { console.log(error) })
  }
  //display amounts spent on each item
  const expensesToDisplay = () => {
    const arrayData = [["Category", "Expending Amount"]]
    const token = localStorage.getItem("token")
    axios.get(`http://127.0.0.1:8000/api/Expenses/List/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    }).then(response => {
      let total = 0
      console.log('response coming from expenses list: ', response.data)
      response.data.forEach((value, index) => {
        arrayData.push([value.Items, value.Amount])
        total += value.Amount
      })
      console.log('array of data to be used in the chart:', arrayData);
      setExpenses(arrayData)
      setTotal(total)

    }).catch(error => { console.log(error) })
  }
  //display the amounts spent on each place (per receipt)
  const receipstToDisplay = () => {
    const arrayData = [["Receipt", "Amount sepnt in BD"]]
    const token = localStorage.getItem("token")
    axios.get(`http://127.0.0.1:8000/api/Recipet/List/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    }).then(response => {
      console.log('response coming from RECEIPT list: ', response.data)
      response.data.forEach((value, index) => { arrayData.push([value.PlaceName, value.Amount]) })
      console.log('array of data to be used in the chart:', arrayData);
      setReceipt(arrayData)
    }).catch(error => { console.log(error) })
  }
  //display total amounts of each category
  async function cat_amount() {
    const arrayData = [["Category", "Occurence"]]
    const token = localStorage.getItem("token")
    axios.get(`http://127.0.0.1:8000/api/Expenses/List/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    }).then(response => {
      const exp = {}
      response.data.forEach((value, index) => {
        let key = value.Category.Category_name
        let price = value.Amount
        exp[key] = exp[key] ? exp[key] + price : exp[key] = price
      })
      for (const [key, value] of Object.entries(exp)) {
        arrayData.push([key, value])
      }
      console.log(arrayData);
      setAmount(arrayData)

    }).catch(error => { console.log(error) })
  }
  return (
    <>
      <HomeNavbar />
      <div className="wrapper">
        <div className="page-header PageContainer1">
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
                <h5 className="text-on-back">Dashboard</h5>
              </Col>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto" lg="12" md="6">
              <Card className="cardiv card-coin dashboard-div align-items-center">
                <h3>Your Budget: {user.budget} </h3>
                <h3>Your Total Expenditures: {total.toFixed(2)}</h3>
                <h4>{message}</h4>
              </Card>
              </Col>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto" lg="6" md="6">
                <Card className="card-coin card-plain ">
                  <CardBody>
                    <h3>My Categories</h3>
                    <Chart
                      chartType="PieChart"
                      data={data}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="6" md="6">
                <Card className="card-coin card-plain ">
                  <CardBody>
                    <h3>Spendings per category</h3>
                    <Chart
                      chartType="PieChart"
                      data={amount}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto" lg="6" md="6">
                <Card className="card-coin card-plain ">
                  <CardBody>
                    <h3>Spendings per item</h3>
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
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="6" md="6">
                <Card className="card-coin card-plain ">
                  <CardBody>
                    <h3>Spendings per receipt</h3>
                    <Chart
                      chartType="ScatterChart"
                      data={receipt}
                      options={{
                        hAxis: {
                          title: "Place Name",
                          minValue: 0,
                        },
                        vAxis: {
                          title: "Amount in BD",
                        }
                      }}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>

          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}
