import { Component, OnInit } from '@angular/core';
import { TaskModel, TaskState } from '../models/taskmodel';
import { Router } from '@angular/router';
import { DataService } from '../DataService';

@Component({
    selector: 'app-edit',
    templateUrl: './edittask.component.html'
})
export class EditTaskComponent implements OnInit {
    public validationError: string;
    public task: TaskModel;

    constructor(
        private data: DataService,
        private router: Router
    ) {
        this.validationError = '';
    }

    ngOnInit() {
        if (this.data.currentTask) {
            this.data.currentTask.subscribe(currentTask => {
                this.task = new TaskModel(currentTask.title, currentTask.date);
            });
        } else {
            this.router.navigateByUrl('/');
        }
    }

    public cancelTask() {
        this.router.navigateByUrl('/');
    }

    public saveTask() {
        this.data.updateCurrentTask(this.task);
        this.router.navigateByUrl('/');
    }

    public deletedTask() {
        this.data.delTask(this.task);
        this.router.navigateByUrl('/');
    }
}
