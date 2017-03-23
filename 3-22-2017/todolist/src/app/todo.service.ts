import { Checklistitem } from './checklistitem'

export class TodoService {
  private todos: Checklistitem[] = [
    new Checklistitem("test", "time", "a lot", 0),
    new Checklistitem("test2", "time2", "a lot2", 1)
  ]
  private numberChecks: number = 0;

  addCheckListItem(item: Checklistitem) {
    this.todos.push(item);
  }
  removeCheckListItem(item: Checklistitem){
    this.todos.splice(item.id, 1);
  }
  getAllItems() {
    return this.todos;
  }

  getCurrentID() {
    return this.numberChecks;
  }


}
