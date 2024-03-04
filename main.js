let list = document.querySelector(".list")
let template_list = document.querySelector(".template")

let task_add = document.querySelector(".task_add")
let name_input = document.querySelector(".name_input")
let add_task_button = document.querySelector(".add_task_button")

function loadData() {
    let items = localStorage.getItem("TODOs")
    if (items) {
        items = JSON.parse(items)
        list.innerHTML = ""

        for (let i = 1; i < Object.keys(items).length + 1; i++) {
            let currentItem = items[i]
            createTask(i, currentItem.name, currentItem.status, false)
        }
    }
}

function saveData(id, name, status) {
    let items = localStorage.getItem("TODOs")
    if (items) {
        items = JSON.parse(items)
        items[id] = {name: name, status: status}
        items = JSON.stringify(items)
        localStorage.setItem("TODOs", items)
    } else {
        localStorage.setItem("TODOs", JSON.stringify({1: {name: name, status: status}}))
    }
}

function createTask(id, name_, status_, savable) {
    let newTemp = template_list.cloneNode(true)
    let status = newTemp.querySelector(".template_status")
    let remove_button = newTemp.querySelector(".template_button_remove")
    let edit_button = newTemp.querySelector(".template_button_edit")

    newTemp.querySelector(".template_name").innerHTML = name_
    status.innerHTML = status_
    newTemp.querySelector(".template_id").innerHTML = "#" + id
    
    list.append(newTemp)
    newTemp.style.display = "flex"

    if (savable) {
        saveData(id, name_, status_)
    }

    remove_button.addEventListener("click", () => {
        let items = localStorage.getItem("TODOs")
        items = JSON.parse(items)

        newTemp.remove(true)

        for (let i = id; i < Object.keys(items).length + 1; i++) {
            let nextItem = items[i + 1]

            delete items[i]
            delete items[i + 1]

            items[i] = nextItem
        }
        
        localStorage.setItem("TODOs", JSON.stringify(items))

        loadData()
    })

    edit_button.addEventListener("click", () => {
        if (status.innerHTML == "In order") {
            status.innerHTML = "Ongoing"
        } else if (status.innerHTML == "Ongoing") {
            status.innerHTML = "Completed"
        } else if (status.innerHTML == "Completed") {
            status.innerHTML = "In order"
        }

        let items = localStorage.getItem("TODOs")
        items = JSON.parse(items)
        items[id].status = status.innerHTML

        localStorage.setItem("TODOs", JSON.stringify(items))
    })
}

loadData()

add_task_button.addEventListener("click", () => {
    if (name_input.value != "") {
        createTask(list.childNodes.length + 1, name_input.value, "In order", true)
        name_input.value = ""
    }
})