/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Aboutus from '../../components/Footer/Footer'
// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import {
  
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
 

} from "reactstrap";
import { Link } from "react-router-dom";
export default function Download() {
  let zainab = "github.com/zainabalanjawy/Portfolio"
  return (
          <div className="wrapper">
        <div className="page-header">
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="6" md="6">
                <h1 className="text-white">
                  Track your expanses<br />
          
                </h1>
                <p className="text-white mb-3">
                Managing your daily expenses has never been easier. 
                Access all receipts and expense submissions from your 
                Expenses dashboard and create, validate, or refuse them 
                in just a click. 
                </p>
                <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    Read more
                  </p>
                  <Button
                    className="btn-link"
                    color="success"
                    href="#pablo"
                    // onClick={() => navigate('/Aboutus')}
                    size="sm"
                  >
                    
                    <i className="tim-icons icon-minimal-right" />
                  </Button>
                </div>
              </Col>
              <Col lg="4" md="5">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/etherum.png")}
                />
              </Col>
            </Row>
          </div>
        </div>

        <section className="section section-lg">
 
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <h1 className="text-center">Our main features</h1>
                <Row className="row-grid justify-content-center">
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-primary">
                        <i className="tim-icons icon-money-coins" />
                      </div>
                      <h4 className="info-title">Receipts Scanner</h4>
                      <hr className="line-primary" />
                      <p>
                        Save your receipts by uploading them through 
                        our scanner and create your expanses.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-warning">
                        <i className="tim-icons icon-chart-pie-36" />
                      </div>
                      <h4 className="info-title">Expenses Graphs</h4>
                      <hr className="line-warning" />
                      <p>
                       Get a representation of a diagram that represents
                      your expanses and categories.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-success">
                        <i className="tim-icons icon-single-02" />
                      </div>
                      <h4 className="info-title">Profile Setup</h4>
                      <hr className="line-success" />
                      <p>
                        Setup your profile data and define your budget to 
                        to manege your expanses.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section-lg section-coins">

          <Container>
            <Row>
              <Col md="4">
                <hr className="line-info" />
                <h1>
                  Meet the team of{" "}
                  <span className="text-info">Ekono</span>
                </h1>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/zainab.png")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Zainab Al-Anjawi</h4>
                        <span color="primary" className="primary">"Reach your life goals, one zero at a time."</span>
                        <hr className="line-warning" />
                      </Col>
                    </Row>
                    <Row>

                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Link to={`${zainab}`} />
                  
                    <Button className="btn-simple" color="warning">
                      Github
                      <a href="https://github.com/zainabalanjawy/Portfolio"/>
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="3">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/etherum.png")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Jawaher Mohmmed</h4>
                        <span>""</span>
                        <hr className="line-success" />
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="success">
                      Github
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="3">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/ripp.png")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Mariam Merza</h4>
                        <span>""</span>
                        <hr className="line-info" />
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="info">
                      Github
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="3">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/ripp.png")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Fatima Mohmmed</h4>
                        <span>"</span>
                        <hr className="line-primary" />
                      </Col>
                    </Row>

                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="primary">
                      Github
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        {/* <Footer /> */}
      </div>
  );
}
