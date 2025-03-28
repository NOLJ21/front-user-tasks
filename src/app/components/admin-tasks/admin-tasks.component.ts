import {Component, OnInit} from '@angular/core';
import { Task } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskDto } from 'src/app/models/task-dto';
import {Observable} from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import {AddTaskComponent} from "../add-task/add-task.component";

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit{
  tasks: Task[] = [];
  task: Task | undefined;
  taskDto: TaskDto | undefined;
  email: string = '';
  taskId: number = 0;
  tareas$: Observable<any[]>;

  constructor(private tasksService: TasksService, private router: Router, private dialog: MatDialog) {
    this.tareas$ = this.tasksService.tareas$;
  }

  ngOnInit(): void {
    this.email = window.sessionStorage.getItem("email") || '';
    this.tasksService.cargarTareasAdmin();

    // Subscribe to the observable to get the tasks
    this.tareas$.subscribe((tasks: Task[]) => {
      console.log("Tasks:", tasks);
    });
  }

  cambiarEstadoAdelante(tarea: any) {
    this.tasksService.cambiarEstadoAdelante(tarea.id, this.email).subscribe();
  }

  cambiarEstadoAtras(tarea: any) {
    this.tasksService.cambiarEstadoAtras(tarea.id, this.email).subscribe();
  }

  getProgreso(estadoTarea: string): number {
    switch (estadoTarea) {
      case 'PENDIENTE': return 33;
      case 'EN_PROGRESO': return 66;
      case 'COMPLETADA': return 100;
      default: return 0;
    }
  }

  logout() {
    console.log("Logout clicked");
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  abrirDialogoAgregarTarea() {
    this.dialog.open(AddTaskComponent, {
      width: '400px'
    });
  }
}
