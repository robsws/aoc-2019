import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import BasicAnswer from './BasicAnswer';
import Inputs from '../Inputs';
import {totalFuelRequired, totalFuelWithFuelRequired, runIntcode, findNounAndVerb} from '../Solver';

interface Props {
  no: number
}

const Day: React.FC<Props> = ({no}) => {
  var part_one;
  var part_two;
  switch (no) {
    case 1:
      part_one = (
        <BasicAnswer day={no} part={1} answer={totalFuelRequired(Inputs.values[0]).toString()} />
      )
      part_two = (
        <BasicAnswer day={no} part={2} answer={totalFuelWithFuelRequired(Inputs.values[0]).toString()} />
      )
      break;
    case 2:
      part_one = (
        <BasicAnswer day={no} part={1} answer={runIntcode(Inputs.values[1]).toString()} />
      )
      part_two = (
        <BasicAnswer day={no} part={2} answer={findNounAndVerb(Inputs.values[1]).toString()} />
      )
      break;
  }
  return (
    <Container className="my-3 mx-3">
      {part_one}
      {part_two}
    </Container>
  );
}

export default Day;
