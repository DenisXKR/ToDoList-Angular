import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskModel } from './models/taskmodel';

const StorageKey = 'ToDoList';

@Injectable()
export class DataService {

  private dataSource: BehaviorSubject<TaskModel[]>;
  private task: BehaviorSubject<TaskModel>;

  public currentData: Observable<TaskModel[]>;
  public currentTask: Observable<TaskModel>;

  constructor() {
    let taskList: TaskModel[];

    if (localStorage[StorageKey]) {
      try {
        taskList = JSON.parse(localStorage[StorageKey], this.dateTimeReviver);
      } catch (ex) {
        console.log('Error parsing data');
        taskList = [];
      }
    }

    this.dataSource = new BehaviorSubject(taskList);
    this.currentData = this.dataSource.asObservable();

    this.dataSource.subscribe((val) => {
      this.saveData(val);
    });
  }

  protected dateTimeReviver(key, value) {
    if (key === 'date') {
      return new Date(value);
    }
    return value;
  }

  public addTask(task: TaskModel) {
    const taskList = this.dataSource.value;
    taskList.push(task);
    this.dataSource.next(taskList);
  }

  public delTask(task: TaskModel) {
    const taskList = this.dataSource.value;
    const index = taskList.findIndex((value) => {
      return ( // shitcode since we don't have an id
        value.title === task.title &&
        value.date === task.date &&
        value.state === task.state);
    });

    taskList.splice(index, 1);
    this.dataSource.next(taskList);
  }

  public setCurrentTask(task: TaskModel): Observable<TaskModel> {
    this.task = new BehaviorSubject(task);
    this.currentTask = this.task.asObservable();
    return this.currentTask;
  }

  public updateCurrentTask(task: TaskModel) {
    const originalTask = this.task.value;
    const _task = this.dataSource.value.find((value) => {
      return ( // shitcode since we don't have an id
        value.title === originalTask.title &&
        value.date === originalTask.date &&
        value.state === originalTask.state);
    });

    if (_task) {
      _task.date = task.date;
      _task.state = task.state;
      _task.title = task.title;
    }

    this.saveData(this.dataSource.value);
  }

  private saveData(data: any) {
    localStorage[StorageKey] = JSON.stringify(data);
  }
}
