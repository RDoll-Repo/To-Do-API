'use strict';

const Hapi = require('@hapi/hapi');

// Array to prototype hapi + postman with. 
let Tasks =
[
    {id: 1, taskDescription:"TypeScript", createdDate:"1/10/2021", dueDate:"1/14/2021", completed:true},
    {id: 2, taskDescription:"Hapi", createdDate:"1/10/2021", dueDate:"1/14/2021", completed:false},
    {id: 3, taskDescription: "Prototype API", createdDate:"1/12/2022", dueDate: "1/14/2022",completed:false},
    {id: 4, taskDescription: "Trash", createdDate:"1/14/2022", dueDate: "1/26/2025",completed:false}
];


const init = async () =>
{
    const server = Hapi.server(
        {
            port: 3000,
            host: 'localhost'
        }
    );

    // All tasks 
    server.route(
        {
            method: 'GET',
            path: '/tasks',
            handler: (request: any, h: any) => 
            {
                // Returns the whole array
                return Tasks;
            }
        }
    )

    // Fetch task 
    server.route(
        {
            method: 'GET',
            path: '/tasks/{id}',
            handler: (request: { params: { id: number; }; }, h: any) => 
            {
                // Returns one element of the array
                return Tasks[request.params.id - 1];
            }
        }
    )

    // Create task
    server.route(
        {
            method: 'POST',
            path: '/tasks',
            handler: (request: { payload: { taskDescription: any; dateCreated: any; dueDate: any; completed: any; }; }, h: any) =>
            {
                const Task =
                {
                    // ID is inmutable, auto-generated by the program.
                    id:Tasks.length + 1,
                    taskDescription:request.payload.taskDescription,
                    createdDate:request.payload.dateCreated,
                    dueDate:request.payload.dueDate, 
                    completed:request.payload.completed
                };

                Tasks.push(Task);
                return Task;
            }
        }
    )

    // Update Task
    server.route(
        {
            method: 'PUT',
            path: '/tasks/{id}',
            handler: (request: { params: { id: number; }; payload: { taskDescription: string; dueDate: string; completed: boolean; }; }, h: any) =>
            {
                // Update the correct task
                let Task = Tasks[request.params.id - 1]
                
                // ID and Date Created are inmutable. 
                Task.id = request.params.id;
                Task.taskDescription = request.payload.taskDescription;
                Task.createdDate = Task.createdDate;
                Task.dueDate = request.payload.dueDate;
                Task.completed = request.payload.completed;

                Tasks[request.params.id - 1] = Task;
                return Task;
            }
        }
    )


    // Delete Task
    server.route(
        {
            method: 'DELETE',
            path: '/tasks/{id}',
            handler: (request: { params: { id: number; }; }, h: any) =>
            {
                delete Tasks[request.params.id - 1];

                return Tasks;
            }
        }
    )


    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandled rejection', (err) =>
{
    console.log(err);
    process.exit(1);
})

init();