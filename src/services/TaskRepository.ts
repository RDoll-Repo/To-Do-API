export class TaskRepo {
    getTasks(completion:string, sortBy:string, sortOrder:string){
        var queriedTasks:ITask[] = Tasks

        if (completion != undefined){
            queriedTasks = Tasks.filter(Task => Task.completed.toString() == completion)
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
        var index = Tasks.findIndex(Task => Task.id == id)
        
        if (index == -1) {
            return "There is no task with this ID."
        } else {return Tasks[index]}
    }

    createTask(desc:string, due:Date, completed: boolean){
        const maxID = Math.max.apply(null, Tasks.map(Task => Task.id))
        
        const newTask = {id:(maxID + 1), taskDescription:desc, createdAt:new Date, dueDate:due, completed:completed}
        
        Tasks.push(newTask)
    }

    updateTask(id:number, desc:string, due:Date, completed: boolean){
        const index = Tasks.findIndex(Task => Task.id == id)

        if (index == -1) {
            return "There is no task with this ID"
        } else {
            Tasks[index].taskDescription = desc
            Tasks[index].dueDate = due
            Tasks[index].completed = completed
        }
        
        return Tasks[index]
    }

    deleteTask(id:number){
        const index = Tasks.findIndex(Task => Task.id == id)

        if (index == -1)
        {
            return "There is no task with this ID."
        } else {Tasks.splice(index, 1); return null}
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


const task1 = {id:1, taskDescription:"TypeScript", createdAt:new Date('12/30/2021'), dueDate:new Date('12/30/2021'), completed:true}
const task2 = {id:2, taskDescription:"Hapi", createdAt:new Date('3/30/2022'), dueDate:new Date("02/14/2021"), completed:false}
const task3 = {id:3, taskDescription:"Prototype API", createdAt:new Date("01/12/2022"), dueDate:new Date ("1/14/2022"),completed:false}
const task4 = {id:4, taskDescription:"Trash", createdAt:new Date("01/14/2022"), dueDate:new Date("1/26/2025"),completed:false}

// Array to prototype hapi + postman with. 
let Tasks =
[
    task1,
    task2,
    task3,
    task4
];