import { Component, OnInit } from '@angular/core';
import { TaskModel, TaskState } from '../models/taskmodel';
import { Router } from '@angular/router';
import { DataService } from '../DataService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public filter: string;
  public taskList: TaskModel[];

  constructor(
    private data: DataService,
    private router: Router
  ) {
    this.filter = '';
  }

  ngOnInit() {
    this.data.currentData.subscribe(data => this.taskList = data);
  }

  public getTaskDateColor(task: TaskModel): string {
    const date = new Date(task.date);
    if (date < new Date()) { return 'red'; }
    if (date < this.addDays( new Date(), 7)) { return 'orange'; }
    return 'black';
  }

  public addTask() {
    this.router.navigateByUrl('/newtask');
  }

  public editTask(task: TaskModel): void {
    this.data.setCurrentTask(task);
    this.router.navigateByUrl('/edittask');
  }

  public compliteTask(task: TaskModel, event: any) {
    task.state = TaskState.Complite;
    this.data.delTask(task);
    event.stopPropagation();
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
