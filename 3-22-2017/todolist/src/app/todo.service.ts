import { Checklistitem } from './checklistitem'

export class TodoService {
  private todos: Checklistitem[] = [];

  addCheckListItem(item: Checklistitem) {
    this.todos.push(item);
    this.reNumberTodoList();
  }
  removeCheckListItem(id: number){
    this.todos.splice(id, 1);
    this.reNumberTodoList();
  }
  getAllItems() {
    return this.todos;
  }
  reNumberTodoList() {
    for(var i = 0; i < this.todos.length; i++) {
      this.todos[i].id = i;
    }
  }
  getLength() {
    return this.todos.length;
  }
}
