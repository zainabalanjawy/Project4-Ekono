import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import FooterHome from "components/Footer/FooterHome.js";
import classnames from "classnames";
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

// import { Container } from '@chakra-ui/react';
import {BrowserRouter as Router,Navigate, Route , Routes, Link ,useNavigate} from 'react-router-dom'
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

export default function ViewAll(props){

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
    const [recipet, setRecipet] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllRecipets()
    }, [])
  
    const deleteHandler = async (id) => {
      try {
        const token = localStorage.getItem("token")
        console.log('tokkkken',token);

        const response = await axios.delete(
          `http://127.0.0.1:8000/api/Recipet/${id}/delete/`,{
            headers: {
              'Authorization': `Token ${token}`
            } 
          }
        )
        console.log("deleted successfully!")
        window.location.pathname = '/ViewAllRecipet'
      } catch (error) {
        console.log("Something went wrong", error)
      }
    }
    const getAllRecipets = async () => {
      const token = localStorage.getItem("token")
      console.log('tokkkken',token);
        const response = await axios.get(`http://127.0.0.1:8000/api/Recipet/List/`,{
          headers: {
            'Authorization': `Token ${token}`
          } 
        })
        console.log(response)
        setRecipet(response.data)
    }
    React.useEffect(() => {
      document.body.classList.toggle("landing-page");
      // Specify how to clean up after this effect:
      return function cleanup() {
        document.body.classList.toggle("landing-page");
      };
    }, []);

    const allRecipets = recipet.map((rec, index) => {
        return (
          <div class="card-new" key={rec.id}>
          <div class="card-body">
            <h5 class="card-title">{rec.PlaceName}</h5>
            <p class="card-text">Amount: { rec.Amount } BD</p>
            <p class="card-text"><small class="text-muted">{rec.Categoty}</small></p>
            {/* <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => navigate('/ViewRecipet', {state: {rec}})}>Details
              </button> */}
              <Button type="button" color='danger' class="btn bg-gradient-danger btn-lg" onClick={() => deleteHandler(rec.id)}>Delete</Button>&nbsp;&nbsp;&nbsp;
          </div>
          <img class="card-img-bottom" src={`${rec.Image}`} alt="Card image cap"/>
        </div>
        //   <Col lg="2" md="2">
        //   <div class="card"  key={rec.id}>
        //   <img class="card-img-top" src="..." alt="Card image cap"/>
        //   <div class="card-body">
        //     <h5 class="card-title">{rec.PlaceName}</h5>
        //     <h6 class="card-title">{rec.Categoty}</h6>
        //     <p class="card-text">Amount: { rec.Amount } BD</p>
        //     <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => navigate('/ViewRecipet', {state: {rec}})}>Details
        //       </button>
        //   </div>
        // </div>
        // </Col>
        //
      )
      })

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
                <h1 className="profile-title text-left">View All</h1>
                <h5 className="text-on-back">Recipet</h5>
                <p className="profile-description">
                Easy Expense’s use receipt scanner to start saving time. 
                Simply hold it above a receipt and watch as it magically 
                detects, crops and automatically extracts the key information 
                from a receipt.
                </p>

              </Col>

            </Row>
            <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    Scan recipet
                  </p>
                  <Button tag={Link} to="/CreateRecipet"
                    className="btn-link"
                    color="success"
  
                    size="sm"
                  >
                    <i className="tim-icons icon-minimal-right" />
                  </Button>
                </div>
          </Container>
        </div>

        {/* <div className="section">
          <Container>
            <Row className="justify-content-between">
              <Col md="6">
                <Row className="justify-content-between align-items-center">
                  <UncontrolledCarousel items={carouselItems} />
                </Row>
              </Col>
              <Col md="5">
                <h1 className="profile-title text-left">Projects</h1>
                <h5 className="text-on-back">02</h5>
                <p className="profile-description text-left">
                  An artist of considerable range, Ryan — the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                  performs and records all of his own music, giving it a warm,
                  intimate feel with a solid groove structure. An artist of
                  considerable range.
                </p>
                <div className="btn-wrapper pt-3">
                  <Button
                    className="btn-simple"
                    color="primary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="tim-icons icon-book-bookmark" /> Bookmark
                  </Button>
                  <Button
                    className="btn-simple"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="tim-icons icon-bulb-63" /> Check it!
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <section className="section">
          <Container>
            <Row>
              <Col md="6">
                <Card className="card-plain">
                  <CardHeader>
                    <h1 className="profile-title text-left">Contact</h1>
                    <h5 className="text-on-back">03</h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Your Name</label>
                            <Input defaultValue="Mike" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Email address</label>
                            <Input placeholder="mike@email.com" type="email" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Phone</label>
                            <Input defaultValue="001-12321345" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Company</label>
                            <Input defaultValue="CreativeTim" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Message</label>
                            <Input placeholder="Hello there!" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                      >
                        Send text
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip341148792"
                      >
                        Can't wait for your message
                      </UncontrolledTooltip>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto" md="4">
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-square-pin" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Find us at the office</h4>
                    <p>
                      Bld Mihail Kogalniceanu, nr. 8, <br />
                      7652 Bucharest, <br />
                      Romania
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-mobile" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Give us a ring</h4>
                    <p>
                      Michael Jordan <br />
                      +40 762 321 762 <br />
                      Mon - Fri, 8:00-22:00
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section> */}
        <Row>
        {allRecipets}
        </Row>
        <Footer />
      </div>


    </>
    )
}