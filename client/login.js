const form = document.getElementById("login");
const errorBox = document.getElementById("error-message");
form.addEventListener("submit", login);

async function login(event){
    event.preventDefault();

    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;
    console.log("EMAIL:",userEmail);
    console.log("PASS:", userPassword);

    try{
        const url = "http://127.0.0.1:5000/auth/login";

        let response = await fetch(url, {
            method:"POST",
            body: JSON.stringify(
                {email:userEmail,
                 password:userPassword
                }),
            headers:{
                "Content-Type":"application/json"
            }
        });

        const data = await response.json();

        if (!response.ok){
            errorBox.textContent = data.ERROR;
            throw new Error(`Response status: ${response.status}`);
        }
        console.log(data.access_token);
        localStorage.setItem("access_token", data.access_token);
        window.setTimeout(function(){
            window.location = "./campaign.html"
        }, 2000)
    }
    catch(error){
        console.error(error.message);
    }
}