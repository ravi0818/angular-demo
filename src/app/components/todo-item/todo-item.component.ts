import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  todoService = inject(TodoService);
  todo = input.required<Todo>();

  toggleTodo = (todo: Todo) => {
    this.todoService.updateTodo({ ...todo, done: !todo.done });
  };
}
