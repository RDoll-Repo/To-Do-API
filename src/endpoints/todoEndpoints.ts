'use strict';

import { ITask, getTasks, fetchTask, createTask, updateTask, deleteTask } from "../services/TaskRepository";
import { ResponseToolkit } from "hapi";
import { UrlWithParsedQuery } from "url";
import {Tasks} from "../models/ArrayModel"
export default [

    // Get all
    {
        method: 'GET',
        path: '/tasks',
        handler: async(request: UrlWithParsedQuery, h: string) => 
        {
            // Add an empty array for filtering/sorting
            var queriedTasks:ITask[] = []
            var allTasks:ITask[] = []

            allTasks = getTasks(allTasks)

            // Checks for completed status parameter
            if (request.query.completed == 'true' || request.query.completed == 'false')
            {
                // Checks a task's status against the requested parameter
                for (var i = 0; i < allTasks.length; i ++)
                {
                    // Add task to the new array if the status matches
                    if (allTasks[i].completed.toString() == request.query.completed)
                    {
                        queriedTasks.push(Tasks[i]);
                    }
                }
            }
            else
            {
                // Assigns the base array to the response if no filter was toggled
                queriedTasks = allTasks;
            }

            // Selects case based upon what query parameter was entered for sorting. 
            switch (request.query.sort_by)
            {
                case 'createdAt':
                   
                    if (request.query.order_by == 'asc')
                    {
                        queriedTasks.sort((a,b) => +new Date(a.createdAt) - +new Date(b.createdAt));
                    }
                    else if (request.query.order_by == 'desc')
                    {
                        queriedTasks.sort((a,b) => +new Date(b.createdAt) - +new Date(a.createdAt));
                    }
                    break;

                case 'dueDate':
                    if (request.query.order_by == 'asc')
                    {
                        queriedTasks.sort((a,b) => +new Date(a.dueDate) - +new Date(b.dueDate));
                    }
                    else if (request.query.order_by == 'desc')
                    {
                        queriedTasks.sort((a,b) => +new Date(b.dueDate) - +new Date(a.dueDate));
                    }
                    break;

            }

            // Returns the filtered/sorted array
            return queriedTasks;
        }
    },
    
    // Fetch
    {
        method: 'GET',
        path: '/tasks/{id}',
        handler: (  
            request: { 
                params: { 
                    id: number; }; 
                }, 
                h: string) => 
        {
            // Returns one element of the array
            return fetchTask(request.params.id);
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
                    createdAt: Date; 
                    dueDate: Date; 
                    completed: boolean; }; 
                }, 
                h: ResponseToolkit) =>
        {

            // Updating array with the new entry
            createTask({ ...request.payload, id: Tasks.length + 1 })

            // hapi sends a 200 OK by default, so I'm specifiying a 201 here.
            return h.response(Tasks).code(201)
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
            // Update the correct task
            let Task:ITask = fetchTask(request.params.id)
            
            // ID and Date Created are inmutable. 
            Task.id = Number(request.params.id);
            Task.taskDescription = request.payload.taskDescription;
            Task.createdAt = Task.createdAt;
            Task.dueDate = request.payload.dueDate;
            Task.completed = request.payload.completed;

            updateTask(Task)
            return Task;
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
            deleteTask(request.params.id - 1)
            return null;
        }
    }
]
