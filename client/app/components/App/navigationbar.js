import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

export const NavigationBar = (props) => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Questions For You</Navbar.Brand>
      {props.isLoggedIn ? <Navbar.Toggle aria-controls="basic-navbar-nav" />: ''}
      {props.isLoggedIn ?
                           <Navbar.Collapse id="basic-navbar-nav">
                           <Nav className="ml-auto">
                           <Nav.Link href="/about">{'Profile'}</Nav.Link>
                           <Form inline>
                            <Button variant="link" onClick={props.logOutButtonClick}>Log out</Button>
                           </Form>
                           </Nav>
                           </Navbar.Collapse>
                         :
                           ''
    }
    </Navbar>
  </Styles >
)
