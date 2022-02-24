import { QueryTypes } from "sequelize";

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
            'SELECT * FROM Tasks WHERE id = ?',
            {
                replacements: [id],
                type: QueryTypes.SELECT
            }
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
            `VALUES (?, ?, ?, ?)`,
            {
                replacements:[desc, created, due, completed],
                type: QueryTypes.INSERT
            }
        )
        return results;
    }

    async updateTask(id:number, desc:string, due:Date, completed: boolean) {
        const [results] = await instances.dbs.ToDoAPI.sequelize.query(
            'UPDATE Tasks SET ' +
            `taskDescription = ?, ` +
            `dueDate = ?, ` +
            `completed = ? ` +
            `WHERE id = ?`,
            {
                replacements: [desc, due, completed, id],
                type: QueryTypes.UPDATE
            }
        )
        return results
    }

    async deleteTask(id:number) { 
        const [results] = await instances.dbs.ToDoAPI.sequelize.query(
            'DELETE FROM Tasks WHERE id = ?',
            {
                replacements: [id],
            }
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


// TO DO (during models): 
// -Convert IDs to GUID/UUID once models are being used. 
// -Autogen createdAt

// No need for a model at the moment, but keeping this commented out until its needed.
// const Task = Sequelize.define('Task', { 
//     id: {
//         // ID as UUID, Sequelize can autogenerate a UUID
//         type: DataTypes.UUID,
//         allowNull: false,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true
//     },
//     taskDescription: {
//         // 255 chars should be sufficient.
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     dueDate: {
//         // Sequelize gives createdAt by default, but we still need due date
//         type: DataTypes.DATEONLY,
//         allowNull: false
//     },
//     completed: {
//         // Default to false (incomplete) since the user likely wouldn't put incomplete items on the list
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//     } 
// }, {
//     updatedAt:false
// });

