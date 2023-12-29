let form1= document.querySelectorAll(".card-body")[0]
let form2= document.querySelectorAll(".card-body")[1]
let input= document.querySelector("#todoName")
let search= document.querySelector("#todoSearch")
let ul= document.querySelector(".list-group")
let clear= document.querySelector("#clearButton")
let todos=[]
run();


function run(){
form1.addEventListener("submit",addTodo);
form2.addEventListener("click",removeTodo)
clear.addEventListener("click",removeAll) 
search.addEventListener("keyup", filter)
bringFromStorage();    
}
function showAlert(sinif,mesaj){
let div= document.createElement("div")
div.className=`alert alert-${sinif}`
div.textContent=mesaj
div.role="alert"
form1.appendChild(div);
setTimeout(()=>{
    div.remove()
},2500)
}

function addTodo(e){
    e.preventDefault()
    let deger= input.value.trim()
    if(deger==null||deger==""){
        showAlert("warning","lütfen geçerli bir todo giriniz.")
    }else{
        addTodoToUI(deger)
        addTodoToStorage(deger)
        showAlert("success","todo girişi başarılı.")
        input.value=""
    }
}

function addTodoToUI(deger){
let li= document.createElement("li")
li.className="list-group-item d-flex justify-content-between"
li.textContent=deger

let a= document.createElement("a")
a.href="#"

let i= document.createElement("i")
i.className="fa fa-remove"

a.appendChild(i)
li.appendChild(a)
ul.appendChild(li)
}

function addTodoToStorage(deger){
todos.push(deger);
localStorage.setItem("todos",JSON.stringify(todos))
}

function bringFromStorage(){
    checkStorage()
    todos.forEach(function(todo){
        addTodoToUI(todo)
    })
}

function checkStorage(){
   if(localStorage.getItem("todos")===null){
    todos
   }else{
    todos= JSON.parse(localStorage.getItem("todos"));
   }
}

function removeTodo(e){
    let deger= e.target
    if(deger.className=="fa fa-remove"){
    deger= deger.parentElement.parentElement
    removeFromStorage(deger.textContent)
    deger.remove()
    } 
}

function removeFromStorage(deger){
checkStorage();
todos.forEach(function(todo,index){
    if(todo==deger){
        todos.splice(index,1)
        localStorage.setItem("todos",JSON.stringify(todos))
    }
})
}

function removeAll(){
let deger= document.querySelectorAll(".list-group-item")
if(deger.length>0){
    for(let i=0; i<deger.length;i++){
        deger[i].remove()
    }
    todos=[]
    localStorage.setItem("todos", JSON.stringify(todos))
    }else{
        showAlert("warning","silmek için en az bir todo gerekli.")
    }
}
function filter(){
let deger= search.value.trim()
let data= document.querySelectorAll(".list-group-item")
data.forEach(function(list){
    if(list.textContent.trim().toUpperCase().includes(deger.toUpperCase())){
        list.setAttribute("style", "display:block")
    }else{
        list.setAttribute("style", "display:none !important")
    }
})
}