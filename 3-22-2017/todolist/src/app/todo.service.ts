import { Checklistitem } from './checklistitem'

export class TodoService {
  private todos: Checklistitem[] = [];
  private types: string[] = [
    "Work",
    "Projects",
    "Personal"
  ];

  getChecklistItem(id: number){
    return this.todos[id];
  }
  addCheckListItem(item: Checklistitem) {
    this.todos.push(item);
    this.reOrderTodosAfterSort();
  }
  removeCheckListItem(id: number){
    this.todos.splice(id, 1);
    this.reOrderTodosAfterSort();
  }
  completeCheckListItem(id: number) {
    this.todos[id].importance = "non";
    this.reOrderTodosAfterSort();
  }
  getAllItems() {
    this.reOrderTodosAfterSort();
    return this.todos;
  }
  reOrderTodosAfterSort(){
    this.todos = this.sortTodo(this.todos);
    for(var i = 0; i < this.todos.length; i ++){
      this.todos[i].id = i;
    }
  }
  sortTodo(todos) {
    if(todos.length < 2){
      return todos;
    }
    var middle = todos.length / 2;
    var left = todos.slice(0, middle);
    var right = todos.slice(middle, todos.length);

    return this.mergeTodoafterSorting(this.sortTodo(left), this.sortTodo(right));
  }
  mergeTodoafterSorting(lefttodo, righttodo){
    var resulting = [];

    while (lefttodo.length && righttodo.length){
      if(lefttodo[0].importance == "non" ){
        resulting.push(righttodo.shift());    
      }else if(righttodo[0].importance == "non" ){
        resulting.push(lefttodo.shift());
      }else if (lefttodo[0].importance == "high"){
        resulting.push(lefttodo.shift());
      } else if (righttodo[0].importance == "high") {
        resulting.push(righttodo.shift());
      } else if (lefttodo[0].importance == "medium" && righttodo[0].importance != "high" && righttodo[0].importance != "medium"){
        resulting.push(lefttodo.shift());
      } else if (righttodo[0].importance == "medium" && lefttodo[0].importance != "high" && lefttodo[0].importance != "medium"){
        resulting.push(righttodo.shift());
      } else {
        resulting.push(lefttodo.shift());
      }
      }while (lefttodo.length){
        resulting.push(lefttodo.shift());
      }while (righttodo.length){
        resulting.push(righttodo.shift());
      }
      return resulting;   
  }
  getLength() {
    return this.todos.length;
    }
  }
