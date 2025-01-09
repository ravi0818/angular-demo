import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos',
  imports: [
    TodoItemComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todoService = inject(TodoService);

  todos = this.todoService.getTodos();

  titleValue = signal('');
  descriptionValue = signal('');

  addTodoItem() {
    if (!this.titleValue() || !this.descriptionValue()) return;
    this.todoService.addTodo({
      id: this.todos.length + 1,
      title: this.titleValue(),
      description: this.descriptionValue(),
      done: false,
    });

    this.titleValue.set('');
    this.descriptionValue.set('');
  }
}
