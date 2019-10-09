import { combineEpics, createEpicMiddleware } from "redux-observable";
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";

import { addTaskEpic, fetchTasksEpic, removeTaskEpic, tasksReducer, updateTaskEpic } from './Tasks';
import { taskEditModalReducer } from "./TaskEditModal";

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const rootEpic = combineEpics(
    fetchTasksEpic,
    addTaskEpic,
    updateTaskEpic,
    removeTaskEpic
);

const rootReducer = combineReducers({
    tasks: tasksReducer,
    taskEditModal: taskEditModalReducer
});

const epicMiddleware = createEpicMiddleware();

function configureStore() {
    let store;
    if (__DEV__) {
        store = createStore(
            rootReducer,
            composeWithDevTools(applyMiddleware(epicMiddleware))
        );
    }
    else {
        store = createStore(
            rootReducer,
            applyMiddleware(epicMiddleware)
        );
    }
    epicMiddleware.run(rootEpic);
    return store;
}

export default configureStore();
