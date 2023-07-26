import axios from 'axios';
import React, {useState, useEffect,} from 'react';
import * as emoji from 'node-emoji'
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
  const [showEditForm, setShowEditForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
      id: '',
      Category_name: '',
      Description: '',
      owner: '',
      Emojis: ''
  });


  useEffect(() => {
      fetchCategories();
  }, []);

  const deleteHandler = async (id) => {
      try {
          const response = await axios.delete(
              `http://127.0.0.1:8000/api/category/${id}/delete/`
          );
          console.log("deleted successfully!");
          window.location.reload(false)
          // navigate('/Delete/ViewAll');
      } catch (error) {
          console.log("Something went wrong", error);
      }
  };

  const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      console.log('tokkkken', token);
      const response = await axios.get('http://127.0.0.1:8000/api/category/list/', {
          headers: {
              'Authorization': `Token ${token}`
          }
      });
      console.log(response.data);
      setCategories(response.data);
  };
  const saveCategory = async () => {
      try {
          const response = await axios.put(
              `http://127.0.0.1:8000/api/category/${selectedCategory.id}/update/`,
              selectedCategory
          );
          console.log("Category updated successfully!");
          setShowEditForm(false); // Hide the edit form after saving
          fetchCategories(); // Refresh the category list
          window.location.pathname = '/category/ListEdit'
      } catch (error) {
          console.log("Error updating category:", error);
      }
  };

  const editHandler = async (id) => {
      setShowEditForm(true);
      try {
          const response = await axios.get(
              `http://127.0.0.1:8000/api/category/${id}/retrieve/`
          );
          console.log("Fetched category data for editing:", response.data);
          setSelectedCategory(response.data);
          setShowEditForm(true);
      } catch (error) {
          console.log("Error fetching category data for editing:", error);
      }
  };

  const changeHandler = (e) => {
      const { name, value } = e.target;
      setSelectedCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };
    const allCategory = categories.map((cat, index) => {
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
      )
      })


      if (showEditForm) {
        return (
          <div>
              <h1>Edit Category</h1>
              <div>
                  <label>Category name</label>
                  <input type='text' name="Category_name" placeholder="Category_name" onChange={changeHandler} value={selectedCategory.Category_name}></input>
                  <input class="form-control" type="hidden" name="id" value={selectedCategory.id} onChange={changeHandler} />
              </div>
              <div>
                  <label>Description</label>
                  <input type='text' name="Description" placeholder="Description" onChange={changeHandler} value={selectedCategory.Description}></input>
              </div>
              <div>
                  <label>owner:</label>
                  <input type='text' name="owner" placeholder="owner" value={selectedCategory.owner}></input>
              </div>
              <div>
                  <label>Emojis</label>
                  <input type="text" name="Emojis" placeholder="Emojis" onChange={changeHandler} value={selectedCategory.Emojis}></input>
              </div>
              {/* Add a save button to submit the edited category */}
              <button type="button" class="btn bg-gradient-primary btn-lg" onClick={saveCategory}>Save</button>
          </div>
      );
    }
    else
    {
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
         <Row>
         {allCategory}
         </Row>
         <FooterHome />
       </div>
 
 
     </>
    )
    }
}
