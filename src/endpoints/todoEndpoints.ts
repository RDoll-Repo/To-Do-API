'use strict';

import { ResponseToolkit } from "hapi";
import { repo } from "../services/TaskRepository";
export default [

    // Get all
    {
        method: 'GET',
        path: '/tasks',
        handler: async(request: {
                    query: {
                        completed:string,
                        sort_by:string,
                        order_by:string}
                    }, h: string) => 
        {
            return repo.getTasks(request.query.completed, request.query.sort_by, request.query.order_by)
        }
    },
    
    // Fetch
    {
        method: 'GET',
        path: '/tasks/{id}',
        handler: (  
            request: { 
                params: { 
                    id: string; }; 
                }, 
                h: string) => 
        {

            // Returns one element of the array
            var response = repo.fetchTask(parseInt(request.params.id))

            if (response == null) {
                return "There is no task with this ID."
            } else {return response}
        }
    },

    // Add task
    {
        method: 'POST',
        path: '/tasks',
        handler: (
            request: { 
                payload: { 
                    taskDescription: string; 
                    CreatedAt: Date; 
                    dueDate: Date; 
                    completed: boolean; }; 
                }, 
                h: ResponseToolkit) =>
        {
            repo.createTask(request.payload.taskDescription, request.payload.dueDate, request.payload.completed) 

            // hapi sends a 200 OK by default, so I'm specifiying a 201 here.
            return h.response().code(201)
        }
    },

    // Update task
    {
        method: 'PUT',
        path: '/tasks/{id}',
        handler: (
            request: { 
                params: { 
                    id: number; 
                }; 
            payload: { 
                taskDescription: string; 
                dueDate: Date; 
                completed: boolean; 
            }; 
        },
        h: string
        ) =>
        {
            var response = repo.updateTask(request.params.id, request.payload.taskDescription, 
                request.payload.dueDate, request.payload.completed)

            if (response == null) {
                return "There is no task with this ID."
            } else {return response}
        }
    },

    // Delete task
    {
        method: 'DELETE',
        path: '/tasks/{id}',
        handler: (
            request: { 
                params: { id: number; }; 
            }, 
            h: string) =>
        {
            repo.deleteTask(request.params.id);
            return null
        }
    }
]