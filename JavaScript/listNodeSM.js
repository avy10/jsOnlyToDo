/* 
Elem = HTML element
HC = live HTML Collection
Arr = array of
EL = event listener
Btn = button
 */
/* 
https://codepen.io/codingstella/pen/PoxQygW
add date and time functionality like the page above
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
		// remove the existing ids
		listNodesItemsHC[i].removeAttribute("id");
		listNodeNameHC[i].removeAttribute("id");
		removeListBtnHC[i].removeAttribute("id");
		// add the new id. in new id, the number is taken from the removed element
		listNodesItemsHC[i].id = `show${id}`;
		listNodeNameHC[i].id = `lNM${id}`;
		removeListBtnHC[i].id = `remove${id}`;
		id++;
		// a0 a1 a2 a3 a4
		// we are deleting element a2
		// then our remaining elements are a0 a1 a3 a4
		// which is why we need to update id
		// a0 a1 newA2 newA3 => new
		// a0 a1 a3 	a4 => old

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

// newH3.addEventListener("drag", function(){

// })
// export {currentListContainerHC};

addToDoIFElem.addEventListener("keydown", function (keyEvent) {
	let text = addToDoIFElem.value;

	if (keyEvent.key === "Enter" && text !== "") {
		index = nonHiddenToDoContainer();
		let currentContainer = currentListContainerHC[index];
		let completedContainer = currentContainer.querySelector(".completed");
		const notCompHC = currentContainer.getElementsByClassName("notComp");
		const compHC = completedContainer.getElementsByClassName("comp");
		let toDoItemsInCurrentContainer =
			currentContainer.getElementsByClassName("todoItem");
		console.log(
			`number of to do items are : ${toDoItemsInCurrentContainer.length}`
		);
		/* because all the individual to do list item share the same class and id name pattern
		if we have 3 list group title (or, listNodeName) grocery, studies, travel
		and we want to add buy potatoes, we need to insert the todo in its desirable group say grocery
		for that
		remember h3 button has a click event listener which hides all the list group containers
		and then unhides the current related one
		so we are getting selecting the current list group in the currentContainer variable, 
		so that every to do we add gets added to the currentContainer*/

		const idOfCurrentContainer = currentContainer.id;

		const newToDoItemBox = document.createElement("div");
		newToDoItemBox.classList.add("todoItem");
		newToDoItemBox.classList.add("navigationJS");
		newToDoItemBox.classList.add("notComp");
		newToDoItemBox.id = `todo${toDoItemsInCurrentContainer.length}`;
		currentContainer.insertBefore(newToDoItemBox, completedContainer);
		// newToDoItemBox.classList.add(`${idOfCurrentContainer}-${}`)
		const newCheckBtnDiv = document.createElement("div");
		newCheckBtnDiv.classList.add("checkButtonDiv");
		newToDoItemBox.appendChild(newCheckBtnDiv);

		const newCheckBoxInput = document.createElement("input");
		newCheckBoxInput.setAttribute("type", "checkbox");
		newCheckBoxInput.classList.add("checkButton");
		newCheckBtnDiv.appendChild(newCheckBoxInput);
		newCheckBoxInput.id = `check${currentCheckBoxOnDisplayHC.length - 1}`;

		const newDeleteBtn = document.createElement("button");
		newDeleteBtn.textContent = "❌";
		newCheckBtnDiv.appendChild(newDeleteBtn);

		const newToDoTextDiv = document.createElement("div");
		newToDoItemBox.appendChild(newToDoTextDiv);
		newToDoTextDiv.classList.add("todoText");

		const newPTag = document.createElement("p");
		newPTag.textContent = text;
		newToDoTextDiv.appendChild(newPTag);

		const newMoveDiv = document.createElement("div");
		newMoveDiv.classList.add("moveDiv");
		newToDoItemBox.appendChild(newMoveDiv);

		const newUpBtn = document.createElement("button");
		newUpBtn.classList.add("moveUpBtn");
		newUpBtn.textContent = "⬆️";
		newMoveDiv.appendChild(newUpBtn);

		const newDownBtn = document.createElement("button");
		newDownBtn.classList.add("moveDownBtn");
		newDownBtn.textContent = "⬇️";
		newMoveDiv.appendChild(newDownBtn);

		newDeleteBtn.addEventListener("click", function () {
			currentContainer.removeChild(newToDoItemBox);
		});

		newCheckBoxInput.addEventListener("click", function () {
			newToDoTextDiv.classList.toggle("strikeTho");
			let position = extractIndex(newCheckBoxInput.id, 5);

			// console.log("check");
			console.log(newCheckBoxInput.checked);
			if (newCheckBoxInput.checked) {
				console.log(`checkinputbox is ${newCheckBoxInput.checked}`);
				// const temp = newToDoItemBox;
				currentContainerOnDisplay.removeChild(newToDoItemBox);
				// currentContainerOnDisplay.appendChild(temp);
				completedContainer.appendChild(newToDoItemBox);
				if (completedContainer.childElementCount > 0) {
					completedContainer.classList.remove("hidden");
				}
				newToDoItemBox.classList.add("comp");
				newToDoItemBox.classList.remove("notComp");
			} else if (!newCheckBoxInput.checked) {
				newToDoItemBox.classList.remove("comp");
				newToDoItemBox.classList.add("notComp");
				const temp = newToDoItemBox;
				const tempID = temp.id;
				const prevIndex = extractIndex(tempID, 4);
				const insertBeforeThisChild =
					toDoItemsInCurrentContainer[prevIndex];
				console.log(insertBeforeThisChild);
				completedContainer.removeChild(newToDoItemBox);
				console.log(`previous index ${prevIndex}`);
				console.log(currentToDoItemHC.length);
				if (notCompHC.length == 0) {
					currentContainerOnDisplay.insertBefore(temp,completedContainer);
				} else if (prevIndex > notCompHC.length) {
					console.log(`notcompHC length : ${notCompHC.length}`);
					const insertHereFFS = notCompHC[notCompHC.length - 1];
					const indexOfLastItemInToDoItemsInCurrentContainer = extractIndex(insertHereFFS.id, 4);
					console.log(`indexOfLastItemInToDoItemsInCurrentContainer : ${indexOfLastItemInToDoItemsInCurrentContainer}`);
					if (prevIndex < indexOfLastItemInToDoItemsInCurrentContainer && notCompHC.length != 0 && prevIndex >= notCompHC.length - 1) {
						currentContainerOnDisplay.insertBefore(temp, insertHereFFS
						);
					} else {
						currentContainerOnDisplay.insertBefore(temp, completedContainer
						);
					}
				} else {
					currentContainerOnDisplay.insertBefore( temp, insertBeforeThisChild
					);
				}

				if (completedContainer.childElementCount == 0) {
					completedContainer.classList.add("hidden");
				}
			}

			// let toDoItemIndex = extractIndex()
		});

		addToDoIFElem.value = "";
	} else if (keyEvent.key === "Escape") {
		addToDoIFElem.value = "";
	}
});

const putToDoAtCorrectIndex = () =>{
	
}