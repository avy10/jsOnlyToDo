/* 
Elem = HTML element
HC = live HTML Collection
Arr = array of
EL = event listener
Btn = button
 */
/* 
*/
// "use strict";
let currentListContainerHC = document.getElementsByClassName(
	"currentListContainer"
);
const bodyElem = document.querySelector("body");
const listNodesElem = document.querySelector(".listNodes");
let listNodesItemsHC = document.getElementsByClassName("listNodeItems");
let listNodeNameHC = document.getElementsByClassName("listNodeName");
let renameIFHC = document.getElementsByClassName("renameIF");
let removeListBtnHC = document.getElementsByClassName("removeListNode");
const addNewListBtn = document.getElementById("addNewList");

let footerElem = document.querySelector(".footer");

const addToDoIFElem = document.getElementById("text-field");
const toDoItemBoxHC = document.getElementsByClassName("todoItem");

//global functions
const extractIndex = (str, len) => {
	let numStr = str.slice(len, str.length);
	let num = Number(numStr);
	return num;
};

const nonHiddenToDoContainer = () => {
	let index = 0;
	for (let i = 0; i < currentListContainerHC.length; i++) {
		if (!currentListContainerHC[i].classList.contains("hidden")) {
			index = extractIndex(currentListContainerHC[i].id, 14);
			break;
		}
	}
	return index;
};

let index = nonHiddenToDoContainer();
let currentContainerOnDisplay = document.getElementById(
	`todo-container${index}`
);
let currentToDoItemHC =
	currentContainerOnDisplay.getElementsByClassName("todoItem");
let currentCheckBoxOnDisplayHC =
	currentContainerOnDisplay.getElementsByClassName("checkButton");

///hideList function: hides all of the list
const hideList = () => {
	for (let i = 0; i < currentListContainerHC.length; i++) {
		currentListContainerHC[i].classList.add("hidden");
		// console.log(currentListContainerArr[i]);
	}
	// console.log("the hideList is executed");
};

const idUpdate = (index) => {
	let id = index;
	for (let i = index + 1; i < listNodeNameHC.length; i++) {
		listNodesItemsHC[i].removeAttribute("id");
		listNodeNameHC[i].removeAttribute("id");
		removeListBtnHC[i].removeAttribute("id");
		listNodesItemsHC[i].id = `show${id}`;
		listNodeNameHC[i].id = `lNM${id}`;
		removeListBtnHC[i].id = `remove${id}`;
		id++;
	}
};
//logical functions

//function which add new listNodeItems
const addingListNodeItem = () => {
	hideList(); //hides all the individual list container

	//create a new listItemNode
	const newListNodeItem = document.createElement("div");
	newListNodeItem.classList.add("listNodeItems");
	newListNodeItem.id = `show${listNodesItemsHC.length - 1}`;

	//create h3
	const newH3 = document.createElement("h3");
	newH3.textContent = "New List Group";
	newH3.classList.add("listNodeName");
	newH3.classList.add("hidden");
	newH3.id = `lNM${listNodeNameHC.length}`;

	//adding h3 to parent node
	newListNodeItem.appendChild(newH3);

	//create a input textField inside newListNodeItem for renaming purposes
	const newTextInputField = document.createElement("input");
	newTextInputField.classList.add("renameIF");
	newTextInputField.setAttribute("type", "text");
	newTextInputField.setAttribute("placeHolder", `Try "DSA" and hit enter`);
	newTextInputField.id = `if${listNodesItemsHC.length - 1}`;
	newListNodeItem.appendChild(newTextInputField);

	//creating and adding buttons
	const newButton = document.createElement("button");
	newButton.classList.add("removeListNode");
	newButton.id = `remove${listNodeNameHC.length}`;
	newButton.textContent = "⛔";
	newListNodeItem.appendChild(newButton);
	// newListNodeItem.textContent = "Hello Avy";
	// listNodesEl.appendChild(newListNodeItem);

	//adding the new List Node before the + button
	const lastChild = listNodesItemsHC[listNodesItemsHC.length - 1];
	listNodesElem.insertBefore(newListNodeItem, lastChild);

	const newListContainer = document.createElement("div");
	newListContainer.classList.add("currentListContainer");
	newListContainer.id = `todo-container${currentListContainerHC.length}`;
	bodyElem.insertBefore(newListContainer, footerElem);

	currentContainerOnDisplay = document.getElementById(
		`todo-container${index}`
	);

	const newCompletedContainer = document.createElement("div");
	newCompletedContainer.classList.add("completed");
	newCompletedContainer.classList.add("hidden");
	newListContainer.appendChild(newCompletedContainer);

	newButton.addEventListener("click", function () {
		let index = extractIndex(newButton.id, 6);
		// console.log(index);
		idUpdate(index);
		// https://javascript.plainenglish.io/javascript-remove-id-from-element-30590b70dc92

		listNodesElem.removeChild(newListNodeItem);
		bodyElem.removeChild(newListContainer);
	});

	//h3EL
	newH3.addEventListener("click", function () {
		hideList();

		newListContainer.classList.remove("hidden");
		index = nonHiddenToDoContainer();
		currentContainerOnDisplay = document.getElementById(
			`todo-container${index}`
		);

		//first all the list container are made hidden
	});

	newH3.addEventListener("dblclick", function () {
		newH3.classList.add("hidden");
		newTextInputField.classList.remove("hidden");
	});

	newTextInputField.addEventListener("keydown", function (keyEvent) {
		let input = newTextInputField.value;
		if (keyEvent.key === "Enter" && input !== "") {
			newH3.textContent = input;
			newTextInputField.classList.add("hidden");
			newH3.classList.remove("hidden");
		} else if (keyEvent.key === "Escape") {
			newTextInputField.classList.add("hidden");
			newH3.classList.remove("hidden");
		}
	});
};

// const removeBtnEL = () => {

// }
addNewListBtn.addEventListener("click", function () {
	// firstTime = true;
	addingListNodeItem();

	index = nonHiddenToDoContainer();
	currentContainerOnDisplay = document.getElementById(
		`todo-container${index}`
	);
	currentToDoItemHC =
		currentContainerOnDisplay.getElementsByClassName("todoItem");
	currentCheckBoxOnDisplayHC =
		currentContainerOnDisplay.getElementsByClassName("checkButton");
});