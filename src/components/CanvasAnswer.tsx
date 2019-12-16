import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast } from 'react-bootstrap';

interface Props {
  day: number,
  part: number,
  width: number,
  height: number,
  scale: number,
  draw_func: (canvas: CanvasRenderingContext2D, scale: number) => void
};

const CanvasAnswer: React.FC<Props> = ({day, part, width, height, scale, draw_func}) => {
  const canvas_ref: React.RefObject<HTMLCanvasElement> = React.createRef();

  useEffect(() => {
    let canvas = canvas_ref.current!;
    let context = canvas.getContext('2d')!;
    draw_func(context, scale);
  });

  return (
    <Toast>
      <Toast.Header>
        <strong className="mr-auto">Day {day}: Part {part}</strong>
      </Toast.Header>
      <Toast.Body>
        <canvas ref={canvas_ref} width={width * scale} height={height * scale} />
      </Toast.Body>
    </Toast>
  );
}

export default CanvasAnswer;
