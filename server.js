const express = require('express');
const instance = express(); 
const port = process.env.PORT || 3001; 
instance.use(express.json());
// array for task and user
const tasks = [];
const users = [];
// route for tasks creation
instance.post('/create-tasks', (req,res) =>{
    const {title,description,duedate} = req.body;
    const task = {title,description,duedate};
    tasks.push(task);
    res.json(newTask);
});
// route for fetching tasks
instance.get('/fetch-tasks', (req,res) =>{
    res.json(tasks);
});
// route for updating task status
instance.put('/mark-completed', (req,res) =>{
    const taskId = req.params.task
    const index = tasks.findIndex(task => task.id === taskId);
    tasks[index].completed = true;
    res.json(tasks);
});
// route for assigning category to tasks
instance.patch('tasks-category',(req,res) =>{
    const {taskId,category} = req.params.body;
    const index = tasks.findIndex(task => task.id === taskId);
    tasks[index].category = category;
    res.json(tasks);
});
// route for sorting tasks 
instance.get('/sort-tasks', (req,res) =>{
    const sort_criteria = req.body.params;
    switch (sort_criteria)
    {
        case 'due date':
            tasks.sort((a,b) => a.duedate - b.duedate);
            break;
        case 'category':
            tasks.sort((a,b) => a.category - b.category);
            break;
        case 'completion status':
            tasks.sort((a,b) => a.completed - b.completed);
            break;
        default:
            break;
    }
    res.json(tasks);
})
// route for priority levels
instance.put('/priority-levels', (req, res) =>{
    const {taskId, priorityLevel} = req.params.body;
    const index = tasks.findIndex(task => task.id === taskId);
    tasks[index].priorityLevel = priorityLevel;
    res.json(tasks);
});
// route for adding users
instance.post('/add-users', (req,res) =>{
    const {name,email,password} = req.body;
    const user = {name,email,password};
    users.push(user);
    res.json(newUser);
});
// route for authenticating users
instance.get('/authenticate-users/:name/:password', (req,res) => 
{
    const {name,password} = req.params;
    const user = users.find(user => user.name === name && user.password === password);
    if(user) 
    {
        console.log("User("+user.name+") authenticated.");
    }  
    else
    {
        console.log("User("+user.name+") not authenticated.");
    }
    res.json(user);
});
// listening to sever
instance.listen(port, () => 
{
    console.log("Server running on port "+port+".");
});  