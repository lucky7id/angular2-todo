import {Component, Inject} from 'angular2/core';
import {IAppState, AppState, store} from '../main';



@Component({
    template: `
        <div> Hello from Angular </div>
        <div>{{state.todos.items.length}}</div>
        <span *ngFor="let todo of state.todos.items">{{todo.body}} {{todo.id}}</span>`,
    selector: '.app'
})
export class App {
    app = new AppState();
    constructor(public state = { todos: { items: [] } }) {
        this.app.subscribe(state => { this.state = state; })
    }

    lol() {

    }
}
