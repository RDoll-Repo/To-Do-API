import * as db from '../../sequelize'
export class TaskRepo {
    getTasks(completion:string, sortBy:string, sortOrder:string){
        // var queriedTasks:ITask[] = [ ...Tasks ]

        // // This tells the sequelize function how to
        // var sortKey:number[] = [0,0]

        // if (completion != undefined || completion != null){
        //     queriedTasks = Tasks.filter(Task => Task.completed.toString() == completion)
        // }
        // // Selects case based upon what query parameter was entered for sorting. 
        // switch (sortBy)
        // {
        //     case 'createdAt':
                
        //         if (sortOrder == 'asc')
        //         {
        //             queriedTasks.sort((a,b) => +new Date(a.createdAt) - +new Date(b.createdAt));
        //         }
        //         else if (sortOrder == 'desc')
        //         {
        //             queriedTasks.sort((a,b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        //         }
        //         break;

        //     case 'dueDate':
        //         if (sortOrder == 'asc')
        //         {
        //             queriedTasks.sort((a,b) => +new Date(a.dueDate) - +new Date(b.dueDate));
        //         }
        //         else if (sortOrder == 'desc')
        //         {
        //             queriedTasks.sort((a,b) => +new Date(b.dueDate) - +new Date(a.dueDate));
        //         }
        //         break;
        // }
        return db.GetAll()
    }

    fetchTask(id:number) {
        var result = (db.FetchTest(id));

        return result
    }

    createTask(desc:string, due:Date, completed: boolean){
        const newTask = {id:65, taskDescription:desc, dueDate:due, completed:completed}
        
        db.InsertTest(newTask)
    }

    updateTask(id:number, desc:string, due:Date, completed: boolean) {
        db.Update(id, desc, due, completed)
    }

    deleteTask(id:number) { 
        db.Delete(id)
        return null
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