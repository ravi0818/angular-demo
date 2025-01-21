import { Component, computed, effect, inject, signal } from '@angular/core';
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
import { TodoItemComponent } from '@components/todo-item/todo-item.component';
import { TodoService } from '@services/todo.service';
import { Todo } from '@interface/todo';

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
  todos = computed(() => this.todoService.todos());

  readonly title = new FormControl('', [Validators.required]);
  readonly description = new FormControl('', [Validators.required]);
  readonly dueDate = new FormControl('', [Validators.required]);
  readonly dueTime = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  requiredError = 'This field is required';
  emailError = 'Please enter a valid email address';

  isEditing = signal(false);

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
      title: this.title.value ?? '',
      description: this.description.value ?? '',
      done: false,
      dueDate: new Date(this.dueDate.value ?? ''),
      dueTime: new Date(this.dueTime.value ?? ''),
      email: this.email.value ?? '',
    });

    this.title.reset();
    this.description.reset();
    this.dueDate.reset();
    this.dueTime.reset();
    this.email.reset();
  }

  onEditClick(todo: any) {
    // this.isEditing.set(true);
    // this.title.setValue(todo.title);
    // this.description.setValue(todo.description);
    // this.dueDate.setValue(todo.dueDate.toISOString());
    // this.dueTime.setValue(todo.dueTime.toISOString());
    // this.email.setValue(todo.email);
  }
}
