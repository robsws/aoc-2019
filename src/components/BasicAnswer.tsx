import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast } from 'react-bootstrap';

interface Props {
  day: number,
  part: number,
  answer: string
}

const BasicAnswer: React.FC<Props> = ({day, part, answer}) => {
  return (
    <Toast>
      <Toast.Header>
        <strong className="mr-auto">Day {day}: Part {part}</strong>
      </Toast.Header>
      <Toast.Body>
        {answer}
      </Toast.Body>
    </Toast>
  );
}

export default BasicAnswer;
