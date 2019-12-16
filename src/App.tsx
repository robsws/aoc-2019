import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Tabs, Tab } from 'react-bootstrap';

import Day from './components/Day';

const App: React.FC = () => {
  const tabs = [];
  for (let i = 1; i <= 25; i++) {
    tabs.push(
      <Tab key={i} eventKey={'tab_'+i.toString()} title={'Day '+i.toString()}>
        <Day no={i} />
      </Tab>
    );
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Advent of Code 2019 - Rob Streeting</Navbar.Brand>
      </Navbar>
      <Tabs defaultActiveKey="day1" id="main_tabs">
        {tabs}
      </Tabs>
    </div>
  );
}

export default App;
