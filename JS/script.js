const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container-1');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
}); 




var golbalTrue = false; 
var flag = 0; 

document.getElementById('signBtn').addEventListener('click',() =>{ 
	
	const takePass = document.getElementById('pass');  
	const takeAnotherPass =document.getElementById('confirmPass'); 
	if(takePass.value === takeAnotherPass.value){
		console.log('correct');  
		golbalTrue = true; 
	}
	else {
		console.log('incorrect'); 
		const getpara = document.getElementById('takepara'); 
		getpara.style.display = 'block'; 
		golbalTrue = false; 
		flag = 1; 
	}
})

// document.getElementById('signBtn').addEventListener('click', ()=>{
// 	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
//     const mailaddress = document.getElementById('mymail'); 
// 	if(mailaddress.value.match(mailformat)){
// 		console.log('valid email'); 
// 		golbalTrue = true; 
// 	}
// 	else {
// 		console.log('Invalid Email');
// 		golbalTrue = false;  
// 		flag = 1; 
// 	}
// })
// document.getElementById('signBtn').addEventListener('click', ()=>{
// 	var userName =  "^[A-Za-z][A-Za-z0-9_]{4,29}$"; 
// 	const getName = document.getElementById('userName'); 
// 	if(getName.value.match(userName)){
//        console.log('valid name format'); 
// 	   golbalTrue = true; 
// 	}
// 	else {
// 		const paraContet = document.getElementById('paragraph'); 
// 		paraContet.style.display = 'block'; 
// 		golbalTrue = false; 
// 		flag = 1; 
// 	}
	
// }) 


// document.getElementById('signBtn').addEventListener('click',()=>{
// 	if(flag === 0) {
// 		window.alert("Congratulations!!! You have signed successfully"); 
// 	} else {
// 		window.alert('Sorry ! You have enter invalid information')
// 	}
// })
