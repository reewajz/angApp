import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InMemoryTask } from '../components/InMemoryTask';
import { Task } from '../interfaces/Tasks';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks'

  constructor(private readonly httpClient: HttpClient) { }

  getTasks(): Observable<Array<Task>> {
    return this.httpClient.get<Array<Task>>(this.apiUrl);
  }

  deleteTask(task: Task) {
    const url = `${this.apiUrl}/${task.id}`;
    return this.httpClient.delete(url);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.apiUrl, task, httpOptions);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.httpClient.put<Task>(url, task, httpOptions);
  }
}
