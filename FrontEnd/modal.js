import {generateProjects} from "./index.js";

//fonction pour ouvrir la modale et fermer la modale sur les boutons associés //
async function openModal1() {
    //pointage sur les différents éléments liés à l'ouverture de la première modale//
    const modal = document.querySelector(".modal");
    const openModaleButton = document.querySelector("#modalOpener");
    //pointage sur l'icone de fermeture de la modale//
    const closeModalIcon = document.querySelectorAll(".fa-xmark");

    openModaleButton.addEventListener("click",() => {
        modal.style.display = "flex";
        document.querySelector('#firstModal').style.display = 'flex';
    });
    const addWorkModal = document.querySelector("#secondModal");
    closeModalIcon.forEach((crossIcon) => {
        crossIcon.addEventListener("click", () => {
            modal.style.display = "none";
            addWorkModal.style.display = "none";
        });
    });

    //fermer la modale en cliquant en dehors de la modale //
    modal.addEventListener("click", (event) => {
        if (!event.target.closest("#firstModal") && !event.target.closest("#secondModal")) {
        modal.style.display = "none";
        addWorkModal.style.display = "none";
        };
    });
};

openModal1();

//récupération des projets dynamiquement via l'api
async function getProjects() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.log("dans le catch");
        console.log(error);
    }
}

const projects = await getProjects();

//ajout des projets à la liste de la modale //
async function generateModalProjects(projects) {
    const modalGallery = document.querySelector(".modalGallery");
    modalGallery.innerHTML = "";

    for (let i = 0; i < projects.length; i++) {

        const figure = projects[i];

        const projectElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        //attribut alt pour voir le nom du projet dans la console //
        imageElement.alt = figure.title;

        const editButton = document.createElement("p");
        editButton.innerHTML = "éditer";

        //création des icônes corbeille et croix-fléchée //
        const arrowButton = document.createElement("button");
        arrowButton.classList.add("arrowButton");
        const arrowIcon = document.createElement("i");
        arrowIcon.classList.add("fa-solid", "fa-up-down-left-right");

        const trashButton = document.createElement("button");
        trashButton.classList.add("trashButton");
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");

        

        modalGallery.appendChild(projectElement);

        projectElement.appendChild(imageElement);

        projectElement.appendChild(arrowButton);
        arrowButton.appendChild(arrowIcon);

        projectElement.appendChild(trashButton);
        trashButton.appendChild(trashIcon);
        
        projectElement.appendChild(editButton);
    };
};
generateModalProjects(projects);

//fonction pour faire fonctionner les trashButtons //
document.addEventListener("DOMContentLoaded", () => {
    function deleteProject () {
        const deleteButton = document.querySelectorAll(".trashButton");
        deleteButton.forEach((button) => {
            button.addEventListener("click", async (event) =>{
                event.preventDefault();
                const token = localStorage.getItem("token");
                const id = button.getAttribute("id");
                const deleteResponse = await fetch("http://localhost:5678/api/works/${id}", {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ${token}'
                    }
                }); 
                if (deleteResponse.ok) {
                    let deleteResponseWorks = await fetch("http://localhost:5678/api/works/");
                    let projects = await deleteResponseWorks.json();
                    //on appelle les fonction pour afficher les projets nouvellement mis à jours //
                    generateProjects(projects);
                    generateModalProjects(projects);
                    deleteProject();
                    }
                else {
                        alert ("Erreur");
                    };
                });
            });
    };
    deleteProject();
});

const addWorkButton = document.querySelector(".addWorkButton");

//fonction 'click' pour passer à la modale suivante //
addWorkButton.addEventListener("click", () => {
    const addWorkModal = document.querySelector("#secondModal");

    document.querySelector("#firstModal").style.display = "none";

    addWorkModal.style.display = "flex"
});

//pointage sur la flèche de retour à la première modale //
const returnButton = document.querySelector(".fa-arrow-left-long");

returnButton.addEventListener("click", () => {
    document.querySelector("#secondModal").style.display = "none"
    document.querySelector("#firstModal").style.display = "flex"
});

