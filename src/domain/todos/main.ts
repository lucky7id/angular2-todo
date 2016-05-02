import {IAction} from '../../main';

export interface ITodosState {
    items: ITodo[];
}

export interface ITodo {
    created_at: string;
    last_updated?: string;
    id: number;
    name: string;
    body: string;
    status: string;
    isNew?: boolean;
}

const initialTodosState = {
    items: []
}


const ADD_TODO = 'ADD_TODO';

interface IAddTodo extends IAction {
    payload: ITodo;
}

export const addTodo = (todo: ITodo): IAddTodo => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

const onAddTodo = (state: ITodosState, action: IAddTodo): ITodosState => {
    let newTodos = [...state.items, action.payload];
    let newState = Object.assign({}, state, {items: newTodos});

    return newState;
}

export const todosReducer = (state: ITodosState = initialTodosState, action: IAction): ITodosState => {
    if (action.type === ADD_TODO) { return onAddTodo(state, action as IAddTodo); }

    return state;
}
