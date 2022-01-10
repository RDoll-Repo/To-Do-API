# To-Do API Specifications
---
This is a proposal for a 'To-Do List' API that will allow the user to manage tasks on a to-do list. They will have to ability to create new tasks and update or delete existing ones. Additionally, they will have access to a variety of views such as "All tasks, tasks arranged or sorted by criteria (IE: Completion Status and Date Added) or a single task given a primary key. 
## Endpoints
---
**Fetch All Tasks EndPoint**
`GET /tasks`

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
]
```
<br>


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
<br>

**Create Task Endpoint**
`POST /tasks`
Body:
```
{
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
<br>

**Update Task Endpoint**
`PUT /tasks/{id}`
Body: 
```
{
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
<br>

**Delete To-Do Endpoint**
`DELETE /tasks/{id}`
Response
```
Repsonse Code: 200 OK
```
