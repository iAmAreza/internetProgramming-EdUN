let editor;
window.onload = function () {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.setOptions({
        fontSize: "15px", // Set the desired font size here
    });
    editor.session.setMode("ace/mode/html");
    editor.setOption("wrap", true);
}
function runCode() {
    var code = editor.getValue();
    var iframe = document.getElementById("iframe");
    var iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(code);
    iframeDoc.close();
}
// async function create_course(code) {
//     let data = JSON.stringify({
//         "name": "physcis",
//         "description": "a complete physcis course",
//         "youtube_playlist_url": "https://www.youtube.com/playlist?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg"
//     });
//     let config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'localhost:3000/course/create_course',
//         headers: {
//             'X-RapidAPI-Key': '7094797837msh864e897c2fbe982p1e57d5jsnf6e3a60db893',
//             'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
//             'Content-Type': 'application/json'
//         },
//         data: data
//     };
    

//     try {
//         const res=await axios.request(config);
//         const data=await res.data();
//         console.log(data);
            
//     } catch (error) {
//         console.error('Error occurred during compilation:', error.message);
//     }
// }
// function runCode() {
//     async function compileCpp(code) {
//         const url = 'http://localhost:3000/coderunner/create_submission';
//         const payload = {
//             script: code,
//             language: 'cpp',
//             versionIndex: '0',
//             stdin:""
//         };
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         };

//         try {
//             const response = await axios.post(url, payload, config);
//             let output = response.data?.output;
//             output=output.replaceAll("\n","<br>")
//             let x = document.getElementById("output")
//             x.innerHTML = "<strong>Output:</strong> <br> <br>" + output;
//             x.style.fontSize = "1.1rem";
//             x.style.margin = "2em";
//             // console.log(output);
//         } catch (error) {
//             console.error('Error occurred during compilation:', error.message);
//         }
//     }

//     const code = editor.getValue();

//     compileCpp(code);
// }
function Toggle() {
    console.log("clicked");
    document.querySelector('.inOut').classList.toggle("toggle");
    document.querySelector('.editor').classList.toggle("toggle-editor");
    document.querySelector('.output').classList.toggle("toggle-output");
}
// function changeLanguage() {

//     let language = $("#languages").val();

//     if(language == 'c' || language == 'cpp')editor.session.setMode("ace/mode/c_cpp");
//     else if(language == 'php')editor.session.setMode("ace/mode/php");
//     else if(language == 'python')editor.session.setMode("ace/mode/python");
//     else if(language == 'node')editor.session.setMode("ace/mode/javascript");
// }

// function executeCode() {

//     $.ajax({

//         url: "/ide/app/compiler.php",

//         method: "POST",

//         data: {
//             language: $("#languages").val(),
//             code: editor.getSession().getValue()
//         },

//         success: function(response) {
//             $(".output").text(response)
//         }
//     })
// }


// #include < bits / stdc++.h >
//     using namespace std;
// int main(){
//     for (int i = 0; i < 100; i++) cout << i << endl;
//     return 0;
// }