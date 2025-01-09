import { Component, inject, input } from '@angular/core';
import { Todo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  imports: [],
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
