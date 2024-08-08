import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


import { Task} from '../../models/task.model'
import { combineLatest } from 'rxjs';
import { NonNullAssert } from '@angular/compiler';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  constructor(){
    this.newTaskCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
  }


  changeHandler(){
    if (this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      if (value !== ''){
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
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

  updateTask(index: number){
    this.tasks.update((tasks) => tasks.map((task, i) => i === index ? {...task, completed: !task.completed} : task))
  }
  updateTaskEditingMode(index: number){
    this.tasks.update((tasks) => tasks.map((task, i) => i === index ? {...task, editing: true} : {...task, editing: false}))
  }
  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement
    this.tasks.update((tasks) => tasks.map((task, i) => i === index ? {...task, title: input.value, editing: false} : task))
  }
}
