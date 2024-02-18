let list = document.querySelector(".list")
let template_list = document.querySelector(".template")

let task_add = document.querySelector(".task_add")
let name_input = document.querySelector(".name_input")
let add_task_button = document.querySelector(".add_task_button")

function createTask(name) {
    let newTemp = template_list.cloneNode(true)
    newTemp.querySelector(".template_name").innerHTML = name
    newTemp.querySelector(".template_status").innerHTML = "Ongoing"
    newTemp.querySelector(".template_id").innerHTML = "#" + (list.childNodes.length + 1)
    
    list.append(newTemp)
    newTemp.style.display = "flex"

    let remove_button = newTemp.querySelector(".template_button_remove")
    remove_button.addEventListener("click", () => {
        newTemp.remove(true)
    })
}

add_task_button.addEventListener("click", () => {
    if (name_input.value != "") {
        createTask(name_input.value)
        name_input.value = ""
    }
})