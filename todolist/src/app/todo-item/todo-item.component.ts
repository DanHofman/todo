import { Component, OnInit, AfterContentInit, Input, Output, EventEmitter, trigger, state, style, HostListener, transition, animate } from '@angular/core';

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
        transform: 'scale(1.05) translateX(20px)',
        'z-index': '1'
      })),
      state('unhighlighted', style({
        background: '#DADAD5',
        border: '0px',
        transform: 'scale(1)',
        'z-index': '0'
        })
      ),
      transition('* => void', animate('1500ms', style({ background: "red"}))),
      transition(':enter', [
        style({ transform: 'scale(0.85)'}),animate('250ms')]),  
      transition('unhighlighted <=> highlighted', animate('200ms ease-out'))
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
    this.todoStatus = 'unhighlighted';
  }
}
