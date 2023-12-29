let ul= document.querySelector(".list-group")
let form= document.querySelector("#todoAddForm")
let input= document.querySelector("#todoName")
let card1= document.querySelectorAll(".card-body")[0]
let card2= document.querySelectorAll(".card-body")[1]
let temizle= document.querySelector("#clearButton")
let search= document.querySelector("#todoSearch")
let todos=[];
run()

function run(){
form.addEventListener("submit",addTodo)
addFromStorage();
card2.addEventListener("click",removeTodo)
temizle.addEventListener("click",removeAll)
search.addEventListener("keyup",TodosFilter)

}
function addTodo(e){
    e.preventDefault()
    let deger=input.value.trim() 
    if(deger==null || deger==""){
        showAlerts("warning","lütfen geçerli bir todo giriniz.");
    }else{
        addTodoToUI(deger)
        addTodoToStorage(deger)
        showAlerts("success","todo başarılı bir şekilde eklendi.");
        input.value=""
    }

}
function addTodoToUI(deger){
let li= document.createElement("li")
li.className="list-group-item d-flex justify-content-between"
li.textContent=deger

let a= document.createElement("a")
a.href="#"
a.className="delete-item"

let i= document.createElement("i")
i.className="fa fa-remove";

a.appendChild(i);
li.appendChild(a)
ul.appendChild(li);

}
function addTodoToStorage(deger){
   checkStorage();
   todos.push(deger);
   localStorage.setItem("todos", JSON.stringify(todos))
    
}
function checkStorage(){
if(localStorage.getItem("todos")===null){
    todos=[];
}else{
    todos= JSON.parse(localStorage.getItem("todos"))
}
}
function showAlerts(type, message){
    let div= document.createElement("div")
    div.className=`alert alert-${type} mt-4`
    div.textContent=message;

    card1.appendChild(div)

    setTimeout(() => {
        div.remove()
    }, 2500);
}
function addFromStorage(){
    checkStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo)
    })
}
function removeTodo(e){
    if(e.target.className==="fa fa-remove"){
        let deger= e.target.parentElement.parentElement;
        deger.remove();
        deleteFromStorage(deger.textContent)
        showAlerts("success","todo başarıyla silindi.")
    }
}
function deleteFromStorage(deger){
    checkStorage();
    todos.forEach(function(todo,index){
        if(todo==deger){
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}
function removeAll(){
    let alltodos= document.querySelectorAll(".list-group-item")
    alltodos.forEach(function(todo){
        if(alltodos.length>0){
            todo.remove()
            removeAllFromStorage()
        }else{
            showAlerts("warning","silmek için en az bir todo gerekli.")
        }
    })
    
}
function removeAllFromStorage(){
    checkStorage();
    if(todos.length>0){
        todos.forEach(function(todo,index){
            todos.splice(index,1)
        })
        localStorage.setItem("todos",JSON.stringify(todos))
    }
}
function TodosFilter(e){
let deger= e.target.value.toUpperCase().trim();
let alltodos= document.querySelectorAll(".list-group-item")
    alltodos.forEach(function(todo){
        if(todo.textContent.toUpperCase().trim().includes(deger)){
            todo.setAttribute("style","display:block")
        }else{
            todo.setAttribute("style","display:none !important")
        }
    })
}