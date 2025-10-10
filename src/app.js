export {Project, Todo, RemoveProject, AddProject, projects};


let projects = [];

const priority = {
    Low: 'low',
    Medium: 'medium',
    High: 'high'
}

class Project{
    constructor(projectTitle = "New Project", todos = []){
        this.title  = projectTitle;
        this.todos = todos;
        this.id = "project-"+crypto.randomUUID();
        
    }

    addTodo(todo){
        this.todos.unshift(todo); //pass in a todo that was created at the UI

    }

    removeTodo(id){ //pass the id of the todo we want to remove - from the UI
        this.todos.forEach((todo) => {
            if(id === todo.id){
                this.todos.pop(todo);
            }
        });
    }

}

class Todo{
    constructor(title = "My Task", description = "Description of my task.", priority = priority.Low){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.id = "todo-"+crypto.randomUUID();
    }
}


function AddProject(project){
    projects.unshift(project);
    console.log(projects);

}

function RemoveProject(id){
    projects.forEach((project) => {
        if(id === project.id){
            projects.pop(project);
        }
    });

    console.log(projects);

}


// projects[0].addTodo(new Todo("Title", "Desc", priority.High));
//projects[0].addTodo(new Todo("Title2", "Desc", priority.Low));
//projects[0].addTodo(new Todo("Title3", "Desc", priority.Medium));
//projects[0].addTodo(new Todo("Title4", "Desc", priority.High));



