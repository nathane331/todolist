export {Project, Todo, RemoveProject, AddProject, projects, priority};

let projects = [];

let priority = {
    Low: 'low',
    Medium: 'medium',
    High: 'high'
}

class Project{
    constructor(projectTitle = "New Project", todos = []){
        this.title  = projectTitle;
        this.todos = todos;
        this.creationDate = new Date();
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
    constructor(title = "My Task", description = "Description of my task."){
        this.title = title;
        this.description = description;
        this.priority = priority.High;
        this.dueDate = "";

        this.id = "todo-"+crypto.randomUUID();
        this.creationDate = new Date();
        this.completionStatus = false;

    }
}


function AddProject(project){
    projects.unshift(project);
    
}

function RemoveProject(id){
    projects.forEach((project) => {
        if(id === project.id){
            projects.pop(project);
        }
    });

}


