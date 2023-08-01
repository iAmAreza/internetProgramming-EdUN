let global_response_data;
let contest_id;
let problem_idx;
(async function on_contest_page_load() {
    // This function is called when the HTML file is loaded
    try {
        const queryString = window.location.search;
        // console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
         contest_id = urlParams.get('contest_id');
         problem_idx = urlParams.get('problem_idx');
        if (!contest_id || !problem_idx) {
            window.open(document.location.origin + `/HTML/contestPage.html`, "_self");
            return;
        }
        let url = `http://localhost:3000/problem/get_all_problem_of_contest`;
        let access_token = localStorage.getItem("access_token");

        if (access_token) {
            const auth_header = 'Bearer ' + access_token;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token.replace(/["]+/g, '')
                },
                body: JSON.stringify({
                    contest_id: Number.parseInt(contest_id)
                })
            })
            const responseData = await res.json();
            const data = make_contest_problem_response(responseData);
            global_response_data = data;
            {
                let pagination = document.getElementById("pagination");
                pagination.innerHTML = `<a onclick="goto_problem_page(${contest_id},${Number.parseInt(problem_idx) - 1})">&laquo;</a>`;
                for (let i = 0; i < data.codingProblems.length; i++) {
                    if (i + 1 == problem_idx) {
                        pagination.innerHTML += `<a class="active" onclick="goto_problem_page(${contest_id},${i + 1})">${i + 1}</a>`
                    }
                    else {
                        pagination.innerHTML += `<a onclick="goto_problem_page(${contest_id},${i})">${i + 1}</a>`
                    }
                }
                pagination.innerHTML += `<a onclick="goto_problem_page(${contest_id},${Number.parseInt(problem_idx) + 1})">&raquo;</a>`;
            }
            console.log(data);
            const codingProblems = data.codingProblems;
            if (1 > problem_idx || problem_idx > codingProblems.length) {
                window.open(document.location.origin + `/HTML/contestPage.html?contest_id=${contest_id}&problem_idx=1`, "_self");
                return;
            }
            const statement_of_problem = document.getElementById("statement_of_problem");
            statement_of_problem.innerHTML =`<h1>Problem Statement</h1>`+ responseData['codingProblems'][0]['problem_statement'];
            const sample_input = document.getElementById("sample_input");
            sample_input.innerHTML = `<h1>Input</h1><p class="sample-input">${responseData['codingProblems'][0]['inputoutput'][0]['input']}</p>`;
            const sample_output = document.getElementById("sample_output");
            sample_output.innerHTML = `<h1>Output</h1><p class="sample-input">${responseData['codingProblems'][0]['inputoutput'][0]['output']}</p>`;

        } else {
            window.open(document.location.origin + '/HTML/signup.html', "_self");
        }
    } catch (error) {
        console.log(error);
    }
})()

function show_feedback_modal(title,message){
    let modal_message = document.getElementById("modal_message");
    let modal_title = document.getElementById("modal_title");
    modal_title.innerText = title;
    modal_message.innerText = message;
   let body = document.getElementsByTagName("body")[0];
    body.innerHTML+=`<div class="modal-backdrop fade show"></div>`;
    body.classList.add("modal-open");
    body.style.overflow = "hidden";
    body.style.paddingRight = "15px";

    let modal = document.getElementById("exampleModal");
    modal.classList.add("show");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("role", "dialog");
    modal.removeAttribute("aria-hidden");
    modal.style.display = "block";
}
function close_modal() {
    // Remove the modal backdrop
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  
    // Reset the body styles
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("modal-open");
    body.style="";
  
    // Hide the modal
    const modal = document.getElementById("exampleModal");
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
  }
  


async function submitCode(){
    let language = document.getElementById("languages").value;
    console.log(language);
    console.log(editor.getValue());
    const url = 'http://localhost:3000/problem/submit_problem';
    const payload = {
        source_code: editor.getValue(),
        programming_language: language,
        problem_id: global_response_data.codingProblems[Number.parseInt(problem_idx)-1].id,
    };
    let access_token = localStorage.getItem("access_token");
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token.replace(/["]+/g, '')
            },
            body: JSON.stringify(payload)
        })
        const responseData = await response.json();
        console.log(responseData);
        if(responseData['message']==="Accepted"){
            show_feedback_modal(" Congratulation ","Your code is accepted");
        }else{
            show_feedback_modal(" Opps ","Your code is not accepted");
        }
    } catch (error) {
        console.error('Error occurred during compilation:', error.message);
    }
}


class ContestProblemIO {
    constructor(id, is_public, input, output, contestProblemId) {
        this.id = id;
        this.is_public = is_public;
        this.input = input;
        this.output = output;
        this.contestProblemId = contestProblemId;
    }
}
class ContestProblem {
    constructor(id, problem_statement, contestId, inputoutput) {
        this.id = id;
        this.problem_statement = problem_statement;
        this.contestId = contestId;
        this.inputoutput = inputoutput;
    }
}
class ContestProblemResponse {
    constructor(id, name, description, start_time, end_time, codingProblems) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.start_time = start_time;
        this.end_time = end_time;
        this.codingProblems = codingProblems;
    }
}
function make_contest_problem_response(_response_data) {
    // Parse the response using the custom classes
    const contestProblems = _response_data.codingProblems.map(problem => {
        const inputOutputData = problem.inputoutput.map(io => new ContestProblemIO(io.id, io.is_public, io.input, io.output, io.contestProblemId));
        return new ContestProblem(problem.id, problem.problem_statement, problem.contestId, inputOutputData);
    });

    const response = new ContestProblemResponse(
        _response_data.id,
        _response_data.name,
        _response_data.description,
        new Date(_response_data.start_time),
        new Date(_response_data.end_time),
        contestProblems,
    );
    return response;
}

function goto_problem_page(contest_id, problem_idx) {
    window.open(document.location.origin + `/HTML/contestPage.html?contest_id=${contest_id}&problem_idx=${problem_idx}`, "_self");
}