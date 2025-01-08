import { Component, signal } from '@angular/core';
import { CounterComponent } from '../components/counter/counter.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CounterComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  counter = signal(5);
  value = 10;
  message = 'Hello World!';
  inputValue = '';
}
