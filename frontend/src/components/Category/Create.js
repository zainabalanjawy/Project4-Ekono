import React, { useState } from "react";
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import FooterHome from "components/Footer/FooterHome.js";
import classnames from "classnames";
import axios from 'axios'
import PerfectScrollbar from "perfect-scrollbar";
import {BrowserRouter as Router,Navigate, Route , Routes, Link ,useNavigate} from 'react-router-dom'
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

export default function Create(props) {
    //Set state for the user into new user
    const [newCatogery, setCatogery] = useState({});
    //Function to handle any change in value of fields
    const changeHandler = (e) => {
        //Set copy of newuser into user every time
        const catogery = { ...newCatogery }
        //Set key with value for fields sent in the form
        catogery[e.target.name] = e.target.value
        console.log('catogery', catogery)
        //Set user to new user
        setCatogery(catogery)
    }
    //Function to pass the new user after click
    const createHandler = (event) => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        console.log('tokkkken',token);
        axios.post('http://127.0.0.1:8000/api/category/create/', newCatogery ,{
            headers: {
              'Authorization': `Token ${token}`
            } 
          })
        .then(res => {
          console.log('registerhandler response: ', res)
        }).catch(err => {
          console.log(err)
        })

    }

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
                <h1 className="profile-title text-left">Create </h1>
                <h5 className="text-on-back">Category</h5>
                <p className="profile-description">
                Categories in Ekono helps in orginizing expanses and
                 tracking expanses. Start tracking your expanses by listing 
                 some categories!
                </p>

              </Col>

            </Row>
            <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    View categories
                  </p>
                  <Button tag={Link} to="/Category/List"
                    className="btn-link"
                    color="success"
  
                    size="sm"
                  >
                    <i className="tim-icons icon-minimal-right" />
                  </Button>
                </div>
          </Container>
        </div>


        <section className="section">
          <Container>
          <div class="card">
          <div class="card-body">
          <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4"> Category name </label>
      <input name="Category_name" placeholder=" Category_name" onChange={changeHandler} class="form-control" />
    </div>

  </div>
  <div class="form-group">
    <label for="inputAddress">Description</label>
    <input type='text' name="Description" placeholder="Description " onChange={changeHandler} class="form-control" />
  </div>

  <div class="form-row">
    {/* <div class="form-group col-md-4">
      <label for="inputState">Emojies</label>
      <select type="Emojis" name="Emojis" placeholder="Emojis" onChange={changeHandler} id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div> */}
    <div class="form-group col-md-2">
      <label for="inputZip">Emojies</label>
      <input type="Emojis" name="Emojis" placeholder="Emojis" onChange={changeHandler} class="form-control"/>
    </div>
  </div>
  <Button onClick={createHandler} type="submit" class="btn btn-primary">Create</Button>
</form>
</div>
</div>
          </Container>
        </section> 

        <FooterHome />
      </div>


    </>
    )
}