# To-Do API Specifications
---
This is a proposal for a 'To-Do List' API that will allow the user to manage tasks on a to-do list. They will have to ability to create new tasks and update or delete existing ones. Additionally, they will have access to a variety of views such as "All tasks, tasks arranged or sorted by criteria (IE: Completion Status and Date Added) or a single task given a primary key. 
## Endpoints
---

**Search Tasks Endpoint**
`GET /tasks/search?taskDescription={string}&date=[date]&completed={bool}`

Response:

```
Response Code: 200 OK
[
    {
        "id": int,
        "taskDescription": string,
        "dueDate": date,
        "completed": bool
    },
    ...
]
```
\

**Fetch Task Endpoint**
`GET /tasks/{id}`

Response:
```
Response Code: 200 OK
{
    "id": int,
    "taskDescription": string,
    "dueDate": date,
    "completed": bool
}
```
\

**Create Task Endpoint**
`POST /tasks`
Body:
```
{
    "id": string,
    "taskDescription": string,
    "dueDate": string,
    "completed": bool
}
```

Response:
```
Response Code: 201 CREATED
{
    "id": int,
    "taskDescription": string,
    "dueDate": date,
    "completed": bool
}
```
\

**Update Task Endpoint**
`PUT /tasks`
Body: 
```
{
    "id": int,
    "taskDescription": string,
    "dueDate": string,
    "completed": bool
}
```

Response:
```
200 OK
{
    "id": int,
    "taskDescription": string,
    "dueDate": date,
    "completed": bool
}
```
\

**Delete To-Do Endpoint**
`DELETE /tasks/{id}`
Body: 

Response
```
200 OK
```
