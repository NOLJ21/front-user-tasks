import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject, tap} from 'rxjs';
import { environment } from 'src/environment/environment';
import { TaskDto } from '../models/task-dto';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = environment.apiUrl + '/tareas';
  // BehaviorSubject almacena el estado actual de las tareas
  private tareasSubject = new BehaviorSubject<any[]>([]);
  tareas$ = this.tareasSubject.asObservable(); // Observable que los componentes pueden suscribirse

  constructor(private http: HttpClient) {}

  cargarTareasUser(email:string) {
    this.http.get<Task[]>(this.baseUrl + '/' + email)
      .pipe(tap(tareas => this.tareasSubject.next(tareas)))
      .subscribe();
  }

  cargarTareasAdmin() {
    this.http.get<Task[]>(this.baseUrl)
      .pipe(tap(tareas => this.tareasSubject.next(tareas)))
      .subscribe();
  }

  cambiarEstadoAdelante(tareaId: number, email: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${tareaId}/estadoAdelante`, null, {
      params: { id: tareaId.toString(), email: email }
    }).pipe(
      tap((nuevaTarea:any) => {
        const tareasActuales = this.tareasSubject.value.map(tarea =>
          tarea.id === nuevaTarea.id ? nuevaTarea : tarea
        );
        this.tareasSubject.next(tareasActuales);
      })
    );
  }

  cambiarEstadoAtras(tareaId: number, email: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${tareaId}/estadoAtras`, null, {
      params: { id: tareaId.toString(), email: email }
    }).pipe(
      tap((nuevaTarea:any) => {
        const tareasActuales = this.tareasSubject.value.map(tarea =>
          tarea.id === nuevaTarea.id ? nuevaTarea : tarea
        );
        this.tareasSubject.next(tareasActuales);
      })
    );
  }

  agregarTarea(tarea: { titulo: string; descripcion: string; email: string}) {
    console.log("agregarTarea", tarea);
    this.http.post<Task>('http://localhost:8080/tareas/create', null, {
      params: { titulo: tarea.titulo, descripcion: tarea.descripcion, email: tarea.email }
    }).subscribe(
      (tareaCreada) => {
        const tareasActuales = this.tareasSubject.value;
        this.tareasSubject.next([...tareasActuales, tareaCreada]); // Actualiza el estado local
      },
      (error) => {
        console.error("Error al agregar tarea", error);
      }
    );
  }
}
