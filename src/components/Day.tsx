import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import BasicAnswer from './BasicAnswer';
import Inputs from '../Inputs';
import {totalFuelRequired, totalFuelWithFuelRequired, runIntcode, findNounAndVerb, getClosestIntersectionPointDistance, getMinimalSignalDelay, numberOfPasswords, runExtendedIntcode, totalOrbits, orbitalTransfers, maximumOutputSignal, maximumOutputSignalWithFeedbackLoop, validateSpaceImage, drawSpaceImageFunction} from '../Solver';
import CanvasAnswer from './CanvasAnswer';

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
        <BasicAnswer day={no} part={2} answer={getMinimalSignalDelay(Inputs.three).toString()} />
      )
      break;
    case 4:
      part_one = (
        <BasicAnswer day={no} part={1} answer={numberOfPasswords(Inputs.four[0], Inputs.four[1], 1).toString()} />
      )
      part_two = (
        <BasicAnswer day={no} part={2} answer={numberOfPasswords(Inputs.four[0], Inputs.four[1], 2).toString()} />
      )
      break;
    case 5:
      let answer = 0;
      const intcode1 = runExtendedIntcode(Inputs.five, [1]);
      for (const result of intcode1) {
        answer = result;
      }
      part_one = (
        <BasicAnswer day={no} part={1} answer={answer.toString()} />
      )
      const intcode2 = runExtendedIntcode(Inputs.five, [5]);
      for (const result of intcode2) {
        answer = result;
      }
      part_two = (
        <BasicAnswer day={no} part={2} answer={answer.toString()} />
      )
      break;
    case 6:
      part_one = (
        <BasicAnswer day={no} part={1} answer={totalOrbits(Inputs.six).toString()} />
      )
      part_two = (
        <BasicAnswer day={no} part={2} answer={orbitalTransfers(Inputs.six).toString()} />
      )
      break;
    case 7:
      part_one = (
        <BasicAnswer day={no} part={1} answer={maximumOutputSignal(Inputs.seven).toString()} />
      )
      part_two = (
        <BasicAnswer day={no} part={2} answer={maximumOutputSignalWithFeedbackLoop(Inputs.seven).toString()} />
      )
      break;
    case 8:
      part_one = (
        <BasicAnswer day={no} part={1} answer={validateSpaceImage(Inputs.eight, 25, 6).toString()} />
      )
      part_two = (
        <CanvasAnswer day={no} part={2} width={25} height={6} scale={8} draw_func={drawSpaceImageFunction(Inputs.eight, 25, 6)} />
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
