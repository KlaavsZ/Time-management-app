export interface ITask{
    id: number,
    name: string,
    description: string,
    done: boolean;
    createdAt: Date,
    updatedAt: Date,
    start: Date,
    end: Date
}

