//main page
//imports
import "./style.css"
import { AddProject, projects, Project, RemoveProject } from "./app";


document.querySelector(".new-project-btn").addEventListener('click', function() 
    {
        AddProject(new Project());
        UpdateProjectListDisplay();

    });


const projectList = document.querySelector(".project-list");

function UpdateProjectListDisplay(){
    //clear the current screen 
    projectList.innerHTML = "";
    
    // and update the project list
    projects.forEach((project) =>{

        let newProjectItem = document.createElement("li");
        newProjectItem.classList.add("project-list-item");

        let newProjectLabel = document.createElement("div"); //left div
        newProjectLabel.classList.add("project-list-title");
        

        let bookIcon = document.createElement("i");
        bookIcon.classList.add("bx-note-book");
        bookIcon.classList.add("bx");
    
        let projectDeleteButton = document.createElement("button");
        projectDeleteButton.classList.add("project-delete-btn");
        projectDeleteButton.textContent = "X";
        projectDeleteButton.addEventListener('click', function(){
                RemoveProject(project.id);
                UpdateProjectListDisplay();

            });

        newProjectLabel.appendChild(bookIcon);
        
        newProjectLabel.innerHTML += " " + project.title;
        newProjectItem.appendChild(newProjectLabel);
        newProjectItem.appendChild(projectDeleteButton);

        projectList.appendChild(newProjectItem);
        console.log("project added to sidebar");
    });

}

function UpdateTodoListDisplay(){

}

AddProject(new Project());
UpdateProjectListDisplay();