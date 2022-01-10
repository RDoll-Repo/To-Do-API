# To-Do API Specifications
---
This is a proposal for a 'To-Do List' API that will allow the user to manage tasks on a to-do list. They will have to ability to create new tasks as well as update or delete existing ones. 
## Endpoints
---
**Fetch All Tasks Endpoint**

`GET /tasks`

Response:

```
Response Code: 200 OK
[
    {
        "id": int,
        "taskDescription": string,
        "createdDate": date,
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
    "createdDate": date,
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
    "dueDate": date,
    "completed": bool
}
```

Response:
```
Response Code: 201 CREATED
{
    "id": int,
    "taskDescription": string,
    "createdDate": date,
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
    "dueDate": date,
    "completed": bool
}
```

Response:
```
Response Code: 200 OK
{
    "id": int,
    "taskDescription": string,
    "createdDate": date,
    "dueDate": date,
    "completed": bool
}
```
<br>

**Delete Task Endpoint**

`DELETE /tasks/{id}`

Response:
```
Repsonse Code: 200 OK
```
