import { Component, OnInit } from '@angular/core';
import { TaskModel, TaskState } from '../models/taskmodel';
import { Router } from '@angular/router';
import { DataService } from '../DataService';
import { FormControl, Validators, FormGroup  } from '@angular/forms';

@Component({
    selector: 'app-edit',
    templateUrl: './edittask.component.html'
})
export class EditTaskComponent implements OnInit {
    public validationError: string;
    public task: TaskModel;
    public formValidation: FormGroup;

    get title() {
        return this.formValidation.get('title');
    }
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
            this.formValidation = new FormGroup({
                'title': new FormControl(this.task.title, [Validators.required])
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
