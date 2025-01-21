import { Component, EventEmitter, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '@interface/todo';
import { TodoService } from '@services/todo.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  todoService = inject(TodoService);
  todo = input.required<Todo>();

  onEditClick = output<Todo>();

  toggleTodo = (todo: Todo) => {
    this.todoService.updateTodo({ ...todo, done: !todo.done });
  };

  deleteTodo = (todo: Todo) => {
    this.todoService.deleteTodo(todo);
  };

  editTodo = (todo: Todo) => {
    this.onEditClick.emit(todo);
  };
}
