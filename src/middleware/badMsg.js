// import { ADD_ARTICLE } from "../constants/action-types";

import { ADD_TASK } from "../constants/action-constants";

const badMsg = ["spam", "money"];

export function badMsgMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      // do your stuff
      if (action.type === ADD_TASK) {
        
        const foundWord = badMsg.filter(word =>
          action.payload.task_msg.includes(word)
        );

        if (foundWord.length) {
          return dispatch({ type: "FOUND_BAD_WORD" });
        }
      }
      return next(action);
    };
  };
}