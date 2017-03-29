import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {TodoService } from './todo.service';
import { TooltipModule } from 'ng2-bootstrap';
import { PullTodoService } from './pull-todo.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    TooltipModule.forRoot()
  ],
  providers: [TodoService, PullTodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
