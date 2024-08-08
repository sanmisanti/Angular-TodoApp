import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'todo-app';
  tasks = signal([
    "Instalar el Angular CLI",
    "Crear el proyecto",
    "Crear componentes",
    "Crear servicio"
  ]);
  name = signal("Santiago");
  age = 23;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = signal({
    name: "santiago",
    age: 23,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable:true,
  });
  nameCtrl = new FormControl(50, {
    nonNullable:true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });


  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
  }

  clickHandler() {
    alert("Hola")
  }

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value
    this.name.set(newValue)
  }
  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value
    this.person.update(p => {
      return {
        ...p,
        age: parseInt(newValue)
      }
    })
  }
  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value
    this.person.update(p => {
      return {
        ...p,
        name: newValue
      }
    })
  }
  keyDownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value)
  }
}
