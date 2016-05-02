import {combineReducers, createStore, Store, applyMiddleware} from 'redux';
import {Injectable, Inject, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import thunk from 'redux-thunk';
import {ITodosState, todosReducer, addTodo} from './domain/todos/main';
import {App} from './ui/main';
import {} from 'rxjs';




export interface IAction {
    type: string;
    payload?: any;
    meta?: any;
    errors?: any;
}

export interface IAppState {
    todos: ITodosState;
}

const initialAppState = {
    todos: undefined
}

const appReducer = combineReducers({
    todos: todosReducer
});

export const store = createStore(appReducer, initialAppState, applyMiddleware(thunk));

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);

store.dispatch(addTodo({
    id: new Date().getTime(),
    name: 'Bootstrap',
    body: 'Test if this is working',
    created_at: new Date().toString(),
    status: 'new'
}))



export class AppState {
    private store

    private bound

    public state: IAppState;

    constructor() {
        this.observeState();
    }

    getState() {
        return this.store.getState();
    }

    dispatch(action) {
        return this.store.dispatch(action);
    }

    subscribe(listener: Function) {
        //return this.store.subscribe(() => listener(this.getState()));
    }

    getObservable() {
        return this.state || this.observeState()
    }

    observeState() {

    }
}



let app = bootstrap​(App);

setInterval(() => {
    store.dispatch(addTodo({
        id: new Date().getTime(),
        name: 'Bootstrap',
        body: 'Test if this is working',
        created_at: new Date().toString(),
        status: 'new'
    }))
}, 5000)
