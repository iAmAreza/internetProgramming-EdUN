(async function on_contest_page_load() {
  // This function is called when the HTML file is loaded
  try {
    const queryString = window.location.search;
    // console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const contest_id = urlParams.get('contest_id');
    console.log(contest_id);
    const data = await fetch(`http://localhost:3000/contest/get_scoreboard_of_contest?contest_id=${contest_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access_token").replace(/["]+/g, '')
      },
    })
    const responseData = await data.json();
    
    const contest_data=responseData['contest_data'];

    document.getElementById('contest_desc').innerText=contest_data['description'];
    document.getElementById('contest_name').innerText=contest_data['name'];
    const total_problems=contest_data['codingProblems'].length;

    const solution_data=responseData['solution_data'];


    const table_data=document.getElementById('table_data');
    for(let i=0;i<solution_data.length;i++){
      table_data.innerHTML+=`
      <tr>
          <td class="participant-rank">${i+1}</td>
          <td class="participant-name">${solution_data[i]['key']}</td>
          <td class="participant-score">${solution_data[i]['problem_solved']}/${total_problems}</td>
        </tr>
      `
    }
    console.log(responseData);
  } catch (error) {
    console.log("error",error);
  }
})()
