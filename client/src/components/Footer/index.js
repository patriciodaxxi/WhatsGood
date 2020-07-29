import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import UploadPhoto from '../UploadPhoto';
import ProfilePic from '../ProfilePic';
import "./style.css";

function Footer() {
  return (
    <Container fluid id='app-footer'>
      <Row className='text-center'>
        <Col id='footer-title'>
          <b>DEVELOPERS</b>
        </Col>
      </Row>
      <Row id='footer-links'>
        <Col className='developer text-center'>
          <p  className='dev-name'><b>DANIEL ABELL</b></p>
          <p className='dev-link'><a href='https://github.com/dmabell693'>GitHub</a></p>
          <p className='dev-link'><a href='https://www.linkedin.com/in/daniel-abell-782350199/'>LinkedIn</a></p>
        </Col>
        <Col className='developer text-center'>
        <p  className='dev-name'><b>DANNY REYES</b></p>
          <p className='dev-link'><a href='https://github.com/reyesdmusic'>GitHub</a></p>
          <p className='dev-link'><a href='https://www.linkedin.com/in/danny-reyes-dev/'>LinkedIn</a></p>
        </Col>
        <Col className='developer text-center'>
        <p  className='dev-name'><b>EMILIA HARTLINE</b></p>
          <p className='dev-link'><a href='https://github.com/emijoha'>GitHub</a></p>
          <p className='dev-link'><a href='https://www.linkedin.com/in/emilia-josefina-hartline-a14ab21a0/'>LinkedIn</a></p>
        </Col>
        <Col className='developer text-center'>
        <p  className='dev-name'><b>ROGER POUNCEY</b></p>
          <p className='dev-link'><a href='https://github.com/rpounceyjr'>GitHub</a></p>
          <p className='dev-link'><a href='https://www.linkedin.com/in/roger-pouncey-48568b198/'>LinkedIn</a></p>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer;