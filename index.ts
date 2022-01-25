'use strict';

const Hapi = require('@hapi/hapi');

import {
    Tasks
} from "./src/models/ArrayModel"

import Routes from './src/endpoints/todoEndpoints'

const init = async () =>
{
    const server = Hapi.server(
        {
            port: 3000,
            host: 'localhost'
        }
    );

    // Generic route that handles all paths
    server.route(Routes)

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandled rejection', (err) =>
{
    console.log(err);
    process.exit(1);
})

init();

