/* 
Elem = HTML element
HC = live HTML Collection
Arr = array of
EL = event listener
Btn = button
 */
/* 
*/
"use strict";

//double check if we need it
let currentListContainerHC = document.getElementsByClassName(
	"currentListContainer"
);
//

const bodyElem = document.querySelector("body");
const listNodesElem = document.querySelector(".listNodes");
let listTabsHC = document.getElementsByClassName("listTab");
let listNamesHC = document.getElementsByClassName("listName");
let renameIFHC = document.getElementsByClassName("renameIF");
let removeListBtnHC = document.getElementsByClassName("removeListTab");
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

// learning stuff
bodyElem.setAttribute("customAttr", "customValue");


// previous code
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

//end of previous code



//function which add new listNodeItems
const addingListNodeItem = () => {

    const newListTab = document.createElement("div");
	newListTab.classList.add("listTab");
	newListTab.id = `show${listTabsHC.length - 1}`;

    //adding the new List Tab before the + button
	const lastChild = listTabsHC[listTabsHC.length - 1];
	listNodesElem.insertBefore(newListTab, lastChild);

    // const html = `
    // <h3 class="listName hidden" id="lNM${listTabsHC.length-2}"></h3>
    // <input class="renameIF" type="text" placeholder="Try &quot;DSA&quot; and hit enter" id="if${listTabsHC.length - 2}">    
    // <button class="removeListTab" id="remove${listTabsHC.length - 2}">⛔</button>
    
    // `;
    // newListTab.innerHTML = html;
	/* THE DRAWBACK OF USING const html AND innerHTML is that
	we wont be able to grab the elements and attach eventListeners to it*/


	//create h3
	const newH3 = document.createElement("h3");
	newH3.textContent = "New List Group";
	newH3.classList.add("listName");
	newH3.classList.add("hidden");
	newH3.id = `lNM${listNamesHC.length}`;

	//adding h3 to parent node
	newListTab.appendChild(newH3);

	//create a input textField inside newListNodeItem for renaming purposes
	const newTextInputField = document.createElement("input");
	newTextInputField.classList.add("renameIF");
	newTextInputField.setAttribute("type", "text");
	newTextInputField.setAttribute("placeHolder", `Try "DSA" and hit enter`);
	newTextInputField.id = `if${listTabsHC.length - 1}`;
	newListTab.appendChild(newTextInputField);

	//creating and adding buttons
	const newButton = document.createElement("button");
	newButton.classList.add("removeListTab");
	newButton.id = `remove${listTabsHC.length}`;
	newButton.textContent = "⛔";
	newListTab.appendChild(newButton);


    // the container which will contain list specific to this list
    const newListContainer = document.createElement("div");
	newListContainer.classList.add("currentListContainer");
	newListContainer.id = `todo-container${currentListContainerHC.length}`;
	bodyElem.insertBefore(newListContainer, footerElem);

	currentContainerOnDisplay = newListContainer;

	// newCompletedContainer contains list of todos which have been marked as completed
	const newCompletedContainer = document.createElement("div");
	newCompletedContainer.classList.add("completed");
	newCompletedContainer.classList.add("hidden");
	newListContainer.appendChild(newCompletedContainer);

}

addNewListBtn.addEventListener("click", function () {
	hideList(); //hides all the individual list container

	addingListNodeItem();
});