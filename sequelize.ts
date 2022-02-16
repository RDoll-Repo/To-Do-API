const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('ToDoAPI', 'root', 'supersecretpass', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'    
})


const Task = sequelize.define('Task', {
    taskID: {
        // ID as UUID, Sequelize can autogenerate a UUID
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    taskDescription: {
        // 255 chars should be sufficient.
        type: DataTypes.STRING,
        allowNull: false
    },
    dueDate: {
        // Sequelize gives createdAt by default, but we still need due date
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    completed: {
        // Default to false (incomplete) since the user likely wouldn't put incomplete items on the list
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    } 
}, {
});


async function testConnection(){

    try {
        await sequelize.authenticate();
        console.log("Connected");
        //rawGetAllTest();
        //rawFetchTest(3);
        //rawInsertTest();
        //rawDeleteTest(15);
        rawUpdateTest('taskDescription', 'Sequelize', 2);
        //rawGetAllTest();
    }catch(err) {
        console.log("Can't connect :(");
    }
}

async function rawGetAllTest() {
    const [results, metadata] = await sequelize.query('SELECT * FROM TTasks');
    console.log(results);
}

async function rawFetchTest(id:number) {
    const [results, metadata] = await sequelize.query('SELECT * FROM TTasks WHERE id = ' + id);
    console.log(results);
}

async function rawInsertTest() {
    const [results, metadata] = await sequelize.query('INSERT INTO TTasks (id, taskDescription, createdAt, duedate, completed)' + 
    ' VALUES (15, "i squash da bug", "2022-3-30", "2021-02-14", false)');
    console.log(metadata);
}

async function rawUpdateTest(attribute:string, newVal:string, id:number) {
    const [results, metadata] = await sequelize.query('UPDATE TTasks SET ' + attribute + ' = ' + '"' + newVal + '"' + ' WHERE ID = ' + id);
    console.log(results);
}

async function rawDeleteTest(id:number) {
    const [results, metadata] = await sequelize.query('DELETE FROM TTasks WHERE id = ' + id);
    console.log(metadata);
}



testConnection();