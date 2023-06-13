document.getElementById('my-get-button').addEventListener('click', ()=>{
    window.open('http://localhost:5500/HTML/signup.html'); 
}); 

document.getElementById('my-get-button-2').addEventListener('click', ()=>{
    window.open('http://localhost:5500/HTML/signup.html'); 
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

// eta home page er jonno js file 


// colo output deki 