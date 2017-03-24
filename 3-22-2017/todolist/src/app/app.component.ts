import { Component, OnInit  } from '@angular/core';
import { TodoService } from './todo.service';

import { Checklistitem } from './checklistitem';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formed;
  importance = ["high", "medium", "meh", "non"];

  todo: Checklistitem[];
  constructor(private todoservice: TodoService) {
    this.todo = this.todoservice.getAllItems();
  }

  ngOnInit(){
    this.formed = new FormGroup({
      name: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      importance: new FormControl('', Validators.required)
    });

    this.todoservice.addCheckListItem(new Checklistitem("this is somewhat important", "soon", "medium", 0))
    this.todoservice.addCheckListItem(new Checklistitem("this is very important", "now", "high", 0))
    this.todoservice.addCheckListItem(new Checklistitem("this is somewhat important", "soon", "medium", 0))
    this.todoservice.addCheckListItem(new Checklistitem("this is very important", "now", "high", 0))
    this.todo = this.todoservice.getAllItems();
  }

  onDelete(id){
    this.todoservice.removeCheckListItem(id);
    this.todo = this.todoservice.getAllItems();
  }
  onCompleted(id){
    this.todoservice.completeCheckListItem(id);
    this.todo = this.todoservice.getAllItems();
  }
  onSubmit(newtodo){
   let newChecklistItem: Checklistitem = new Checklistitem(newtodo.name, newtodo.time, newtodo.importance, this.todoservice.getLength());
   this.todoservice.addCheckListItem(newChecklistItem);
   this.todo = this.todoservice.getAllItems();
   this.formed.reset();
  }
}
