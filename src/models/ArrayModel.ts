class Task {
    id: number;
    taskDescription: string;
    createdAt: Date;
    dueDate: Date;
    completed: boolean

    constructor(id: number, desc: string, created:Date, due:Date, completed:boolean) {
        this.id = id
        this.taskDescription = desc
        this.createdAt = created
        this.dueDate = due
        this.completed = completed
    }
}


const task1 = new Task(1, "TypeScript", new Date(), new Date('1/30,2021'), true)
const task2 = new Task(2, "Hapi", new Date(), new Date("1/14/2021"), false)
const task3 = new Task(3, "Prototype API", new Date("1/12/2022"), new Date ("1/14/2022"),false)
const task4 = new Task(4, "Trash", new Date("1/14/2022"), new Date("1/26/2025"),false)

// Array to prototype hapi + postman with. 
export let Tasks =
[
    task1,
    task2,
    task3,
    task4
];


//{id: 4, taskDescription: "Trash", createdDate:"1/14/2022", dueDate: "1/26/2025",completed:false}

