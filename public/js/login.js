document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("login_username").value.trim();
    const password = document.getElementById("login_password").value.trim();

    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "username" : name,
            "password" : password
        }),
    }).then((result) => {
        if (!result.ok) {
            alert("Bad create thing");
            return;
        }

        result.json().then(() => {
            window.location = '/';
        });
    });
});