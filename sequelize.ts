import { any, date, number } from "joi";

const {Sequelize, DataTypes, QueryTypes} = require('sequelize');
const instances = require('hapi-sequelizejs').instances;

// TO DO (during models): 
// -Convert IDs to GUID/UUID once models are being used. 
// -Autogen createdAt


export async function GetAll(filter:string, sort: string, order: string = 'asc') {
    // Start with a GetAll. Build as we go along by checking parameters 
    var queryString = "SELECT * FROM Tasks ";

    if (filter != null && filter != undefined)
    {
        queryString += `WHERE completed = ${filter} `;
    }

    if (sort != null && sort != undefined)
    {
        queryString += `ORDER BY ${sort} ${order}`;
    }
    
    var [results] = await instances.dbs.ToDoAPI.sequelize.query(
        queryString
    )

    return results;
}

export async function FetchTest(fetchID:number) {
    const [results] = await instances.dbs.ToDoAPI.sequelize.query(
        'SELECT * FROM Tasks WHERE id = ' + fetchID
    )
    return results;
}

export async function InsertTest(newTask:any, created:string) {         // Sequelize Autogens ID
    const [results] = await instances.dbs.ToDoAPI.sequelize.query(
        'INSERT INTO Tasks (taskDescription, createdAt, dueDate, completed) '+
        `VALUES ("${newTask.taskDescription}", '${created}', '${newTask.dueDate}
        ', ${newTask.completed})`
    )
    return results;
}


export async function Update(id:number, desc:string, due:Date, completed:boolean) {
    const [results] = await instances.dbs.ToDoAPI.sequelize.query(
        'UPDATE Tasks SET ' +
        `taskDescription = "${desc}", ` +
        `dueDate = '${due}', ` +
        `completed = ${completed} ` +
        `WHERE id = ${id}`
    )
    return results
}

export async function Delete(id:number) {
    const [results] = await instances.dbs.ToDoAPI.sequelize.query(
        'DELETE FROM Tasks WHERE id = ' + id
    )
    return results;
}




// No need for a model at the moment, but keeping this commented out until its needed.
// const Task = sequelize.define('Task', { 
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