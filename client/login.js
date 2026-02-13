const form = document.getElementById("login")
form.addEventListener("submit", login)
async function login(event){
    event.preventDefault();

    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;
    console.log("EMAIL:",email);
    console.log("PASS:", password);

    try{
        const url = "http://127.0.0.1:5000/auth/login";
        let response = await fetch(url, {
            method:"POST",
            body:JSON.stringify({email:userEmail, password:userPassword}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }
        const user_logged_jwt = await response.json();
        console.log(user_logged_jwt)
    }
    catch(error){
        console.error(error.message)
    }
}