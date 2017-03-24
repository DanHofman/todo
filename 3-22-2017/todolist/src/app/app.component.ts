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
  importance = ["high", "medium", "meh"];

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
    // this.todoservice.addCheckListItem(new Checklistitem("this is very important", "now", "high", 0))
    // this.todoservice.addCheckListItem(new Checklistitem("this is somewhat important", "soon", "medium", 0))
    // this.todoservice.addCheckListItem(new Checklistitem("this isn't so important", "I dunno", "meh", 0))
  }

  onDelete(id){
    this.todoservice.removeCheckListItem(id);
  }

  onSubmit(newtodo){
   let newChecklistItem: Checklistitem = new Checklistitem(newtodo.name, newtodo.time, newtodo.importance, this.todoservice.getLength());
   this.todoservice.addCheckListItem(newChecklistItem);
   this.formed.reset();
  }
}
