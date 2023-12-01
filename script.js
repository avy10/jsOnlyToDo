const todoList = document.getElementById("todo-container");
const addTodo = document.getElementById("add-button");


//EventListeners
	//global EL

	//specific EL

	
addTodo.addEventListener("click", () => {
  const newTodo = document.createElement("div");
  newTodo.className = "todo";
  const p = document.createElement("p");
  const inputFieldText = document.getElementById("text-field").value;
  p.innerText = `${counter++}.   ${inputFieldText}` ;
  newTodo.appendChild(p);
  todoList.appendChild(newTodo);
});
