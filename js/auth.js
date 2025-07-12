document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    // Registracija
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("regEmail").value;
            const password = document.getElementById("regPassword").value;

            if (email === "" || password.length < 6) {
                alert("Unesi validan email i lozinku (min 6 karaktera)");
                return;
            }

            const user = { email, password };
            localStorage.setItem("user", JSON.stringify(user));
            alert("Registracija uspešna!");
            window.location.href = "login.html";
        });
    }

    // Logovanje
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("logEmail").value;
            const password = document.getElementById("logPassword").value;

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || user.email !== email || user.password !== password) {
                alert("Neispravan email ili lozinka!");
                return;
            }

            localStorage.setItem("loggedIn", "true");
            alert("Uspešno ste se ulogovali!");
            window.location.href = "index.html";
        });
    }
});
