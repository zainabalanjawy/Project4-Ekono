import axios from 'axios';
import React, {useState, useEffect,} from 'react';

import { Link } from 'react-router-dom';
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import FooterHome from "components/Footer/FooterHome.js";
import { useNavigate} from 'react-router-dom'
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

export default function List(props){
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
    // const list category = () => {
        const [category, setCatogery] = useState([])
        const navigate = useNavigate();
        // const UpdateHandler = any
        const deleteHandler = async (id) => {
            try {
              const response = await axios.delete(
                `http://127.0.0.1:8000/api/category/${id}/delete/`
              )
              console.log("deleted successfully!")
              navigate('/Category/List')
            } catch (error) {
              console.log("Something went wrong", error)
            }
          }
      
        const fetchCategory = async () => {
            const token = localStorage.getItem("token")
            console.log('tokkkken',token);
            const list = await axios.get('http://127.0.0.1:8000/api/category/list/',{
                headers: {
                  'Authorization': `Token ${token}`
                } 
              })
            console.log(list.data)
            setCatogery(list.data)
        }
        useEffect(() => {
            fetchCategory();
        }, [])
    // }
    const allCategory = category.map((cat, index) => {
        return (
          <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{cat.Category_name}</h5>
              <p class="card-text">{cat.Description}</p>
              <p class="card-text">{cat.owner}</p>
              <Button type="button" color='danger' class="btn bg-gradient-danger btn-lg" onClick={() => deleteHandler(cat.id)}>Delete</Button>
            </div>
          </div>
        </div>
  
        //   <div class="col-lg-4 col-md-8">
        //   <div class="card">
        //     <div class="card-body">
              
        //       <div class="author">
        //         <div class="name">
        //           <span>Cateogry name: {cat.Category_name}</span>
        //           <div class="stats">
        //             <small><i class="far fa-clock"></i>Description: {cat.Description}</small>
        //           </div>
        //         </div>

        //         <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => deleteHandler(cat.id)}>Delete</button>
        //       </div>
        //       <p class="mt-4">Emojes: { cat.Emojis }</p>
        //       <p class="mt-4">Owner: { cat.owner }</p>
        //       {/* <button type="button" class="btn bg-gradient-primary btn-lg">Details
        //       </button> */}
        //       <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => deleteHandler(cat.id)}>Delete</button>
        //       {/* <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => UpdateHandler(cat.id)}>Edit</button> */}
              
              
        //     </div>
        //   </div>
        //   <br></br>
        // </div>
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
                 <h5 className="text-on-back">Categories</h5>
                 <p className="profile-description">
                 Categories in Ekono helps in orginizing expanses and
                 tracking expanses. Start tracking your expanses by listing 
                 some categories!
                 </p>
 
               </Col>
 
             </Row>
             <div className="btn-wrapper mb-3">
                   <p className="category text-success d-inline">
                     Create category
                   </p>
                   <Button tag={Link} to="/Category/Create"
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
         {allCategory}
         </Row>
         <FooterHome />
       </div>
 
 
     </>
    )
}
