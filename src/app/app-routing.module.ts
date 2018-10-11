import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component/dashboard.component';
import { NewTaskComponent } from './newtask.component/newtask.component';
import { EditTaskComponent } from './edittask.component/edittask.component';

const appRoutes: Routes = [
    { path: 'newtask', component: NewTaskComponent },
    { path: 'edittask', component: EditTaskComponent },
    { path: '', component: DashboardComponent },
    { path: '*',   redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
