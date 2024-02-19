let list = document.querySelector(".list")
let template_list = document.querySelector(".template")

let task_add = document.querySelector(".task_add")
let name_input = document.querySelector(".name_input")
let add_task_button = document.querySelector(".add_task_button")

function createTask(name) {
    let newTemp = template_list.cloneNode(true)
    newTemp.querySelector(".template_name").innerHTML = name
    let status = newTemp.querySelector(".template_status")
    status.innerHTML = "In order"
    newTemp.querySelector(".template_id").innerHTML = "#" + (list.childNodes.length + 1)
    
    list.append(newTemp)
    newTemp.style.display = "flex"

    let remove_button = newTemp.querySelector(".template_button_remove")
    let edit_button = newTemp.querySelector(".template_button_edit")

    remove_button.addEventListener("click", () => {
        newTemp.remove(true)
    })

    edit_button.addEventListener("click", () => {
        if (status.innerHTML == "In order") {
            status.innerHTML = "Ongoing"
        } else if (status.innerHTML == "Ongoing") {
            status.innerHTML = "Completed"
        } else if (status.innerHTML == "Completed") {
            status.innerHTML = "In order"
        }
    })
}

add_task_button.addEventListener("click", () => {
    if (name_input.value != "") {
        createTask(name_input.value)
        name_input.value = ""
    }
})