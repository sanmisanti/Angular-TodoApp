
import { Component, computed, effect, inject, Injector, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


import { Task} from '../../models/task.model'
import { combineLatest } from 'rxjs';
import { NonNullAssert } from '@angular/compiler';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([]);
  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if (filter === 'pending'){
      return tasks.filter(task => !task.completed)
    }
    if (filter === 'completed'){
      return tasks.filter(task => task.completed)
    }
    return tasks;
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  injector = inject(Injector)


  ngOnInit(){
    const tasks = localStorage.getItem('tasks');
    if (tasks){
      this.tasks.set(JSON.parse(tasks))
    }
    this.trackTasks();
  }

  trackTasks (){
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, {injector: this.injector})
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

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter)
  }
}
