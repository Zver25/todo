import { combineReducers, createStore, compose } from 'redux';

import { tasksReducer } from './Tasks';
import { taskEditModalReducer } from "./TaskEditModal";

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const rootReducer = combineReducers({
    tasks: tasksReducer,
    taskEditModal: taskEditModalReducer
});

const store = createStore(rootReducer, composeEnhancers());

export default store;
