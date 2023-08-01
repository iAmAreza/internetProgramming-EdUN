let editor;
window.onload = function () {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.setOptions({
        fontSize: "15px" // Set the desired font size here
    });
    editor.session.setMode("ace/mode/c_cpp");
    editor.setOption("wrap", true);
}

function runCode() {
    async function compileCpp(code) {
        const url = 'http://localhost:3000/coderunner/create_submission';
        const payload = {
            script: code,
            language: document.getElementById("languages").value,
            versionIndex: '0',
            stdin:""
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.post(url, payload, config);
            let output = response.data?.output;
            output=output.replaceAll("\n","<br>")
            let x = document.getElementById("output")
            x.innerHTML = "<strong>Output:</strong> <br> <br>" + output;
            x.style.fontSize = "1.1rem";
            x.style.margin = "2em";
            // console.log(output);
        } catch (error) {
            console.error('Error occurred during compilation:', error.message);
        }
    }

    const code = editor.getValue();

    compileCpp(code);
}
function Toggle() {
    console.log("clicked");
    document.querySelector('.inOut').classList.toggle("toggle");
    document.querySelector('.editor').classList.toggle("toggle-editor");
    document.querySelector('.output').classList.toggle("toggle-output");
}
function changeLanguage() {
    let language = document.getElementById("languages").value;
    if(language == 'c' || language == 'cpp17')editor.session.setMode("ace/mode/c_cpp");
    else if(language == 'php')editor.session.setMode("ace/mode/php");
    else if(language == 'python3')editor.session.setMode("ace/mode/python");
    else if(language == 'nodejs')editor.session.setMode("ace/mode/javascript");
}
function submitCode() {
    async function compileCpp(code) {
        const url = 'http://localhost:3000/coderunner/create_submission';
        const payload = {
            script: editor.getValue(),
            language:document.getElementById("languages").getValue(),
            versionIndex: '0',
            stdin:""
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.post(url, payload, config);
            let output = response.data?.output;
            output=output.replaceAll("\n","<br>")
            let x = document.getElementById("output")
            x.innerHTML = "<strong>Output:</strong> <br> <br>" + output;
            x.style.fontSize = "1.1rem";
            x.style.margin = "2em";
            // console.log(output);
        } catch (error) {
            console.error('Error occurred during compilation:', error.message);
        }
    }

    const code = editor.getValue();

    compileCpp(code);
}


