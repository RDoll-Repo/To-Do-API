# To-Do API Specifications
---
This is a proposal for a 'To-Do List' API that will allow the user to manage tasks on a to-do list. They will have to ability to create new tasks and update or delete existing ones. Additionally, they will have access to a variety of views such as "All tasks, tasks arranged or sorted by criteria (IE: Completion Status and Date Added) or a single task given a primary key. 
## Endpoints
---

`GET /tasks/search?name={string}&date=[date]&completion={bool}`

Response:

```
arrTasks[]

{
    ID: int,
    Name: string,
    Date: string,
    Completion: bool
}
```
\
`GET /tasks/{id}`

Response:
```
{
    ID: int,
    Name: string,
    Date: string,
    Completion: bool
}
```
\
`POST /tasks`
Body:
```
{
    "id": int,
    "name": string,
    "date": string,
    "completion": bool
}
```

Response:
```
{
    ID: int,
    Name: string,
    Date: string,
    Completion: bool
}
```
\
`PUT /tasks`
Body: 
```
{
    "id": int,
    "name": string,
    "date": string,
    "completion": bool
}
```

Response:
```
{
    ID: int,
    Name: string,
    Date: string,
    Completion: bool
}
```
\
`DELETE /tasks/{id}`
Body: 
```
{
    "id": int
}
```

Response
```
"Task Deleted"
```
