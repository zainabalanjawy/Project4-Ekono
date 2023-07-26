import React, { useState } from 'react'
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
// import * as mindee from "mindee";

// import { Container, Center, Text, Box, Button, Image, VStack, Link } from '@chakra-ui/react';
// import { AttachmentIcon } from '@chakra-ui/icons'

let ps = null;
export default function Create(){
    const [file, setFile] = useState();
    let [category, setCatogery] = useState([])
    const [newCatogery, setnewCatogery] = useState({});
    const [newExpanse, setnewExpanse] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [recipet, setRecipet] = useState({
      PlaceName: "",
      Amount: 0,
      Categoty: "",
      Image:""
  });

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


    const handleUploadFile = (evt) => {
        setFile(
          evt.target.files[0],
        )
    }
    const submitPhoto = async () => {
        if (!file) { return; }
        setIsUploading(true)
        const data = new FormData()
    
        data.append('file', file)
    
        let url = "https://api.taggun.io/api/receipt/v1/verbose/file";
    
        try {
          const res = await axios.post(url, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'apikey': "7bdc551026fe11ee8c1b2d7f43bc2713"
            } 
          }).then(res => {


          console.log(res)
          setIsUploading(false);
          recipet['PlaceName']=res.data.merchantName.data
          recipet['Amount']= ("Amount",res.data.totalAmount.data)
          recipet['Categoty']=("Categoty","uncategorized" )
          recipet['Image']=file
          console.log('recipt',recipet);
          const token = localStorage.getItem("token")

          const list = axios.get('http://127.0.0.1:8000/api/category/list/',{
                headers: {
                  'Authorization': `Token ${token}`
                } 
              }).then(res => {
                console.log("returned categories",res.data)
                setCatogery(res.data)
                console.log("categories",category);
                if(category!=null)
                {
    
                  let cat = category.filter(function (el) {
                    return el.Category_name == 'uncategorized'})

                    console.log("categoryyy",cat);
                  if(category.length==0)
                  {
                    newCatogery.Category_name="uncategorized"
                    newCatogery.Emojis="uncategorized"
                    newCatogery.Description= "This is uncategorized category"
                    console.log("cateee",category);
                    axios.post('http://127.0.0.1:8000/api/category/create/', newCatogery ,{
                      headers: {
                        'Authorization': `Token ${token}`
                      } 
                    })
                  .then(res => {
                    console.log('category response: ', res)
                    let catid= res.data.id
                    recipet.Categoty=catid
                axios.post('http://127.0.0.1:8000/api/Recipet/create/', recipet , {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Token ${token}`
                },
                })
                  .then(res => {
                    console.log('recipt response: ', res)
                    newExpanse.PlaceName= res.data.PlaceName
                    newExpanse.Items= "items"
                    newExpanse.Amount= res.data.Amount
                    newExpanse.Category=res.data.Categoty
                    newExpanse.recipet = res.data.id
                    // const date = new Date()
                    // newExpanse.Date = date
                    console.log("new expanse", newExpanse);
                    axios.post('http://127.0.0.1:8000/api/Expenses/Create/', newExpanse , {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Token ${token}`
                    },
                    })
                  }).catch(err => {
                    console.log(err)
                  })
                  }).catch(err => {
                    console.log(err)
                  })
                  }
                  else
                  {
                    let cat = category.filter(function (el) {
                      return el.Category_name == 'uncategorized'})  
                      console.log("fonud",cat);
                    let catid= cat[0].id
                    recipet.Categoty=catid
                    axios.post('http://127.0.0.1:8000/api/Recipet/create/', recipet , {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Token ${token}`
                },
                })
                  .then(res => {
                    console.log(res)
                    console.log('recipt response: ', res)
                    newExpanse.PlaceName= res.data.PlaceName
                    newExpanse.Items= "items"
                    newExpanse.Amount= res.data.Amount
                    newExpanse.Category=res.data.Categoty
                    newExpanse.recipet = res.data.id
                    // const date = new Date()
                    // newExpanse.Date = date
                    const token = localStorage.getItem("token")
                    console.log("new expanse", newExpanse);
                    axios.post('http://127.0.0.1:8000/api/Expenses/Create/', newExpanse , {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Token ${token}`
                    },
                    })

                  }).catch(err => {
                    console.log(err)
                  })
                }
                  }
              }).catch(err => {
                console.log(err)
              })
            }).catch(err => {
              console.log(err)
            })
        } catch (e) {
          console.error(e);
        }
    }

    return (
        <>
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
                <h1 className="profile-title text-left">Scan </h1>
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
                    View recipet
                  </p>
                  <Button tag={Link} to="/ViewAllRecipet"
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
    */}
        <section className="section">
          <Container>
          <div class="card">
          <div class="card-body">
            <h5 class="card-title">Recipet Scanner </h5>
            <p class="card-text">Upload a recipet image here</p>
            <Row>
              <Col md="10">
                <Card className="card-plain">
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="10">
                          <FormGroup>
                            <label>Upload an Image</label>
                            <input id="file-upload" type="file" onChange={handleUploadFile}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                        onClick={submitPhoto}
                      >
                        Upload
                      </Button>
  
                    </Form>
                  </CardBody>
                </Card>
              </Col>

            </Row>
            </div>
             </div>
          </Container>
        </section> 

        <FooterHome />
      </div>


    </>
      {/* <div height="100vh" mt="30vh">
        <div textAlign="center">
          <div mt={16}>
            <div spacing={6}>
              <div>
                <label htmlFor="file-upload">
                  Click to select receipt
                </label>
                <input id="file-upload" type="file" onChange={handleUploadFile}/>
              </div>
          </div>
            
        <Button size="md" colorScheme="primary" onClick={submitPhoto}>
                    Upload photo
        </Button>
</div>
        </div>
      </div> */}
    </>
    )
}