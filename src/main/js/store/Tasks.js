const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const COMPLETE_TASK = 'COMPLETE_TASK';
const REMOVE_COMPLETED_TASKS = 'REMOVE_COMPLETED_TASKS';
const TEST_TASK = 'TEST_TASK';

export const addTask = (title, description, deadline) => ({ type: ADD_TASK, title, description, deadline });
export const removeTask = (id) => ({type: REMOVE_TASK, id});
export const updateTask = (id, title, description, deadline) => ({ type: UPDATE_TASK, id, title, description, deadline });
export const completeTask = (id) => ({ type: COMPLETE_TASK, id });
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

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST_TASK:
            return [
                ...state.map(task => task.id === '1' ? {
                    ...task,
                    deadline: (moment().unix() - 1)
                } : task)
            ];
        case ADD_TASK:
            return [
                ...state,
                {
                    id: uuid(),
                    completed: false,
                    title: action.title,
                    description: action.description
                }
            ];
        case REMOVE_TASK:
            return [...state].filter(task => task.id !== action.id);
        case UPDATE_TASK:
            return [
                ...state
            ].map(task => task.id === action.id ? {
                ...task,
                title: action.title,
                description: action.description,
            } : task);
        case COMPLETE_TASK:
            return [
                ...state
            ].map(task => task.id === action.id ? {
                ...task,
                completed: !task.completed
            } : task);
        case REMOVE_COMPLETED_TASKS:
            return [
                ...state.filter(task => !task.completed)
            ];
        default:
            return state;
    }
};

