import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import BasicAnswer from './BasicAnswer';
import Inputs from '../Inputs';
import {totalFuelRequired, totalFuelWithFuelRequired, runBasicIntcode, findNounAndVerb, getClosestIntersectionPointDistance, getMinimalSignalDelay, numberOfPasswords, totalOrbits, orbitalTransfers, maximumOutputSignal, maximumOutputSignalWithFeedbackLoop, validateSpaceImage, drawSpaceImageFunction, bestStationLocation, twoHundredthAsteroid, paintHull} from '../Solver';
import {runIntcode, toggle_debug} from '../Intcode';
import CanvasAnswer from './CanvasAnswer';

interface Props {
  no: number
}

const Day: React.FC<Props> = ({no}) => {
  var part_one = (<p>Part One: Not implemented</p>);
  var part_two = (<p>Part Two: Not implemented</p>);
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
        <BasicAnswer day={no} part={1} answer={runBasicIntcode(Inputs.two).toString()} />
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
      const intcode1 = runIntcode(Inputs.five, [1]);
      for (const result of intcode1) {
        answer = result;
      }
      part_one = (
        <BasicAnswer day={no} part={1} answer={answer.toString()} />
      )
      const intcode2 = runIntcode(Inputs.five, [5]);
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
    case 9:
      let output: number = 0;
      const intcode9_1 = runIntcode(Inputs.nine, [1]);
      for (const result of intcode9_1) {
        output = result;
      }
      part_one = (
        <BasicAnswer day={no} part={1} answer={output.toString()} />
      )
      let output2: number = 0;
      const intcode9_2 = runIntcode(Inputs.nine, [2]);
      for (const result of intcode9_2) {
        output2 = result;
      }
      part_two = (
        <BasicAnswer day={no} part={2} answer={output2.toString()} />
      )
      break;
    case 10:
      const station = bestStationLocation(Inputs.ten);
      part_one = (
        <BasicAnswer day={no} part={1} answer={station.x.toString() + ',' + station.y.toString() + ': '+station.visible.toString()} />
      )
      part_two = (
        <BasicAnswer day={no} part={1} answer={twoHundredthAsteroid(station.x, station.y, Inputs.ten).toString()} />
      )
      break;
    case 11:
      part_one = (
        <BasicAnswer day={no} part={1} answer={paintHull(Inputs.eleven).toString()} />
      )
      // part_two = (
      //   <BasicAnswer day={no} part={1} answer={twoHundredthAsteroid(station.x, station.y, Inputs.ten).toString()} />
      // )
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
