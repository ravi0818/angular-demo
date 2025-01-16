import { Injectable } from '@angular/core';
import { Todo } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  constructor() {}

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  updateTodo(todo: Todo): void {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    this.todos[index] = todo;
  }
}
