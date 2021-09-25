import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Engine from './components/Engine';
import Sample from './components/Sprites/Sample';
import { SetCanvas } from './store/engine';

export default function App () {
  const dispatch = useDispatch();

  const canvasRef = useRef(null);

  useEffect(() => {
    dispatch(SetCanvas(canvasRef.current));
  }, [dispatch]);

  return (
    <>
      <Engine />
      <Sample name='sample' />
      <canvas ref={canvasRef} />
    </>
  );
}
