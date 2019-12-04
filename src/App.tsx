import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Tabs, Tab } from 'react-bootstrap';

import Day from './components/Day';

const App: React.FC = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Advent of Code 2019 - Rob Streeting</Navbar.Brand>
      </Navbar>
      <Tabs defaultActiveKey="day1" id="main_tabs">
        <Tab eventKey="day1" title="Day One">
          <Day no={1} />
        </Tab>
        <Tab eventKey="day2" title="Day Two">
          <Day no={2} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
