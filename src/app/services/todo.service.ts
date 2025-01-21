import { inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Todo } from '@interface/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  firestore = inject(Firestore);

  todos = signal<Todo[]>([]);

  constructor() {
    const itemCollection = collection(this.firestore, 'todos');
    collectionData<any>(itemCollection, { idField: 'id' }).subscribe(
      (data: any[]) => {
        this.todos.set(this.formatData(data));
      }
    );
  }

  private formatTimestamp(seconds: number): Date {
    return new Date(seconds * 1000);
  }

  private formatData(data: any): Todo[] {
    return data.map((item: any) => ({
      id: item.id ?? '',
      title: item.title ?? '',
      description: item.description ?? '',
      done: item.done ?? '',
      email: item.email,
      dueDate: this.formatTimestamp(item.dueDate.seconds) ?? '',
      dueTime: this.formatTimestamp(item.dueTime.seconds) ?? '',
    }));
  }

  async addTodo(todo: Todo) {
    try {
      const itemCollection = collection(this.firestore, 'todos');
      const docRef = await addDoc(itemCollection, todo);
      await updateDoc(docRef, { id: docRef.id });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async updateTodo(todo: Todo) {
    try {
      if (!todo.id) {
        return;
      }
      const todoDoc = doc(this.firestore, `todos/${todo.id}`);
      await updateDoc(todoDoc, { ...todo });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  async deleteTodo(todo: Todo) {
    try {
      if (!todo.id) {
        return;
      }
      const todoDoc = doc(this.firestore, `todos/${todo.id}`);
      await deleteDoc(todoDoc);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
}
