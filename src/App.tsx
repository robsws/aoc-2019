import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';

import Day from './components/Day';

const App: React.FC = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Advent of Code 2019 - Rob Streeting</Navbar.Brand>
      </Navbar>
      <Container className="my-3 mx-3">
        <Day no={1} />
      </Container>
    </div>
  );
}

export default App;
