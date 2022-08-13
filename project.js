let projects = []



let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
]

function addProject(event) {
    event.preventDefault()

    let inputName = document.getElementById("inputProjectName").value
    let inputContent = document.getElementById("inputDescription").value
    let inputImage = document.getElementById("inputImage").files[0]
    let startDate= document.getElementById("inputStartDate").value
    let endDate= document.getElementById("inputEndDate").value
    

    inputImage = URL.createObjectURL(inputImage)

    let cardIcons = {
        html: document.querySelector('input[name="checkHtml"]').checked,
        css: document.querySelector('input[name="checkCss"]').checked,
        nodeJs: document.querySelector('input[name="checkNode"]').checked,
        reactJs: document.querySelector('input[name="checkReact"]').checked
    }

    let project = {
        title: inputName,
        startDate:startDate,
        endDate:endDate,
        content: inputContent,
        icons: cardIcons,
        image: inputImage
    }

    projects.push(project)

    console.table(projects)
    renderCard()
}

function getProjectDuration(endDate, startDate) {

    const distance = endDate - startDate

    const miliseconds = 1000
    const secondInMinute = 60
    const minuteInHour = 60
    const secondInHour = secondInMinute * minuteInHour // 3600
    const hourInDay = 24
    const dayInMonth = 30
    const monthInYear = 12

    let monthDistance = distance / (miliseconds * secondInHour * hourInDay * dayInMonth)
    let dayDistance = distance / (miliseconds * secondInHour * hourInDay)

    if (monthDistance >= 12) {
        return `${Math.floor(monthDistance / monthInYear)}` + ` Year`
    } else if(dayDistance >= 30){
        return `${Math.floor(dayDistance/dayInMonth)}` + ' Month'
    }else{
        return `${Math.floor(dayDistance)}` + ' day'
    }

}

function renderCard() {

    let containerProject = document.getElementById("contents")
    containerProject.innerHTML = '';

    const objectProjectString = JSON.stringify(projects);

    for (let i = 0; i < projects.length; i++) {

        const startDateVariable = new Date(projects[i].startDate)
        const endDateVariable = new Date(projects[i].endDate)
        const duration = getProjectDuration(endDateVariable, startDateVariable)

        localStorage.setItem(`${projects[i].title}`, objectProjectString);

        containerProject.innerHTML += `
        <div id="contents" class="mp-card">
            <!--MPC = My Project Card-->
            <div class="mpc-img">
                <img src="${projects[i].image}" alt="">
            </div>
            <div class="mpc-title">
            <a href="project-details.html?${projects[i].title}" id='${projects[i].title}' target="_blank" action="project-details.html?${projects[i].title}">
                <p>${projects[i].title}</p>
            </a>
            </div>
            <div class="mpc-duration">
                <small>Durasi: ${duration}</small>
            </div>
            <div class="mpc-content">
                ${projects[i].content}
            </div>
            <div class="mpc-icons">
                ${(projects[i].icons.html === true) ? '<i class="fa-brands fa-html5"></i>' : ''}
                ${(projects[i].icons.css === true) ? '<i class="fa-brands fa-css3-alt"></i>' : ''}
                ${(projects[i].icons.nodeJs === true) ? '<i class="fa-brands fa-node-js"></i>' : ''}
                ${(projects[i].icons.reactJs === true) ? '<i class="fa-brands fa-react"></i>' : ''}  
            </div>
            <div class="mpc-mod">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
        `
    }
}
