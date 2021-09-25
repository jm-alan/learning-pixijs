import { Application } from 'pixi.js';

const SET_CANVAS = 'engine/CANVAS';
const START = 'engine/START';
const ADD_SPRITE = 'engine/ADD_SPRITE';
const READY_ENGINE = 'engine/READY';
const CAPTURE_STAGE = 'engine/CAPTURE_STAGE';
const CAPTURE_TICKER = 'engine/CAPTURE_TICKER';
const READY_PIVOT = 'engine/SPRITES/READY_PIVOT';
const TRASH_SPRITE = 'engine/SPRITES/TRASH';

export const SetCanvas = canvas => ({
  type: SET_CANVAS,
  canvas
});

export const StartEngine = () => ({
  type: START
});

export const AddSprite = (key, sprite) => ({
  type: ADD_SPRITE,
  key,
  sprite
});

export const CaptureStage = () => ({
  type: CAPTURE_STAGE
});

export const CaptureTicker = () => ({
  type: CAPTURE_TICKER
});

export const ReadyEngine = () => ({
  type: READY_ENGINE
});

export const ReadyPivot = key => ({
  type: READY_PIVOT,
  key
});

export const TrashSprite = key => ({
  type: TRASH_SPRITE,
  key
});

export default function reducer (
  state = {
    core: null,
    canvas: null,
    ticker: null,
    stage: null,
    ready: false,
    stageReady: false,
    tickerReady: false,
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
    case START:
      return {
        ...state,
        core: new Application({
          view: state.canvas,
          height: window.innerHeight,
          width: window.innerWidth
        })
      };
    case CAPTURE_STAGE:
      return {
        ...state,
        stage: state.core.stage,
        stageReady: true
      };
    case CAPTURE_TICKER:
      return {
        ...state,
        ticker: state.core.ticker,
        tickerReady: true
      };
    case READY_ENGINE:
      return {
        ...state,
        ready: true
      };
    case ADD_SPRITE:
      state.stage.addChild(sprite);
      return {
        ...state,
        sprites: {
          ...state.sprites,
          [key]: {
            object: sprite,
            pivotReady: false,
            trashable: false
          }
        }
      };
    case READY_PIVOT:
      return {
        ...state,
        sprites: {
          ...state.sprites,
          [key]: {
            ...state.sprites[key],
            pivotReady: true
          }
        }
      };
    default:
      return state;
  }
}
