import { Component, OnInit, Input } from '@angular/core';
import { Checklistitem } from '../checklistitem';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todoItem: Checklistitem;

}
