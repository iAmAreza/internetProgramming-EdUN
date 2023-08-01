(async function on_contest_page_load() {
  // This function is called when the HTML file is loaded
  try {
      const queryString = window.location.search;
      // console.log(queryString);
      const urlParams = new URLSearchParams(queryString);
      const contest_id = urlParams.get('contest_id');
      console.log(contest_id);
      console.log("Ok")
  } catch (error) {
      console.log(error);
  }
})()