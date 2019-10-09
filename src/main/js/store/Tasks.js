import { ajax } from 'rxjs/ajax';
import { switchMap, catchError, map } from "rxjs/operators";
import { ofType } from 'redux-observable';

import parseRequest from "./parseRequest";

const REQUEST_TASKS_FAILURE = 'REQUEST_TASKS_FAILURE';
const FETCH_TASKS = 'FETCH_TASKS';
const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
const ADD_TASK = 'ADD_TASK';
const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
const REMOVE_TASK = 'REMOVE_TASK';
const REMOVE_TASK_SUCCESS = 'REMOVE_TASK_SUCCESS';
const UPDATE_TASK = 'UPDATE_TASK';
const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
const REMOVE_COMPLETED_TASKS = 'REMOVE_COMPLETED_TASKS';

const requestFailure = (error) => ({ type: REQUEST_TASKS_FAILURE, error });
export const fetchTasks = () => ({ type: FETCH_TASKS });
const fetchTasksSuccess = (tasks) => ({ type: FETCH_TASKS_SUCCESS, tasks });
export const addTask = (title, description) => ({ type: ADD_TASK, title, description });
const addTaskSuccess = task => ({ type: ADD_TASK_SUCCESS, task });
export const removeTask = id => ({ type: REMOVE_TASK, id });
const removeTaskSuccess = id => ({ type: REMOVE_TASK_SUCCESS, id });
export const updateTask = (id, title, description, completed) => ({ type: UPDATE_TASK, id, title, description, completed });
const updateTaskSuccess = task => ({ type: UPDATE_TASK_SUCCESS, task });
export const removeCompletedTasks = () => ({ type: REMOVE_COMPLETED_TASKS });

const initialState = [
    {
        id: '1',
        completed: false,
        title: 'Firsd task',
        description: 'Small description',
    },
    {
        id: '2',
        completed: true,
        title: 'Second task',
        description: 'Description for second task',
    }
];

const apiUrl = '/api/tasks';

export const fetchTasksEpic = action$ => action$.pipe(
    ofType(FETCH_TASKS),
    switchMap(() =>
        ajax.get(apiUrl).pipe(
            map(parseRequest),
            map(fetchTasksSuccess),
            catchError(requestFailure)
        )
    )
);

export const addTaskEpic = action$ => action$.pipe(
    ofType(ADD_TASK),
    switchMap(({ title, description }) =>
        ajax.post(apiUrl, { title, description }, { 'Content-Type': 'application/json' }).pipe(
            map(parseRequest),
            map(addTaskSuccess),
            catchError(requestFailure)
        )
    )
);

export const removeTaskEpic = action$ => action$.pipe(
    ofType(REMOVE_TASK_SUCCESS),
    switchMap(({ id }) =>
        ajax.delete(apiUrl + '/' + id).pipe(
            map(parseRequest),
            map(() => removeTaskSuccess(id)),
            catchError(requestFailure)
        )
    )
);

export const updateTaskEpic = action$ => action$.pipe(
    ofType(REMOVE_TASK_SUCCESS),
    switchMap(({ id, title, description }) =>
        ajax.put(apiUrl + '/' + id, { id, title, description }, { 'Content-Type': 'application/json' }).pipe(
            map(parseRequest),
            map(updateTaskSuccess),
            catchError(requestFailure)
        )
    )
);

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_SUCCESS:
            return [
                ...action.tasks
            ];
        case ADD_TASK_SUCCESS:
            return [
                ...state,
                action.task
            ];
        case REMOVE_TASK_SUCCESS:
            return [ ...state ]
                .filter(task => task.id !== action.id);
        case UPDATE_TASK_SUCCESS:
            return [ ...state ]
                .map(task => task.id === action.task.id ? {
                    ...task,
                    ...action.task
                } : task);
        case REMOVE_COMPLETED_TASKS:
            return [
                ...state.filter(task => !task.completed)
            ];
        default:
            return state;
    }
};

