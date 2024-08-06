import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { Task} from '../../models/task.model'
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: "Instalar el Angular CLI",
      completed: false
    },
    {
      id: Date.now(),
      title: "Crear el proyecto",
      completed: false
    },
    {
      id: Date.now(),
      title: "Crear componentes",
      completed: false
    },
    {
      id: Date.now(),
      title: "Crear servicio",
      completed: false
    }
  ]);

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask)
  }

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    }
    this.tasks.update((tasks) => [...tasks, newTask])
  }

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index))
  }

  toggleCompleteTask(index: number){
    this.tasks.update((tasks) => tasks.map((task, i) => i === index ? {...task, completed: !task.completed} : task))
  }
}
