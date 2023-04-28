const headerEditor = document.querySelector(".editorModeHeader");
const logoutLink = document.querySelector(".logInOut");
const editButtons = document.querySelectorAll(".editorModeButton");

//affichage des éléments du mode éditeur lorsque le token est enregistré
function ifUserLoggedIn() {
    if (localStorage.getItem("token")){
        headerEditor.style.display = "flex";
        logoutLink.innerHTML = "logout";
        editButtons.forEach(function(button){
            button.style.display = "flex";
        });
    }
    else {
        headerEditor.style.display = "none";
        logoutLink.innerHTML = "login";
        editButtons.forEach(function(button){
            button.style.display = "none";
        });
    }
};

//retour à la page de connexion en se déconnectant (suppression du token)
logoutLink.addEventListener("click", () => {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token")
    }
});

//Appel de la fonction qui affiche le mode éditeur
ifUserLoggedIn();