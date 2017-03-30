import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TodoService } from './todo.service';
import { PullTodoService } from './pull-todo.service';
import { Checklistitem } from './checklistitem';


@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todo: Checklistitem[] = [];
  private activeType = 'All';
  private storedToDos: Checklistitem[] = [];
  private hidden = false;
  private formed;
  private importance = [
    "high",
    "medium",
    "meh",
     ];
  private types: string[] = [
    "Projects",
    "Work",
    "Personal"
  ];
  
  constructor(private todoservice: TodoService, private TodoDbService: PullTodoService) {
    this.todoservice.getToDosFromDb();
  }

  ngOnInit(){
    this.formed = new FormGroup({
      name: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      importance: new FormControl('high'),
      type: new FormControl('Projects')
    });
    
  }

    // this.todoservice.addCheckListItem(new Checklistitem("this is completed", "soon", "non", 0))
    // this.todoservice.addCheckListItem(new Checklistitem("this is very important", "now", "high", 0))
    // this.todoservice.addCheckListItem(new Checklistitem("this is somewhat important", "soon", "medium", 0))
    // this.todoservice.addCheckListItem(new Checklistitem("this isn't important", "whenever", "meh", 0))
    // this.todo = this.todoservice.getAllItems();
  
  getNamesOfChecklistItems(todos: Checklistitem[]){
    var names: string[] = []
    for(var check in todos){
      names.push(todos[check].name);
    }
    return names;
  }
  onDelete(id){
    this.todoservice.removeCheckListItem(id);
    this.todo = this.todoservice.getToDoByType(this.activeType);
  }
  onCompleted(id){
    this.todoservice.completeCheckListItem(id);
    this.todo = this.todoservice.getToDoByType(this.activeType);
  }
  onSubmit(newtodo){
   let newChecklistItem: Checklistitem = new Checklistitem(newtodo.name, newtodo.time, newtodo.importance, 0);
   newChecklistItem.type = newtodo.type;
   this.todoservice.addCheckListItem(newChecklistItem);
   this.getTodosByType(this.activeType);
   this.formed.reset();
  }
  changeToMed(id: number) {
    this.todoservice.getChecklistItem(id).importance = "medium";
    console.log(this.todoservice.getChecklistItem(id));
    this.todo = this.todoservice.getAllItems();
  }
  changeToHigh(id: number) {
    this.todoservice.getChecklistItem(id).importance = "high";
    console.log(this.todoservice.getChecklistItem(id));
    this.todo = this.todoservice.getAllItems();
    }
  changeToMeh(id: number) {
    this.todoservice.getChecklistItem(id).importance = "meh";
    console.log(this.todoservice.getChecklistItem(id));
    this.todo = this.todoservice.getAllItems();
  }
  hideMessage(element){
    if(this.hidden){
      element.style.display = "";
      this.hidden = false;
      let arrow = document.getElementById("arrow")
      arrow.className = "glyphicon glyphicon-chevron-up";
      arrow.style.opacity = "1";
    } else {
      element.style.display = "none";
      this.hidden = true;
      let arrow = document.getElementById("arrow")
      arrow.className = "glyphicon glyphicon-chevron-down";
      arrow.style.opacity = "0.43";
    }
  }
  saveTodosToDb() {
    this.todoservice.saveToDosToDb()
  }
  getTodosByType(type: string) {
    this.activeType = type;
    this.todo = this.todoservice.getToDoByType(type);
  }

  loadAllTodos() {
    this.todo = this.todoservice.getAllItems();
    this.activeType = 'All';
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('main-todo').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>ToDo</title>
          <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" >
          <link href="https://fonts.googleapis.com/css?family=Droid+Sans" rel="stylesheet">
          <link rel="stylesheet" href="src/app/app.component.css">
          <style>
            .btn {
              display: none;
            }
          </style>   
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
