const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('db', 'root', 'password', {
    host: '127.0.0.1',
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
        const [results, metadata] = await sequelize.query('SELECT * FROM TTasks')
        console.log(results)

    }catch(err) {
        console.log("Can't connect :(")
    }

}

testConnection();