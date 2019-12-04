import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import BasicAnswer from './BasicAnswer';
import Inputs from '../Inputs';
import {totalFuelRequired, totalFuelWithFuelRequired, runIntcode, findNounAndVerb, getClosestIntersectionPointDistance} from '../Solver';

interface Props {
  no: number
}

const Day: React.FC<Props> = ({no}) => {
  var part_one;
  var part_two;
  switch (no) {
    case 1:
      part_one = (
        <BasicAnswer day={no} part={1} answer={totalFuelRequired(Inputs.one).toString()} />
      )
      part_two = (
        <BasicAnswer day={no} part={2} answer={totalFuelWithFuelRequired(Inputs.one).toString()} />
      )
      break;
    case 2:
      part_one = (
        <BasicAnswer day={no} part={1} answer={runIntcode(Inputs.two).toString()} />
      )
      part_two = (
        <BasicAnswer day={no} part={2} answer={findNounAndVerb(Inputs.two).toString()} />
      )
      break;
    case 3:
        part_one = (
          <BasicAnswer day={no} part={1} answer={getClosestIntersectionPointDistance(Inputs.three).toString()} />
        )
        part_two = (
          <BasicAnswer day={no} part={2} answer={'to solve'} />
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
