//main page
//imports
import "./style.css"
import { AddProject, projects, Project, RemoveProject } from "./app";
import { format } from "date-fns";


const projectList = document.querySelector(".project-list");
const projectContent = document.querySelector(".project-content");

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

            });

        newProjectLabel.appendChild(bookIcon);
        
        newProjectLabel.innerHTML += " " + project.title;
        
        newProjectItem.addEventListener("click", function(){
            selectedProjectID = project.id;
            console.log(selectedProjectID);

            projectList.querySelectorAll("li.project-list-item").forEach((listItem)=>{
                listItem.classList.remove("selected-project");
            });

            newProjectItem.classList.add("selected-project");
            UpdateTodoListDisplay(project);
            
        })

        if(selectedProjectID === project.id){
            newProjectItem.classList.add("selected-project");
        }

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
    projectTitle.setAttribute("contenteditable", true);
    projectTitle.textContent = project.title;
    projectContent.appendChild(projectTitle);

    projectTitle.focus();

        document.addEventListener('"keydown"', event => {
            if(document.activeElement === projectTitle && event.key === "Enter" )
            {
                projectTitle.blur();
                project.title = projectTitle.textContent;
                projectTitle.textContent = project.title;
                UpdateProjectListDisplay();
            }
        })

    let projectDate = document.createElement("h5");
    projectDate.classList.add("project-date");
    projectDate.textContent = "Created at " + format(project.creationDate, "h:mm:ss bbbb - MMM do, yyyy");
    projectContent.appendChild(projectDate);

}

///////// DIALOG ///////////

//document.querySelector("#newProjectCancelBtn").addEventListener("click",CloseNewProjectDialog);

// function OpenNewProjectDialog(){
//     const newProjectDialog = document.querySelector(".add-project-dialog");
//     const projectTitleInput = document.querySelector(".add-project-input");

//     newProjectDialog.showModal();
//     projectTitleInput.focus();
// }

// function CloseNewProjectDialog(){
//     document.querySelector(".add-project-dialog").close();
// }

AddProject(new Project("tailored suits"));
UpdateProjectListDisplay();