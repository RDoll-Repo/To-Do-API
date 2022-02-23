const instances = require('hapi-sequelizejs').instances;
export class TaskRepo {
    
    async getTasks(completion:string, sortBy:string, sortOrder:string){
        var queryString = "SELECT * FROM Tasks ";

        if (completion != null && completion != undefined)
        {
            queryString += `WHERE completed = ${completion} `;
        }

        if (sortBy != null && sortBy != undefined)
        {
            queryString += `ORDER BY ${sortBy} ${sortOrder}`;
        }
        
        var [results] = await instances.dbs.ToDoAPI.sequelize.query(
            queryString
        )

        return results;
    }

    async fetchTask(id:number) {
        const [results] = await instances.dbs.ToDoAPI.sequelize.query(
            'SELECT * FROM Tasks WHERE id = ' + id
        )
        return results;
    }

    async createTask(desc:string, due:Date, completed: boolean){
        const newTask:ITask = {
            id: 0,
            taskDescription:desc, 
            createdAt: new Date(),
            dueDate:due, 
            completed:completed
        }
        const created = newTask.createdAt.toISOString().split('T')[0]

        const [results] = await instances.dbs.ToDoAPI.sequelize.query(
            'INSERT INTO Tasks (taskDescription, createdAt, dueDate, completed) '+
            `VALUES ("${newTask.taskDescription}", '${created}', '${newTask.dueDate}
            ', ${newTask.completed})`
        )
        return results;
    }

    async updateTask(id:number, desc:string, due:Date, completed: boolean) {
        const [results] = await instances.dbs.ToDoAPI.sequelize.query(
            'UPDATE Tasks SET ' +
            `taskDescription = "${desc}", ` +
            `dueDate = '${due}', ` +
            `completed = ${completed} ` +
            `WHERE id = ${id}`
        )
        return results
    }

    async deleteTask(id:number) { 
        const [results] = await instances.dbs.ToDoAPI.sequelize.query(
            'DELETE FROM Tasks WHERE id = ' + id
        )
        return results;
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