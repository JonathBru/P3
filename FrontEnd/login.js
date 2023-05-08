const loginForm = document.querySelector(".loginForm");

//Push des données du formulaire à l'api
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();//empêcher l'envoi du formulaire par défaut
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
            localStorage.setItem("token", data.token);
            document.location.href="index.html";
        } else {
            alert("Erreur dans l’identifiant ou le mot de passe");
        }
    });
});
