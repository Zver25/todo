const OPEN_TASK_EDIT_MODAL = 'OPEN_TASK_EDIT_MODAL';
const CHANGE_FIELD_TASK_EDIT_MODAL = 'CHANGE_FIELD_TASK_EDIT_MODAL';
const CLOSE_TASK_EDIT_MODAL = 'CLOSE_TASK_EDIT_MODAL';

export const openTaskEditModal = (id, title, description) =>
    ({ type: OPEN_TASK_EDIT_MODAL, id, title, description });
export const changeFieldTaskEditModal = (changedFields) => ({ type: CHANGE_FIELD_TASK_EDIT_MODAL, changedFields });
export const closeTaskEditModal = () => ({ type: CLOSE_TASK_EDIT_MODAL });

const initialState = {
    isOpen: false,
    id: 0,
    title: { value: '' },
    description: { value: '' },
};

export const taskEditModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_TASK_EDIT_MODAL:
            return {
                ...state,
                isOpen: true,
                id: action.id,
                title: { value: action.title },
                description: { value: action.description }
            };
        case CHANGE_FIELD_TASK_EDIT_MODAL:
            return {
                ...state,
                ...action.changedFields
            };
        case CLOSE_TASK_EDIT_MODAL:
            return {
                ...state,
                isOpen: false
            };
        default:
            return state;
    }
};
