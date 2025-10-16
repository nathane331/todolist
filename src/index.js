//main page
//imports
import "./style.css"
import { AddProject, projects, Project, RemoveProject, Todo, priority } from "./app";
import { format } from "date-fns";


const projectList = document.querySelector(".project-list");
const projectHeader = document.querySelector(".project-header");
const todoList = document.querySelector(".todo-list");

let selectedProjectID; //id of selected project

document.querySelector(".new-project-btn").addEventListener('click', function() 
    {
        //OpenNewProjectDialog();
        let newProject = new Project();
        AddProject(newProject);
        selectedProjectID = newProject.id;
        UpdateProjectListDisplay();
        UpdateTodoListDisplay(newProject);
        
    });



function UpdateProjectListDisplay(){
    //clear the current screen 
    projectList.innerHTML = "";
    
    

    // and update the project list
    projects.forEach((project) =>{

        

        let newProjectItem = document.createElement("li");
        newProjectItem.classList.add("project-list-item");

        let newProjectLabel = document.createElement("div"); //left div
        newProjectLabel.classList.add("project-list-title");

        newProjectItem.setAttribute("id", project.id);
        
        let bookIcon = document.createElement("i");
        bookIcon.classList.add("bx-note-book");
        bookIcon.classList.add("bx");
    
        let projectDeleteButton = document.createElement("button");
        projectDeleteButton.classList.add("project-delete-btn");
        projectDeleteButton.textContent = "X";
        projectDeleteButton.addEventListener('click', function(){
                RemoveProject(project.id);
                UpdateProjectListDisplay();
                UpdateTodoListDisplay(project);

            });

        newProjectLabel.appendChild(bookIcon);
        
        newProjectLabel.innerHTML += " " + project.title;

        newProjectItem.appendChild(newProjectLabel);
        newProjectItem.appendChild(projectDeleteButton);

        projectList.appendChild(newProjectItem);
        console.log(project.title + " added to sidebar");


        if(selectedProjectID === project.id){
            newProjectItem.classList.add("selected-project");
        }

        newProjectItem.addEventListener("click", function(){
            selectedProjectID = project.id;
            console.log(selectedProjectID);
            UpdateTodoListDisplay(project);

            projectList.querySelectorAll("li.project-list-item").forEach((listItem)=>{
                listItem.classList.remove("selected-project");
            });

            newProjectItem.classList.add("selected-project");
        })
    });

}

function UpdateTodoListDisplay(project){
    //empty content
    projectHeader.innerHTML ="";
    todoList.innerHTML = "";
    

    //add title of project at top
    let projectTitle = document.createElement("h1");
    projectTitle.classList.add("project-display-title");
    projectTitle.setAttribute("contenteditable", true);
    projectTitle.textContent = project.title;
    projectHeader.appendChild(projectTitle);

    //projectTitle.focus();

        projectTitle.addEventListener("keydown", event => {
            if(document.activeElement === projectTitle && event.key === "Enter" )
            {
                projectTitle.blur();
                
            }
        })

        projectTitle.addEventListener('blur', function(){
            if(projectTitle.textContent === '')
            {
                projectTitle.textContent = "New Project";
            }
            project.title = projectTitle.textContent;
            UpdateProjectListDisplay();
        })

    let projectDate = document.createElement("h5");
    projectDate.classList.add("project-date");
    projectDate.textContent = "Created at " + format(project.creationDate, "h:mm:ss bbbb - MMM do, yyyy");
    projectHeader.appendChild(projectDate);

    let newTodoSection = document.createElement("div");
    newTodoSection.classList.add("new-todo-section");

    let newTodoButton = document.createElement("button");
    newTodoButton.classList.add("new-todo-btn");
    newTodoButton.textContent = "+ Create a New Task";

    newTodoSection.appendChild(newTodoButton);
    todoList.appendChild(newTodoSection);


    project.todos.forEach((todo) => {
        DisplayTodo(todo);
    });

}


function DisplayTodo(todo){

    let todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");

    let todoHeader = document.createElement("div");
    todoHeader.classList.add("todo-header");

    let todoExtendedContent = document.createElement("div");
    todoExtendedContent.classList.add("todo-extended-content");

    let dropdownButton = document.createElement("button");
    dropdownButton.innerHTML = "<i class='bx  bx-caret-right'  ></i> ";
    dropdownButton.classList.add("dropdown-btn");
    dropdownButton.addEventListener('click', ()=> {
            
        todoExtendedContent.classList.toggle("show");
        dropdownButton.classList.toggle("dropdown-active");
    });

    const completionStatus = document.createElement("input");
    completionStatus.classList.add("completion-checkbox");
    completionStatus.setAttribute('type', "checkbox");
    completionStatus.addEventListener('change', ()=> {
            
            todo.completionStatus = !todo.completionStatus;
            console.log(projects[0]);
        });

    let todoTitle = document.createElement("h3");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = todo.title;

    let todoDesc = document.createElement("p");
    todoDesc.classList.add("todo-description");
    todoDesc.textContent = todo.description;

    let todoCreationDate = document.createElement("p");
    todoCreationDate.classList.add("todo-creation-date");
    todoCreationDate.textContent = "Created " + format(todo.creationDate, "h:mm:ss bbbb - MMM do, yyyy");

    
    
    todoHeader.appendChild(dropdownButton);
    todoHeader.appendChild(completionStatus);
    todoHeader.appendChild(todoTitle);

    todoExtendedContent.appendChild(todoDesc);
    todoExtendedContent.appendChild(todoCreationDate);

    todoItem.appendChild(todoHeader);
    todoItem.appendChild(todoExtendedContent);

    todoList.appendChild(todoItem);


}



AddProject(new Project("tailored suits"));
projects[0].addTodo(new Todo("Title this is ", "this is a description of the content", priority.High));
projects[0].addTodo(new Todo("Title", "Desc", priority.High));
projects[0].addTodo(new Todo("Title", "Desc", priority.High));
UpdateProjectListDisplay();
console.log(projects[0]);