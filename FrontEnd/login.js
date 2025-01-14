const loginForm = document.querySelector(".loginForm");
const loginButton = document.querySelector(".loginButton");

//Push des données du formulaire à l'api
loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const logins = {
        email: email,
        password: password
    };
    const promiseAdmin = fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logins)
        });
    const loginResponse = promiseAdmin.then((response) =>{
        return response.json();
    });

    loginResponse.then((data) =>{
        if (data.token !== undefined) {
            localStorage.setItem("token", data.token);//stockage du token//
            document.location.href="index.html";
        } else {
            alert("Erreur dans l’identifiant ou le mot de passe");
        }
    });
});
