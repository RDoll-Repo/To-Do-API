import { Task, Tasks } from "../models/ArrayModel";

export interface ITask {
    
    id: number;
    taskDescription: string;
    createdAt: Date;
    dueDate: Date;
    completed: boolean;
    
}

export interface ITasks extends Array<ITask>{}

export function getTasks(list:Task[]){
    list = Tasks;
    return list;
}

export function fetchTask(id:number){
    return Tasks[id - 1];
}

export function createTask(task:ITask){
    Tasks.push(task);
}

export function updateTask(updatedTask:Task){
    Tasks[updatedTask.id - 1] = updatedTask

}

export function deleteTask(id:number){
    Tasks.splice((id), 1)
}
