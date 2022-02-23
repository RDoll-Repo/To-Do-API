import * as db from '../../sequelize'
export class TaskRepo {
    getTasks(completion:string, sortBy:string, sortOrder:string){
        return db.GetAll(completion, sortBy, sortOrder)
    }

    fetchTask(id:number) {
        var result = (db.FetchTest(id));
        return result
    }

    createTask(desc:string, due:Date, completed: boolean){
        const newTask = {id:68, taskDescription:desc, dueDate:due, completed:completed}
        
        return db.InsertTest(newTask)
    }

    updateTask(id:number, desc:string, due:Date, completed: boolean) {
        return db.Update(id, desc, due, completed)
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