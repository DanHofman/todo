import { Component, OnInit, Input, Output, EventEmitter, trigger, state, style, HostListener, transition, animate } from '@angular/core';

import { Checklistitem } from '../checklistitem';

import { TodoService } from '../todo.service';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  animations: [
    trigger('todoStatus', [
      state('highlighted', style({
        // background: '#5E5E5C',
        background: '#2AE000',
        border: '1px solid #302EA3',
      })),
      state('unhighlighted', style({
        background: '#DADAD5',
        border: '0px'
      })
      ),
      transition(':enter', [style({ background: '#1546FF'}),animate('2000ms')]),
      transition(':leave', animate('500ms', style({ background: "red"}))),
      transition('unhighlighted <=> highlighted', animate('500ms'))
  ])
  ]
})

export class TodoItemComponent {
  @Input() todoItem: Checklistitem;
  @Output() delete = new EventEmitter();
  @Output() complete = new EventEmitter();
  @Output() changeImport = new EventEmitter();
  todoStatus: string = 'unhighlighted';
  
  toggleHighlighted(highlighted: boolean){
    this.todoStatus = highlighted ? 'highlighted' : 'unhighlighted';
  }
  changeImportance(id: number, importance: string) {
    this.changeImport.emit([id, importance]);
  }
  onDelete(id: number) {
    this.delete.emit(id);
  }
  onCompleted(id: number) {
    this.complete.emit(id);
  }
}
