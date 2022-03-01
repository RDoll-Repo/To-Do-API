const instances = require('hapi-sequelizejs').instances;
import { DataTypes, Sequelize } from "sequelize";

module.exports.TaskModel = function() {
    const Task = instances.dbs.ToDoAPI.sequelize.define('Tasks', { 
        id: {
            // ID as auto-generated UUID
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        taskDescription: {
            // 255 chars should be sufficient.
            type: DataTypes.STRING,
            allowNull: false
        },
        dueDate: {
            // Sequelize gives createdAt by default, but we still need due date
            type: DataTypes.DATE,
            allowNull: false
        },
        completed: {
            // Default to false (incomplete) since the user likely wouldn't put complete items on the list
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        } 
    }, 
    {
        freezeTableName: true,
        tableName: 'Task',
        updatedAt: false
    })
    return Task
}

