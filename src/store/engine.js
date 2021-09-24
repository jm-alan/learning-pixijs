import { Application } from '@pixi/app';

const SET_CANVAS = 'engine/CANVAS';
const READY = 'engine/READY';
const ADD_SPRITE = 'engine/ADD_SPRITE';
const CAPTURE_STAGE = 'engine/CAPTURE_STAGE';

export const SetCanvas = canvas => ({
  type: SET_CANVAS,
  canvas
});

export const ReadyEngine = () => ({
  type: READY
});

export const AddSprite = (key, sprite) => ({
  type: ADD_SPRITE,
  key,
  sprite
});

export const CaptureStage = () => ({
  type: CAPTURE_STAGE
});

export default function reducer (
  state = {
    core: null,
    canvas: null,
    stage: null,
    ready: false,
    sprites: {}
  },
  { type, canvas, key, sprite }
) {
  switch (type) {
    case SET_CANVAS:
      return {
        ...state,
        canvas
      };
    case READY:
      return {
        ...state,
        core: new Application({
          view: state.canvas,
          height: window.innerHeight,
          width: window.innerWidth
        }),
        ready: true
      };
    case CAPTURE_STAGE:
      return {
        ...state,
        stage: state.core.stage
      };
    case ADD_SPRITE:
      state.stage.addChild(sprite);
      return {
        ...state,
        sprites: {
          ...state.sprites,
          [key]: sprite
        }
      };
    default:
      return state;
  }
}
