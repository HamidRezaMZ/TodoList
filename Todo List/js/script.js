// get todos from localStorage
let todos = localStorage.getItem("todos")
// try parse data or null
try {
    todos = json.parse(todos)
    todos = todos.length ? todos : null
} catch (e) {
    todos = null
}
// set default values if todos =null
if (!todos) {
    todos = [
        {content: "Shopping", status: true},
        {content: "Watching", status: true},
        {content: "Programming", status: true},
        {content: "Gaming", status: true},
    ]
    localStorage.setItem("todos", JSON.stringify(todos))
}

// func to create or update todos list in UI
function createTodos(todos) {
    let todosList = document.querySelector("#todos-list")
    todosList.innerHTML = ""

    //create list tag for each todo

    todos.forEach((todo, index) => {
        let li = document.createElement("li")
        li.className = "list-group-item"
        let content = document.createElement("span")
        content.textContent = todo.content
        content.style.textDecoration = todo.status ? "initial" : "line-through"
        let deleteBtn = document.createElement("img")
        deleteBtn.src = "media/delete.png"
        deleteBtn.alt = "Delete Icon"
        deleteBtn.className = "float-right"

        // append content and delete btn to li
        li.append(content)
        li.append(deleteBtn)

        // append li to todosList
        todosList.append(li)
        deleteBtn.addEventListener("click", ev => {
            todos.splice(index, 1)
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })

        // add complete func
        content.addEventListener("click", ev => {
            todos[index].status = !todos[index].status
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })
    })
}

createTodos(todos)


// action add & search

let actions = document.querySelector("#actions")

let formWrapper = document.querySelector(".form-wrapper")

Array.from(actions.children).forEach(action => {
    if (action.dataset.action == "add") {
        // add todo
        action.addEventListener("click", evt => {
            formWrapper.innerHTML = `
            <form action="" id="add">
                <input class="form-control" name="add" placeholder="Add Todo...">
            </form>
            `
            createTodos(todos)
            let add = document.querySelector("#add")
            add.addEventListener("submit", evt => {
                evt.className.add('is-valid')
                evt.preventDefault()
                if (add.add.value) {
                    todos.push({content: add.add.value, status: true})
                    localStorage.setItem("todos", JSON.stringify(todos))
                    add.textContent = ''
                    createTodos(todos)
                }
            })
        })
    } else if (action.dataset.action == "search") {
        // search todos
        action.addEventListener("click", evt => {
            formWrapper.innerHTML = `
            <form action="" id="search">
                <input class="form-control" name="search" placeholder="Search Todo...">
            </form>
            `
            let search = document.querySelector("#search")
            search.addEventListener("keydown", evt => {
                evt.className.add('is-valid')
                evt.preventDefault()
                if (search.search.value) {
                    let filterTodos = todos.filter(todo =>
                        todo.content.toLowerCase().includes(search.search.value.toLowerCase())
                    )
                    createTodos(filterTodos)
                }else{
                    createTodos(todos)

                }
            })
        })
    }
})
