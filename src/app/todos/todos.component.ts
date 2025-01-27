import {
  Component,
  computed,
  effect,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomDialogComponent } from '@components/custom-dialog/custom-dialog.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  BreakpointObserver,
  BreakpointState,
  LayoutModule,
} from '@angular/cdk/layout';

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
    CommonModule,
    MatCardModule,
    LayoutModule,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todoService = inject(TodoService);
  breakpointObserver = inject(BreakpointObserver);
  todos = computed(() => this.todoService.todos());

  readonly title = new FormControl('', [Validators.required]);
  readonly description = new FormControl('', [Validators.required]);
  readonly dueDate = new FormControl('', [Validators.required]);
  readonly dueTime = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  requiredError = 'This field is required';
  emailError = 'Please enter a valid email address';

  @ViewChild('todoFormTemplate')
  todoFormTemplate!: TemplateRef<any>;

  dialogRef!: MatDialogRef<CustomDialogComponent, any>;

  dialog = inject(MatDialog);

  isEditingMode = signal(false);

  isMobileView = signal(false);

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 640px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobileView.set(false);
        } else {
          this.isMobileView.set(true);
        }
      });
  }

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

  resetFormFields() {
    this.title.reset();
    this.description.reset();
    this.dueDate.reset();
    this.dueTime.reset();
    this.email.reset();
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

    this.dialogRef.close();
  }

  updateTodoItem(todoId: string) {
    if (!this.validateForm()) return;
    this.todoService.updateTodo({
      id: todoId,
      title: this.title.value ?? '',
      description: this.description.value ?? '',
      done: false,
      dueDate: new Date(this.dueDate.value ?? ''),
      dueTime: new Date(this.dueTime.value ?? ''),
      email: this.email.value ?? '',
    });

    this.dialogRef.close();
  }

  openAddDialog() {
    this.dialogRef = this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Add Todo',
        body: this.todoFormTemplate,
      },
      width: this.isMobileView() ? '90%' : '30%',
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.resetFormFields();
      this.isEditingMode.set(false);
    });
  }

  openEditDialog(todo: any) {
    this.isEditingMode.set(true);
    this.title.setValue(todo.title);
    this.description.setValue(todo.description);
    this.dueDate.setValue(todo.dueDate.toISOString());
    this.dueTime.setValue(todo.dueTime.toISOString());
    this.email.setValue(todo.email);

    this.dialogRef = this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Edit Todo',
        body: this.todoFormTemplate,
        data: todo,
      },
      width: this.isMobileView() ? '90%' : '30%',
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.resetFormFields();
      this.isEditingMode.set(false);
    });
  }
}
