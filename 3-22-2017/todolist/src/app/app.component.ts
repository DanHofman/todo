import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TodoService } from './todo.service';
import { Checklistitem } from './checklistitem';


@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hidden = false;
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

    this.todoservice.addCheckListItem(new Checklistitem("this is completed", "soon", "non", 0))
    this.todoservice.addCheckListItem(new Checklistitem("this is very important", "now", "high", 0))
    this.todoservice.addCheckListItem(new Checklistitem("this is somewhat important", "soon", "medium", 0))
    this.todoservice.addCheckListItem(new Checklistitem("this isn't important", "whenever", "meh", 0))
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
}
