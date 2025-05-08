let answer = new Array(10).fill("")
let score = 0
let curTopic
let type
let lastVideo;
gotoQuizPage = (url) => {
    window.location.href = url;
}
checkButtonStatus = (c) => {
    
    let prev = document.querySelector('.prev')
    let next = document.querySelector('.next')
    prev.style.opacity = "1"
    next.style.opacity = "1"
    if(c === 1) {
        prev.style.opacity = "0.1"
    }
    else if (c === 5) {
        next.style.opacity = "0.1"
    }

}
loadLast = () => {
    let cur = localStorage?.getItem('now') || ("HTML")
    lastVideo = (localStorage?.getItem(cur) || `${cur}1`)
    document.querySelector('.video-name').innerText = `${cur} for beginners | Part-${lastVideo[lastVideo.length - 1]}`
    document.querySelector('.course-name').innerText = `Web Development for Beginners: ${cur}`
    document.querySelector('source').setAttribute('src', `../../videos/${cur}/${lastVideo}.mp4`)
    document.querySelector('.video').load()
    localStorage.setItem('now', cur)
    localStorage.setItem(cur, lastVideo)
    selectedLink()
    checkButtonStatus(Number(lastVideo[lastVideo.length - 1]))
}
changeVideo = (event) => {
    let cur = localStorage.getItem('now')
    lastVideo = localStorage.getItem(cur);
    let c = Number(lastVideo[lastVideo.length - 1])
    if (event.innerText === "Prev") c = c - 1;
    else c = c + 1;
    if(c > 5) c = 5;
    if(c < 1) c = 1;
    checkButtonStatus(c)
    document.querySelector('.video-name').innerText = `${cur} for beginners | Part-${c}`
    document.querySelector('source').setAttribute('src', `../../videos/${cur}/${cur}${c}.mp4`)
    document.querySelector('.video').load()
    localStorage.setItem(cur, `${cur}${c}`)
}
function getCurrent(now) {
    type = now.innerText;
    console.log(type)
    localStorage.setItem('now', type)
    lastVideo = (localStorage?.getItem(type) || `${type}1`)
    document.querySelector('.video-name').innerText = `${type} for beginners | Part-${lastVideo[lastVideo.length - 1]}`
    document.querySelector('.course-name').innerText = `Web Development for Beginners: ${type}`
    document.querySelector('source').setAttribute('src', `../../videos/${type}/${lastVideo}.mp4`)
    document.querySelector('.video').load()
    selectedLink()
    checkButtonStatus(Number(lastVideo[lastVideo.length - 1]))
}

selectedLink = () => {
    document.querySelectorAll('.topic-list > li').forEach(now => {
        if (now.innerText === localStorage.getItem('now')) {
            now.style.backgroundColor = "#3ac162"
        }
        else now.style.backgroundColor = "#282A35"
    })
}

toggleEditor = () => {
    let x = document.querySelector('.IDE-container')
    x.classList.toggle("showEditor")
}

function getQuiz() {
    selectedLink()
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
    type = localStorage.getItem('now')
    curTopic = quiz[type]
    let quizContainer = `<h1 class = "testLearning">Test your knowledge with our exciting ${type} quiz!🔥</h1>`
    quizContainer += '<h1 class = "scoreboard" style = "display: none">You have got <span class = "score"></span> out of 10</h1>'
    curTopic.forEach((obj, index) => {
        quizContainer +=
            `
            <p class = "statement">${index + 1}. ${obj.statement}</p>
            <p class = "q_${index + 1} options" onclick = "takeAnswer(this)">${obj.option1}</p>
            <p class = "q_${index + 1} options" onclick = "takeAnswer(this)">${obj.option2}</p>
            <p class = "q_${index + 1} options" onclick = "takeAnswer(this)">${obj.option3}</p>
            <p class = "q_${index + 1} options" onclick = "takeAnswer(this)">${obj.option4}</p>
            `
    })
    quizContainer += '<div class = "button-container"><button class="submit" onclick = "calculateScore()">Submit Answer</button></div>'
    let x = document.querySelector('.quiz')
    x.innerHTML = quizContainer
    answer.fill("", 0, 10)
    score = 0
}
function takeAnswer(element) {
    let curr = element.className.split(' ')[0]
    document.querySelectorAll(`.${curr}`).forEach((cur_element) => {
        if (cur_element.style.backgroundColor === "rgb(71, 194, 110)") cur_element.style.backgroundColor = "#b2e2c1"
    })
    let index = parseInt(curr.split('_')[1])
    answer[index - 1] = element.innerText
    element.style.backgroundColor = "#47c26e"
}
function calculateScore() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    curTopic.forEach((q, index) => {
        document.querySelectorAll(`.q_${index + 1}`).forEach(now => {
            if (now.innerText === q.ans) now.style.backgroundColor = "#086d26"
            else if (now.innerText === answer[index] || answer[index] === "") {
                now.style.backgroundColor = "rgb(216, 70, 99)"
            }
        })
        if (q.ans === answer[index]) score += 1;
    })
    document.querySelector('.score').textContent = score
    document.querySelector('.scoreboard').style.display = "block"
   
}




const quiz = {
    HTML: [
        {
            statement: "HTML stands for _______",
            option1: "HyperText Markup Language",
            option2: "HyperText Machine Language",
            option3: "HyperText Marking Language",
            option4: "HighText Marking Language",
            ans: "HyperText Markup Language",
        }

        ,

        {
            statement: "In which part of the HTML metadata is contained?",
            option1: "head tag",
            option2: "title tag",
            option3: "html tag",
            option4: "body tag",
            ans: "head tag",
        }
        ,
        {
            statement: "Which of the following is not a HTML5 tag?",
            option1: "iframe",
            option2: "video",
            option3: "slide",
            option4: "source",
            ans: "slide",
        }
        ,
        {
            statement: "Which of the following is not a HTML5 tag?",
            option1: "iframe",
            option2: "video",
            option3: "slide",
            option4: "source",
            ans: "slide",
        }
        ,

        {
            statement: "In HTML, which attribute is used to create a link that opens in a new window tab?",
            option1: `src=”_blank”`,
            option2: `alt=”_blank”`,
            option3: `target=”_self”`,
            option4: `target=”_blank”`,
            ans: `target=”_blank”`
        }
        ,
        {
            statement: "Which HTML element is used for YouTube videos?",
            option1: "samp",
            option2: "small",
            option3: "frame",
            option4: "iframe",
            ans: "iframe",
        }
        ,
        {
            statement: "Which of the following HTML element is used for canvas graphics?",
            option1: "css",
            option2: "paint",
            option3: "canvas",
            option4: "graphic",
            ans: "canvas",
        }
        ,
        {
            statement: " Which tag is used to create a dropdown in HTML Form?",
            option1: "input",
            option2: "select",
            option3: "text",
            option4: "textarea",
            ans: "select"
        }
        ,
        {
            statement: "What is the correct syntax of web address?",
            option1: "port://domain.filenmae:path/scheme/prefix",
            option2: "prefix://scheme.port:domain/filename/path",
            option3: "path://prefix.port:domain/filename/scheme",
            option4: "scheme://prefix.domain:port/path/filename",
            ans: "scheme://prefix.domain:port/path/filename",
        },
        {
            statement: "Which of the following HTML tag is used to create an unordered list?",
            option1: "ol",
            option2: "ul",
            option3: "li",
            option4: "ll",
            ans: "ul",
        }


    ],
    CSS: [

        {
            statement: "What is CSS?",
            option1: "CSS is a style sheet language",
            option2: "CSS is designed to separate the presentation and content, including layout, colors, and fonts",
            option3: "CSS is the language used to style the HTML documents",
            option4: "All of the mentioned",
            ans: "All of the mentioned",
        }
        ,
        {
            statement: "Which of the following CSS selectors are used to specify a group of elements?",
            option1: "tag",
            option2: "id",
            option3: "class",
            option4: "both class and tag",
            ans: "class",
        }
        ,
        {
            statement: "Which of the following CSS framework is used to create a responsive design?",
            option1: "django",
            option2: "rails",
            option3: "larawell",
            option4: "bootstrap",
            ans: "bootstrap",
        }
        ,
        {
            statement: " Which of the following type of HTML tag is used to define an internal style sheet?",
            option1: "script",
            option2: "link",
            option3: "class",
            option4: "style",
            ans: "style",
        }
        ,
        {
            statement: "Which of the following CSS style property is used to specify an italic text?",
            option1: "style",
            option2: "font",
            option3: "font-style",
            option4: "@font-face",
            ans: "font-style",
        }
        ,
        {
            statement: "Which of the following function defines a linear gradient as a CSS image?",
            option1: "gradient()",
            option2: "linear-gradient()",
            option3: "grayscale()",
            option4: "image()",
            ans: "linear-gradient()",
        }
        ,
        {
            statement: "Which of the following is the correct way to apply CSS Styles?",
            option1: "in an external CSS file",
            option2: "inside an HTML element",
            option3: "inside the <head> section of an HTML page",
            option4: "all of the mentioned",
            ans: "all of the mentioned",

        }
        ,
        {
            statement: "Which of the following is not the property of the CSS box model?",
            option1: "margin",
            option2: "color",
            option3: "width",
            option4: "height",
            ans: "color",
        }
        ,
        {
            statement: "Which of the following CSS property is used to set the color of the text?",
            option1: "text-decoration",
            option2: "pallet",
            option3: "colour",
            option4: "color",
            ans: "color",
        }
        ,
        {
            statement: "Which of the following CSS selector selects the elements that are checked?",
            option1: ":checked",
            option2: "E ~ F",
            option3: "::after",
            option4: "none of the mentioned",
            ans: ":checked",
        }


    ],
    Javascript: [

        {
            statement: "Which of the following is correct about JavaScript?",
            option1: "JavaScript is an Object-Based language",
            option2: "JavaScript is Assembly-language",
            option3: "JavaScript is an Object-Oriented language",
            option4: "JavaScript is a High-level language",
            ans: "JavaScript is an Object-Based language",
        }
        ,
        {
            statement: "Arrays in JavaScript are defined by which of the following statements?",
            option1: "It is an ordered list of values",
            option2: "It is an ordered list of objects",
            option3: "It is an ordered list of string",
            option4: "It is an ordered list of functions",
            ans: "It is an ordered list of values",
        }
        ,
        {
            statement: "Which of the following is not javascript data types?",
            option1: "Null type",
            option2: "Undefined type",
            option3: "Number type",
            option4: "All of the mentioned",
            ans: "All of the mentioned",
        }
        ,
        {
            statement: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
            option1: "Position",
            option2: "Window",
            option3: "Standard",
            option4: "Location",
            ans: "Window",
        }
        ,
        {
            statement: "Which of the following can be used to call a JavaScript Code Snippet?",
            option1: "Function/Method",
            option2: "Preprocessor",
            option3: "Triggering Event",
            option4: "RMI",
            ans: "Function/Method",
        }
        ,
        {
            statement: "Which of the following scoping type does JavaScript use?",
            option1: "Sequential",
            option2: "Segmental",
            option3: "Lexical",
            option4: "Literal",
            ans: "Lexical",
        }
        ,
        {
            statement: "Which of the following methods/operation does javascript use instead of == and !=?",
            option1: "JavaScript uses equalto()",
            option2: "JavaScript uses equals() and notequals() instead",
            option3: "JavaScript uses bitwise checking",
            option4: "JavaScript uses === and !== instead",
            ans: "JavaScript uses === and !== instead",
        }
        ,
        {
            statement: "Why event handlers is needed in JS?",
            option1: "Allows JavaScript code to alter the behaviour of windows",
            option2: "Adds innerHTML page to the code",
            option3: "Change the server location",
            option4: "Performs handling of exceptions and occurrences",
            ans: "Allows JavaScript code to alter the behaviour of windows",
        }
        ,
        {
            statement: "Which of the following is the property that is triggered in response to JS errors?",
            option1: "onclick",
            option2: "onerror",
            option3: "onmessage",
            option4: "onexception",
            ans: "onerror",
        }
        ,
        {
            statement: "Why event handlers is needed in JS?",
            option1: "Allows JavaScript code to alter the behaviour of windows",
            option2: "Adds innerHTML page to the code",
            option3: "Change the server location",
            option4: "Performs handling of exceptions and occurrences",
            ans: "Allows JavaScript code to alter the behaviour of windows",
        }


    ],
    React: [

        {
            statement: "Which of the following are the advantages of React.js?",
            option1: "React.js can increase the application's performance with Virtual DOM.",
            option2: "React.js is easy to integrate with other frameworks such as Angular, BackboneJS since it is only a view library.",
            option3: "React.js can render both on client and server side.",
            option4: "All of the above",
            ans: "All of the above",
        }
        ,
        {
            statement: "Which of the following command is used to install create-react-app?",
            option1: "npm install -g create-react-app",
            option2: "npm install create-react-app",
            option3: "npm install -f create-react-app",
            option4: "install -g create-react-app",
            ans: "npm install -g create-react-app",
        }
        ,
        {
            statement: "What of the following is used in React.js to increase performance?",
            option1: "Original DOM",
            option2: "Virtual DOM",
            option3: "Both A and B.",
            option4: "None of the above.",
            ans: "Virtual DOM",
        }
        ,
        {
            statement: "Which of the following acts as the input of a class-based component?",
            option1: "Class",
            option2: "Factory",
            option3: "Render",
            option4: "Props",
            ans: "Props",
        }
        ,
        {
            statement: "Which of the following keyword is used to create a class inheritance?",
            option1: "Create",
            option2: "Inherits",
            option3: "Extends",
            option4: "This",
            ans: "Extends",
        }
        ,
        {
            statement: "What is the default port where webpack-server runs?",
            option1: "3000",
            option2: "5000",
            option3: "8080",
            option4: "6060",
            ans: "8080",
        }
        ,
        {
            statement: "How many numbers of elements a valid react component can return?",
            option1: "1",
            option2: "2",
            option3: "4",
            option4: "5",
            ans: "1",
        }
        ,
        {
            statement: "What is the declarative way to render a dynamic list of components based on values in an array?",
            option1: "Using the reduce array method",
            option2: "Using the <Each /> component",
            option3: "Using the Array.map() method",
            option4: "With a for/while loop",
            ans: "Using the Array.map() method",
        }
        ,
        {
            statement: "How many ways of defining your variables in ES6?",
            option1: "1",
            option2: "3",
            option3: "4",
            option4: "5",
            ans: "3",
        }
        ,
        {
            statement: "What is a state in React?",
            option1: "A permanent storage.",
            option2: "Internal storage of the component.",
            option3: "External storage of the component.",
            option4: "None of the above.",
            ans: "Internal storage of the component.",
        }

    ]

};

