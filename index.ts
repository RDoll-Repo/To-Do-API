'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(
        {
            method: 'GET',
            path: '/example',
            handler: (
                request: any, 
                h: any) => 
            {
                // Demonstation of return
                return "This is an example return."
            }
        }
    )

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();