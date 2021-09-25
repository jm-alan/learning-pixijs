import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CaptureStage, CaptureTicker, ReadyEngine, StartEngine } from '../../store/engine';

export default function Engine () {
  const dispatch = useDispatch();

  const coreReady = !!useSelector(state => state.engine.core);
  const canvasReady = !!useSelector(state => state.engine.canvas);
  const stageReady = useSelector(state => state.engine.stageReady);
  const tickerReady = useSelector(state => state.engine.tickerReady);

  useEffect(() => {
    canvasReady && dispatch(StartEngine());
  }, [dispatch, canvasReady]);

  useEffect(() => {
    coreReady && (() => {
      dispatch(CaptureStage());
      dispatch(CaptureTicker());
    })();
  }, [dispatch, coreReady]);

  useEffect(() => {
    stageReady && tickerReady && dispatch(ReadyEngine());
  }, [dispatch, stageReady, tickerReady]);

  return null;
}
