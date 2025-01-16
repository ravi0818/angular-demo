import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-todos',
  imports: [
    TodoItemComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTimepickerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todoService = inject(TodoService);

  todos = this.todoService.getTodos();

  readonly title = new FormControl('', [Validators.required]);
  readonly description = new FormControl('', [Validators.required]);
  readonly dueDate = new FormControl('', [Validators.required]);
  readonly dueTime = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  requiredError = 'This field is required';
  emailError = 'Please enter a valid email address';

  validateForm() {
    if (
      this.title.invalid ||
      this.description.invalid ||
      this.dueDate.invalid ||
      this.dueTime.invalid ||
      this.email.invalid
    ) {
      return false;
    } else {
      return true;
    }
  }

  addTodoItem() {
    if (!this.validateForm()) return;
    this.todoService.addTodo({
      id: this.todos.length + 1,
      title: this.title.value ?? '',
      description: this.description.value ?? '',
      done: false,
      dueDate: this.dueDate.value ?? '',
      dueTime: this.dueTime.value ?? '',
      email: this.email.value ?? '',
    });

    this.title.reset();
    this.description.reset();
    this.dueDate.reset();
    this.dueTime.reset();
    this.email.reset();
  }
}
