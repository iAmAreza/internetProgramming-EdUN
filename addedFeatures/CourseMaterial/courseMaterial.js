let current_video_index = localStorage.getItem("current_video_index");
let current_video = document.getElementById("current_video");
let list_of_videos = document.getElementById("list_of_videos");
let course_title = document.getElementById("course_title");
let course_description = document.getElementById("course_description");
let youtube_video_data;

on_course_page_load = async () => {
    const queryString = window.location.search;
    // console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const course_id = urlParams.get('course_id')
    let url=`http://localhost:3000/course/get_course?course_id=${course_id}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    youtube_video_data = await res.json();
    course_title.innerHTML = youtube_video_data['playlist_title'];
    // course_description.innerHTML = youtube_video_data['playlist_description'];
    // console.log(youtube_video_data['playlist_title']);
    // console.log(youtube_video_data['playlist_description']);
    if (!current_video_index) {
        current_video_index = 0;
        localStorage.setItem('current_video_index', current_video_index)
    }
    // console.log(youtube_video_data['items'])
    let video_url = youtube_video_data['items'][current_video_index]['snippet']['resourceId']['videoId'];
    setVideo(video_url)
    setListOfVideo(youtube_video_data);
}
onListVideoClick = (idx) => {
    localStorage.setItem('current_video_index', idx)
    setVideo(youtube_video_data['items'][idx]['snippet']['resourceId']['videoId'])
}
setVideo = (video_url) => {
    current_video.innerHTML = `<iframe width="100%" height="100%"
    src="https://www.youtube.com/embed/${video_url}">
    </iframe>`;
}
setListOfVideo = (video_data) => {
    // console.log(video_data);
    let list_of_videos_html_data = "";
    for (let index = 0; index < video_data['items'].length; index++) {
        const temp_video_data = video_data['items'][index];
        
        const video_title= temp_video_data['snippet']['title'];
        if(video_title==="Private video"){
        continue;
        }
        const default_thumbnail_url= temp_video_data['snippet']['thumbnails']['default']['url'];
        
        list_of_videos_html_data = list_of_videos_html_data + `<div id="video_${index}" onclick="onListVideoClick(${index})"  class = "videos">
        <div class="video_thumb">
            <img src='${default_thumbnail_url}' width="100%" height="100%">
        </div>
        <div class="video_title">${video_title}</div>
        </div>`
    }
    list_of_videos.innerHTML = list_of_videos_html_data;
}






