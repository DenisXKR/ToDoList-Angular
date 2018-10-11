import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component/app.component';
import { NewTaskComponent } from './newtask.component/newtask.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { EditTaskComponent } from './edittask.component/edittask.component';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { TaskSearchPipe } from './task-search.pipe';
import { DataService } from './DataService';

@NgModule({
  declarations: [
    AppComponent,
    NewTaskComponent,
    DashboardComponent,
    EditTaskComponent,
    TaskSearchPipe
  ],
  imports: [
    BrowserModule,
    DatePickerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
