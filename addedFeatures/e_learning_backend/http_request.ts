fetch("http://localhost:3000/schedule/add_schedule",{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        "course_id": 1,
        "batch_id": 1,
        "teacher_id": 1,
        "room_id": 1,
        "start_time": new Date(Date.now()).toISOString(),
        "end_time": new Date(Date.now()).toISOString()
    })
})
    .then((response) => response.json())
    .then((data) => console.log(data));
