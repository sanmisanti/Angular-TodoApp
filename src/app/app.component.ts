import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  welcome = 'todo-app';
  tasks = [
    "Instalar el Angular CLI",
    "Crear el proyecto",
    "Crear componentes"
  ]
}
