import {combineReducers} from 'redux';
import TaskReducer from './task';
import Common from './common';

export default function(history){combineReducers({
  task: TaskReducer,
  commonData: Common,
})};
