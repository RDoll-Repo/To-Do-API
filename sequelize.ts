const {Sequelize, DataTypes, QueryTypes} = require('sequelize');

const sequelize = new Sequelize('ToDoAPI', 'root', 'supersecretpass', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'    
})


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


export async function testConnection(){

    try {
        await sequelize.authenticate();
        console.log("Connected");
    }catch(err) {
        console.log("Either there's a connection error, or Roland did something very wrong.");
    }
}

export async function GetAllTest() {
    var queryString:string;
    
    const [results, metadata] = await sequelize.query('SELECT * FROM Tasks');
    return results;
}

export async function FetchTest(fetchID:number) {
    const [results, metadata] = await sequelize.query('SELECT * FROM Tasks WHERE id = ' + fetchID);
    return results;
}

export async function InsertTest(newTask:any) {
    // I am using a placeholder createdAt to appease MySQL since in practice (ie: when models are integrated)
    // sequelize will provide the createdAt
    const [results, metadata] = await sequelize.query('INSERT INTO Tasks (id, taskDescription, createdAt, dueDate, completed) '+
    `VALUES (${newTask.id}, "${newTask.taskDescription}", '2022-01-01', '${newTask.dueDate}', ${newTask.completed})`);
}

export async function rawUpdateTest(attribute:string, newVal:string, id:number) {
    const [results, metadata] = await sequelize.query('UPDATE Tasks SET ' + attribute + ' = ' + '"' + newVal + '"' + ' WHERE ID = ' + id);
    console.log(results);
}

export async function Delete(id:number) {
    const [results, metadata] = await sequelize.query('DELETE FROM Tasks WHERE id = ' + id);
}

testConnection();