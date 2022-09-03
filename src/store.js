import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import taskReducer from "./reducers/task";
import { badMsgMiddleware } from "./middleware/badMsg";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    taskReducer,
    storeEnhancers(applyMiddleware(badMsgMiddleware, thunk))
    );

export default store;