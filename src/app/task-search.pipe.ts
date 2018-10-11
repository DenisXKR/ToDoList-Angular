import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel, TaskState } from './models/taskmodel';

@Pipe({
  name: 'taskSearch'
})
export class TaskSearchPipe implements PipeTransform {

  transform(value: TaskModel[], args: string): any {
    if (!args) {
      return value;
    }

    return value.filter(item => {
      return (
        item.title.toLowerCase().includes(args.toLowerCase()) &&
        item.state === TaskState.New
      );
    });
  }
}
