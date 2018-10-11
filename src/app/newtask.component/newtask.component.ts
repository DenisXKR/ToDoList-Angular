import { Component, OnInit } from '@angular/core';
import { TaskModel, TaskState } from '../models/taskmodel';
import { Router } from '@angular/router';
import { DataService } from '../DataService';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-new',
    templateUrl: './newtask.component.html'
})
export class NewTaskComponent implements OnInit {
    public task = new TaskModel('', new Date());

    public formValidation: FormGroup;

    get title() {
        return this.formValidation.get('title');
    }

    public ngOnInit(): void {
        this.formValidation = new FormGroup({
            'title': new FormControl(this.task.title, [Validators.required])
        });
    }

    constructor(
        private data: DataService,
        private router: Router
    ) { }

    public cancelTask() {
        this.router.navigateByUrl('/');
    }

    public addTask() {
        this.data.addTask(this.task);
        this.router.navigateByUrl('/');
    }
}
