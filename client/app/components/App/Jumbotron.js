import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
const Styles = styled.div`
.jumbotron{
  padding-bottom:1px;
  padding-top:1px;
  position:relative;
}
.overlay{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
}
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <h1>Welcome</h1>
        <p>This is the collection of objective questions. Please either register or log in to access all the contents.</p>
      </Container>
    </Jumbo>
  </Styles>
)
