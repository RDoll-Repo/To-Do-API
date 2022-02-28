import { v4 as uuidv4 } from 'uuid';
const Task = require('../models/SequelizeModels');

export class TaskRepo {

    async getTasks(completion:string, sortBy:string = 'dueDate', sortOrder:string = 'asc'){

        const query = Task.TaskModel()
        var results

        // if completion parameter isn't given, just give all tasks.
        if (completion != null || completion != undefined){
            results = query.findAll({
                where: {
                    completed : JSON.parse(completion),
                },
                order: [
                    [sortBy , sortOrder]
                ]
            })
        }else{
            results = query.findAll({
                order: [
                    [sortBy , sortOrder]
                ]
            })
        }

        return results
    }

    async fetchTask(fetchID:number) {
        const query = Task.TaskModel()

        const results = query.findAll({
            where: {
                id: fetchID
            }
        })

        return results
    }

    async createTask(desc:string, due:Date, completed: boolean){

        const query = Task.TaskModel()

        const newTask = await query.create({
            id: uuidv4(),
            taskDescription:desc, 
            dueDate:due, 
            completed:completed
        })
        return newTask
    }

    async updateTask(fetchID:number, desc:string, due:Date, completed: boolean) {
        const query = Task.TaskModel()

        const updatedTask = await query.update({
            taskDescription: desc,
            dueDate: due,
            completed: completed
        },
        {
            where: {
                id: fetchID
            }
        })

        return updatedTask
    }

    async deleteTask(fetchID:number) { 
        const query = Task.TaskModel()

        const results = query.destroy({
            where: {
                id: fetchID
            }
        })

        return results
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
