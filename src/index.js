//main page
//imports
import "./style.css"
import { AddProject, projects, Project, RemoveProject } from "./app";


const projectList = document.querySelector(".project-list");
const projectContent = document.querySelector(".project-content");

document.querySelector(".new-project-btn").addEventListener('click', function() 
    {
        OpenNewProjectDialog();
        //AddProject(new Project());
        //UpdateProjectListDisplay();

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
        newProjectLabel.addEventListener("click", function(){
            UpdateTodoListDisplay(project);
        })


        newProjectItem.appendChild(newProjectLabel);
        newProjectItem.appendChild(projectDeleteButton);

        projectList.appendChild(newProjectItem);
        console.log("project added to sidebar");
    });

}

function UpdateTodoListDisplay(project){
    //empty content
    projectContent.innerHTML ="";

    //add title of project at top
    let projectTitle = document.createElement("h1");
    projectTitle.classList.add("project-display-title");
    projectTitle.textContent = project.title;
    projectContent.appendChild(projectTitle);

    //for each todo in project, add in list / grid

}

///////// DIALOG ///////////

document.querySelector("#newProjectCancelBtn").addEventListener("click",CloseNewProjectDialog);

function OpenNewProjectDialog(){
    const newProjectDialog = document.querySelector(".add-project-dialog");
    const projectTitleInput = document.querySelector(".add-project-input");

    newProjectDialog.showModal();
    projectTitleInput.focus();
}

function CloseNewProjectDialog(){
    document.querySelector(".add-project-dialog").close();
}

AddProject(new Project("My New Project"));
UpdateProjectListDisplay();