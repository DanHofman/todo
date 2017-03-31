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
        background: '#ECF2ED',
        transform: 'scale(1.2)',
        'z-index': '1'
      })),
      state('unhighlighted', style({
        background: '#DADAD5',
        border: '0px',
        transform: 'scale(1)',
        'z-index': '0'
        })
      ),
      transition(':enter', [
        style({ background: '#1546FF', transform: 'scale(1.2)'}),animate('750ms')]),
      transition('* => void', animate('1500ms', style({ background: "red"}))),
      transition('unhighlighted <=> highlighted', animate('500ms ease-out'))
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
