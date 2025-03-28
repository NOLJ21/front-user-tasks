import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  email: string = window.sessionStorage.getItem("email") || '';
  tarea = { titulo: '', descripcion: '', email: this.email};

  constructor(
    protected dialogRef: MatDialogRef<AddTaskComponent>,
    private tareaService: TasksService
  ) {}

  agregarTarea() {
    this.tareaService.agregarTarea(this.tarea);
    this.dialogRef.close();
  }

}
