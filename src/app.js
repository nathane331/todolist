export {Project, Todo, RemoveProject, AddProject};


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

}

function RemoveProject(id){
    projects.forEach((project) => {
        if(id === project.id){
            projects.pop(project);
        }
    });

}


projects[0].addTodo(new Todo("Title", "Desc", priority.High));
//projects[0].addTodo(new Todo("Title2", "Desc", priority.Low));
//projects[0].addTodo(new Todo("Title3", "Desc", priority.Medium));
//projects[0].addTodo(new Todo("Title4", "Desc", priority.High));

document.querySelector(".new-project-btn").addEventListener('click', () => {AddProject(new Project());} );


////////

//display projects
const projectList = document.querySelector(".project-list");

projects.forEach((project) =>{

    let newProject = document.createElement("li");
    
    newProject.classList.add("project");
   

    let bookIcon = document.createElement("i");
    bookIcon.classList.add("bx-note-book");
    bookIcon.classList.add("bx");
    newProject.appendChild(bookIcon);

     newProject.innerHTML += " " + project.title;
    projectList.appendChild(newProject);
    console.log("project added to sidebar");
});
