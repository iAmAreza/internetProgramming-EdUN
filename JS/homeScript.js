document.getElementById('my-get-button').addEventListener('click', ()=>{
    window.open(document.location.origin+'/HTML/signup.html',"_self");
}); 

document.getElementById('my-get-button-2').addEventListener('click', ()=>{
    window.open(document.location.origin+'/HTML/signup.html', "_self");
}); 

var studentFunction = setInterval(studentFunc, 1); 
let count1 = 1; 
function studentFunc() {
  count1+=3; 
  document.querySelector("#number1").innerHTML = count1; 
  if(count1 >= 1232){
    clearInterval(studentFunction); 
  }
}
var courseFunction = setInterval(courseFunc, 38); 
let count2 = 1; 
function courseFunc() {
  count2+=1; 
  document.querySelector("#number2").innerHTML = count2; 
  if(count2 >= 64){
    clearInterval(courseFunction); 
  }
}

var eventFunction = setInterval(eventFunc, 50); 
let count3 = 1; 
function eventFunc() {
  count3+=1; 
  document.querySelector("#number3").innerHTML = count3; 
  if(count3 >= 42){
    clearInterval(eventFunction); 
  }
}


var trainerFunction = setInterval(trainerFunc, 150); 
let count4 = 1;  
function trainerFunc() {
   count4+= 1; 
   document.querySelector("#number4").innerHTML = count4; 
   if(count4 >= 15) {
    clearInterval(trainerFunction); 
   }
}
async function onHTMLFileLoaded(){
    // This function is called when the HTML file is loaded
    try {
        const res = await fetch("http://127.0.0.1:3000/auth/validate_token", {
            method: "POST",
            body: JSON.stringify({
                token: JSON.parse(localStorage.getItem("access_token")),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        // console.log(data);
        if(data.error===true){
            let dashboard_button = document.getElementById("dashboard_button");
            dashboard_button.disabled = true;
        }
        if(data.error===false){

            let get_started_button = document.getElementById("my-get-button");
            let get_started_button_2 = document.getElementById("my-get-button-2");
            get_started_button.innerHTML = "Logout";
            get_started_button.style.backgroundColor = "red";
            get_started_button.onclick= function(){
                localStorage.removeItem("access_token");
                window.location.reload()
            }
        }
    } catch (error) {
        console.log(error);
    }
}