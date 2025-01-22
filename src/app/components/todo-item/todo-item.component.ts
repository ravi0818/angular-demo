import { Component, EventEmitter, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '@interface/todo';
import { TodoService } from '@services/todo.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';

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

  dialog = inject(MatDialog);

  toggleTodo = (todo: Todo) => {
    this.todoService.updateTodo({ ...todo, done: !todo.done });
  };

  deleteTodo = (todo: Todo) => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete this item?',
      },
    });

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.todoService.deleteTodo(todo);
    });
  };

  editTodo = (todo: Todo) => {
    this.onEditClick.emit(todo);
  };
}
