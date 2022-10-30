import { Component, OnInit } from '@angular/core';
import { InMemoryTask } from "../InMemoryTask";
import { Task } from "../../interfaces/Tasks";
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  Tasks!: Array<Task>;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.Tasks = tasks);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => this.Tasks.filter((item) => item.id !== task.id))
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addNewTask(task: Task) {
    this.taskService.addTask(task).subscribe((newTask) => this.Tasks.push(newTask));
  }

}
