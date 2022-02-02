import { ITask } from "../services/TaskRepository";

export class Task implements ITask{
    id: number;
    taskDescription: string;
    createdAt: Date;
    dueDate: Date;
    completed: boolean

    constructor(id: number, desc: string, created:Date, due:Date, completed:boolean) {
        this.id = id
        this.taskDescription = desc
        this.createdAt = created
        this.dueDate = due
        this.completed = completed
    }
}


const task1 = new Task(1, "TypeScript", new Date('12/30/2021'), new Date('12/30/2021'), true)
const task2 = new Task(2, "Hapi", new Date('3/30/2022'), new Date("02/14/2021"), false)
const task3 = new Task(3, "Prototype API", new Date("01/12/2022"), new Date ("1/14/2022"),false)
const task4 = new Task(4, "Trash", new Date("01/14/2022"), new Date("1/26/2025"),false)

// Array to prototype hapi + postman with. 
export let Tasks =
[
    task1,
    task2,
    task3,
    task4
];


