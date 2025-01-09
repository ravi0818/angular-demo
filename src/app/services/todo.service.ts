import { Injectable } from '@angular/core';
export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Purchase vegetables, fruits, milk, and bread for the week.',
      done: false,
    },
    {
      id: 2,
      title: 'Complete project report',
      description: 'Finish and submit the quarterly project report by Friday.',
      done: false,
    },
    {
      id: 3,
      title: 'Workout session',
      description:
        'Attend the gym for a 1-hour workout focusing on cardio and strength.',
      done: true,
    },
    {
      id: 4,
      title: 'Call mom',
      description: 'Catch up with mom and check on her health and well-being.',
      done: false,
    },
    {
      id: 5,
      title: 'Schedule dentist appointment',
      description:
        'Book an appointment for a routine dental cleaning next week.',
      done: false,
    },
    {
      id: 6,
      title: 'Prepare for meeting',
      description:
        'Review slides and practice the presentation for the client meeting.',
      done: false,
    },
    {
      id: 7,
      title: 'Pay utility bills',
      description:
        'Settle electricity, water, and internet bills before the due date.',
      done: true,
    },
    {
      id: 8,
      title: 'Plan weekend trip',
      description:
        'Research destinations, book a hotel, and create an itinerary for the weekend getaway.',
      done: false,
    },
    {
      id: 9,
      title: 'Read a book',
      description: 'Finish reading the last 3 chapters of "Atomic Habits."',
      done: false,
    },
    {
      id: 10,
      title: 'Organize workspace',
      description: 'Declutter and clean the desk area for better productivity.',
      done: false,
    },
  ];

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
