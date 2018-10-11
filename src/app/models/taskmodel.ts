export class TaskModel {

    constructor(title: string, date: Date) {
        this.title = title;
        this.date = date;
        this.state = TaskState.New;
    }

    public title: string;
    public date: Date;
    public state: TaskState;
}

export enum TaskState {
    New,
    Complite
}
