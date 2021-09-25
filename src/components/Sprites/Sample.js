import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sprite } from 'pixi.js';

import sample from '../../assets/sample.png';
import { AddSprite, ReadyPivot } from '../../store/engine';

export default function Sample ({ name }) {
  const dispatch = useDispatch();

  const ticker = useSelector(state => state.engine.ticker);
  const engineReady = useSelector(state => state.engine.ready);
  const object = useSelector(state => state.engine.sprites[name]?.object);
  const pivotReady = useSelector(state => state.engine.sprites[name]?.pivotReady);

  useEffect(() => {
    engineReady && !object && dispatch(AddSprite(name, Sprite.from(sample)));
    return () => object && object.destroy(true);
  }, [dispatch, name, object, engineReady]);

  useEffect(() => {
    if (object) {
      object.x += window.innerWidth / 2;
      object.y += window.innerHeight / 2;
    }
  }, [object]);

  useEffect(() => {
    let X = 0;
    const fourPi = 4 * Math.PI;
    const startingX = window.innerWidth / 2;
    const startingY = window.innerHeight / 2;
    const deriveRotation = (x, y) => y / x;
    const derivX = x => 0.5 * Math.cos(x / 2) * (7 / 16) * window.innerWidth;
    const derivY = y => -Math.cos(y) * (3 / 8) * window.innerHeight;
    const animate = diff => {
      X = X >= fourPi ? 0 : X + ((Math.PI * diff) / 120);
      object.x = startingX + Math.sin(X / 2) * (7 / 16) * window.innerWidth;
      object.y = startingY - Math.sin(X) * (3 / 8) * window.innerHeight;
      const inboundX = derivX(X);
      const toRotate = Math.atan(deriveRotation(inboundX, derivY(X)));
      const offset = inboundX > 0 ? Math.PI / 2 : -Math.PI / 2;
      object.rotation = toRotate + offset;
    };
    pivotReady && ticker.add(animate);
    return () => ticker?.remove(animate);
  }, [pivotReady, object, ticker]);

  useEffect(() => {
    if (object) {
      object.pivot.set(200, 200);
      dispatch(ReadyPivot(name));
    }
  }, [dispatch, name, object]);

  return null;
}
