function login(){
    const form = document.getElementById("login")
    form.addEventListener("submit", (event)=>{
        console.log(event)
    })
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    console.log(email, password)
}