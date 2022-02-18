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

        //InsertTest();
        //GetAllTest();
        //FetchTest(3);
        //rawDeleteTest(15);
        //rawUpdateTest('taskDescription', 'Sequelize', 2);
        //rawGetAllTest();
    }catch(err) {
        console.log("Can't connect :(");
    }
}

export async function GetAllTest() {
    const [results, metadata] = await sequelize.query('SELECT * FROM Tasks');
    console.log(results);
    return results
}

export async function FetchTest(fetchID:number) {
    const [results, metadata] = await sequelize.query('SELECT * FROM Tasks WHERE id = ' + fetchID);
    console.log(results);
    return results
}

export async function InsertTest(newTask:any) {
    const [results, metadata] = await sequelize.query('INSERT INTO Tasks (id, taskDescription, createdAt, dueDate, completed) '+
    `VALUES (${newTask.id}, "${newTask.taskDescription}", '${newTask.createdAt}', '${newTask.dueDate}', ${newTask.completed})`);
}

export async function rawUpdateTest(attribute:string, newVal:string, id:number) {
    const [results, metadata] = await sequelize.query('UPDATE TTasks SET ' + attribute + ' = ' + '"' + newVal + '"' + ' WHERE ID = ' + id);
    console.log(results);
}

export function rawDeleteTest(id:number) {
    const [results, metadata] = sequelize.query('DELETE FROM TTasks WHERE id = ' + id);
    console.log(metadata);
}

testConnection();