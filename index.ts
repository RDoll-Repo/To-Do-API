'use strict';

const Hapi = require('@hapi/hapi');
const Sequelize = require('sequelize')
import Routes from './src/endpoints/todoEndpoints'

const init = async () =>
{
    const server = Hapi.server(
        {
            port: 3000,
            host: 'localhost'
        }
    );

    await server.register([{
        plugin: require('hapi-sequelizejs'),
        options: [
            {
                name: 'ToDoAPI',
                sequelize: new Sequelize('ToDoAPI', 'root', 'supersecretpass', {
                    host: 'localhost',
                    port: 3306,
                    dialect: 'mysql'    
                }),
            },
        ],
    }])

    // Generic route that handles all paths
    server.route(Routes)

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
}

process.on('unhandled rejection', (err) =>
{
    console.log(err);
    process.exit(1);
});

init();