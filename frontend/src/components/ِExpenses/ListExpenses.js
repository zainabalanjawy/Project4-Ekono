import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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
export default function ListExpenses(props) {
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
    const navigate = useNavigate();
    const [showEditForm, setShowEditForm] = useState(false);
    const[Category,setCategory] = useState([]);
    const [Expenses, setExpenses] = useState([]);
    const [selectedExpenses, setSelectedExpenses] = useState({
        id: '',
        placName: '',
        Items: '',
        Amount: '',
        Category: '',
    });
    useEffect(() => {
        fetchExpenses();
        fetchCategory();
    }, []);
    //List all Category
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
  // Category mapping to retrive whole category obj
  const category = Category.map((category, index) => {
    console.log('Category:', category)
    return(
      <>
        <option value={category.id}>{category.Category_name}</option>
      </>
    )
  })
   //Delete Expenses function
    const deleteHandler = async (id) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/Expenses/${id}/Delete/`
            );
            console.log("deleted successfully!");
            window.location.reload(false)
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };
    //This function to list all Exp
    const fetchExpenses = async () => {
        const token = localStorage.getItem("token");
        console.log('tokkkken', token);
        const response = await axios.get('http://127.0.0.1:8000/api/Expenses/List/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        console.log(response.data);
        setExpenses(response.data);
    };
    // save the expense to the data
    const saveExpense = async () => {
      console.log("Selected Exp : ", selectedExpenses)
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/Expenses/${selectedExpenses.id}/Update/`,
                selectedExpenses
            );
            console.log("Exp updated successfully!");
            setShowEditForm(false); // Hide the edit form after saving
            fetchExpenses(); // Refresh the Exp list
        } catch (error) {
            console.log("Error updating category:", error);
        }
    };
    //Edit Exp
    const editHandler = async (id) => {
        setShowEditForm(true);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/Expenses/${id}/Details/`
            );
            console.log("Fetched category data for editing:", response.data);
            setSelectedExpenses(response.data);
            setShowEditForm(true);
        } catch (error) {
            console.log("Error fetching category data for editing:", error);
        }
    };
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setSelectedExpenses((prevExp) => ({ ...prevExp, [name]: value }));
    };
    React.useEffect(() => {
      document.body.classList.toggle("landing-page");
      // Specify how to clean up after this effect:
      return function cleanup() {
        document.body.classList.toggle("landing-page");
      };
    }, []);
    const allExpense = Expenses.map((exp, index) => {
        return (
          <>
        <HomeNavbar />
            <div class="card-new" key={index}>
                    <div class="card-body">
                      <h5 class="card-title">{exp.PlaceName}</h5>
                      <p class="card-text">Items: {exp.Items}</p>
                      <p class="card-text">Category: {exp.Category.Category_name} </p>
                      <p class="card-text">Amount: {exp.Amount}</p>
                        <Button type="button" color='danger' class="btn bg-gradient-danger btn-lg" onClick={() => deleteHandler(exp.id)}>Delete</Button>
                        <Button type="button" color='danger' class="btn bg-gradient-danger btn-lg" onClick={() => editHandler(exp.id)}>Edit</Button>
                </div>
            </div>
            </>
        );
    });
    if (!showEditForm) {
        return (
            <div>
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
                <h1 className="profile-title text-left">View All Expenses</h1>
                <h5 className="text-on-back">Expenses</h5>
                <p className="profile-description">
                You need to track expenses to become aware of your spending.
                </p>
              </Col>
            </Row>
            <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    Create Expenses
                  </p>
                    <Button tag={Link} to="/Expenses/Create"
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
        {allExpense}
        </Row>
        <Footer />
      </div>
      </div>
      );
    } else {
        return (
            <div>
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
                      <h1 className="profile-title text-left">Edit Expenses</h1>
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
                          <label>place Name: </label>
                          <Input type='text' name="PlaceName" placeholder="PlaceName" onChange={changeHandler} value={selectedExpenses.PlaceName}/>
                          <Input class="form-control" type="hidden" name="id" value={selectedExpenses.id} onChange={changeHandler} />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                          <label>Items: </label>
                          <Input type='text' name="Items" placeholder="Items" onChange={changeHandler} value={selectedExpenses.Items}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Amount</label>
                            <Input type='text' name="Amount" placeholder="Amount" onChange={changeHandler} value={selectedExpenses.Amount}/>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                        <FormGroup>
                            <label>Category</label>
                            <div class= "selectcontainer">
                            <div class="selectExp">
                            <select name='Category' onChange={changeHandler}>
                            {category}
                            </select>
                            </div>
                          </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                        onClick={saveExpense}
                      >
                        Save
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
              <Col className="ml-auto" md="4">
                <div className="info info-horizontal">
                </div>
                <div className="info info-horizontal">
                </div>
                </Col>
                </Container>
              </div>
              <Row>
          <div>
          <div className="section">
        </div>
        <section className="section">
          <Container>
            <Row>
              <Col className="ml-auto" md="4">
                <div className="info info-horizontal">
                </div>
                <div className="info info-horizontal">
                </div>
              </Col>
            </Row>
          </Container>
        </section>
          </div>
              </Row>
              <Footer />
              </div>
              </div>
        );
    }
}