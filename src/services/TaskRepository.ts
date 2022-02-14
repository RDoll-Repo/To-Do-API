//import { Tasks } from "../models/ArrayModel";
export class TaskRepo {
    getTasks(completion:boolean, sortBy:string, sortOrder:string){
        var queriedTasks:Task[]

        switch (completion)
        {
            case true:
                queriedTasks = Tasks.filter(Task => Task.completed == true);
                break;
            case false:
                queriedTasks = Tasks.filter(Task => Task.completed == false);
                break;
            default:
                queriedTasks = Tasks;
        }

        // Selects case based upon what query parameter was entered for sorting. 
        switch (sortBy)
        {
            case 'createdAt':
                
                if (sortOrder == 'asc')
                {
                    queriedTasks.sort((a,b) => +new Date(a.createdAt) - +new Date(b.createdAt));
                }
                else if (sortOrder == 'desc')
                {
                    queriedTasks.sort((a,b) => +new Date(b.createdAt) - +new Date(a.createdAt));
                }
                break;

            case 'dueDate':
                if (sortOrder == 'asc')
                {
                    queriedTasks.sort((a,b) => +new Date(a.dueDate) - +new Date(b.dueDate));
                }
                else if (sortOrder == 'desc')
                {
                    queriedTasks.sort((a,b) => +new Date(b.dueDate) - +new Date(a.dueDate));
                }
                break;
        }
        return queriedTasks;
    }

    fetchTask(id:number){
        return Tasks[Tasks.findIndex(Task => Task.id == id)]
    }

    createTask(desc:string, due:Date, completed: boolean){
        var newTask = new Task((Tasks.length + 1), desc, new Date, due, completed)
        
        Tasks.push(newTask)
    }

    updateTask(id:number, desc:string, due:Date, completed: boolean){
        Tasks[Tasks.findIndex(Task => Task.id == id)].taskDescription = desc
        Tasks[Tasks.findIndex(Task => Task.id == id)].dueDate = due
        Tasks[Tasks.findIndex(Task => Task.id == id)].completed = completed

        return Tasks[Tasks.findIndex(Task => Task.id == id)]
    }

    deleteTask(id:number){
        Tasks.splice(Tasks.findIndex(Task => Task.id == id), 1)
    }
}



class Task implements ITask
{   
    id:number;
    taskDescription:string;
    createdAt: Date;
    dueDate:Date;
    completed:boolean;

    constructor(id:number, taskDescription:string, createdAt:Date, dueDate:Date, completed:boolean){
        this.id = id;
        this.taskDescription = taskDescription;
        this.createdAt = createdAt;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}



interface ITask {
    id: number;
    taskDescription: string;
    createdAt: Date;
    dueDate: Date;
    completed: boolean;
}

export const repo = new TaskRepo


const task1 = new Task(1, "TypeScript", new Date('12/30/2021'), new Date('12/30/2021'), true)
const task2 = new Task(2, "Hapi", new Date('3/30/2022'), new Date("02/14/2021"), false)
const task3 = new Task(3, "Prototype API", new Date("01/12/2022"), new Date ("1/14/2022"),false)
const task4 = new Task(4, "Trash", new Date("01/14/2022"), new Date("1/26/2025"),false)

// Array to prototype hapi + postman with. 
let Tasks =
[
    task1,
    task2,
    task3,
    task4
];