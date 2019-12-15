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
        <Tab eventKey="day3" title="Day Three">
          <Day no={3} />
        </Tab>
        <Tab eventKey="day4" title="Day Four">
          <Day no={4} />
        </Tab>
        <Tab eventKey="day5" title="Day Five">
          <Day no={5} />
        </Tab>
        <Tab eventKey="day6" title="Day Six">
          <Day no={6} />
        </Tab>
        <Tab eventKey="day7" title="Day Seven">
          <Day no={7} />
        </Tab>
        <Tab eventKey="day8" title="Day Eight">
          <Day no={8} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
