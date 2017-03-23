import { Component, OnInit  } from '@angular/core';
import { TodoService } from './todo.service';

import { Checklistitem } from './checklistitem';
import {FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formed;

  todo: Checklistitem[];
  constructor(private todoservice: TodoService) {
    this.todo = this.todoservice.getAllItems();
  }

  ngOnInit(){
    this.formed = new FormGroup({
      name: new FormControl(''),
      time: new FormControl(''),
      importance: new FormControl('')
    });
  }

  onSubmit(newtodo){
   let newChecklistItem: Checklistitem = new Checklistitem(newtodo.name, newtodo.time, newtodo.importance, this.todoservice.getCurrentID());
   this.todoservice.addCheckListItem(newChecklistItem);
  }
}
