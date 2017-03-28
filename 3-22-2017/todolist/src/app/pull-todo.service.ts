import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Checklistitem } from './checklistitem';

@Injectable()
export class PullTodoService {
  constructor(private http: Http) { }
  replaceTodos(todos: Checklistitem[]) {
    return this.http.put('https://todo-d3951.firebaseio.com/data.json', todos);
  }
  addTodos(todos: Checklistitem[]) {
    return this.http.post('https://todo-d3951.firebaseio.com/data.json', todos);
  }
  getTodos() {
    return this.http.get('https://todo-d3951.firebaseio.com/data.json');
  }
}
