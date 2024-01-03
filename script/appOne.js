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

const idUpdate = (index) => {
	let id = index;
	for (let i = index + 1; i < listNamesHC.length; i++) {
		// remove the existing ids
		listTabsHC[i].removeAttribute("id");
		listNamesHC[i].removeAttribute("id");
		removeListBtnHC[i].removeAttribute("id");
		// add the new id. in new id, the number is taken from the removed element
		listTabsHC[i].id = `show${id}`;
		listNamesHC[i].id = `lNM${id}`;
		removeListBtnHC[i].id = `remove${id}`;
		id++;

	}
};

//end of previous code

const idUpdateTODOS = function(e){
	let toDoHC = e.getElementsByClassName("todoItem");
	let checkBtnHC = e.getElementsByClassName("checkButton");
	for(let i = 0; i < toDoHC.length; i++){
		toDoHC[i].removeAttribute("id");
		toDoHC[i].removeAttribute("position");
		checkBtnHC[i].removeAttribute("id");

		toDoHC[i].id = `todo${i}`;
		toDoHC[i].setAttribute("position", i);
		checkBtnHC[i].id = `check${i}`;

	}
}


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
	newH3.className = "listName hidden";
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
	const newRemoveTabBTN = document.createElement("button");
	newRemoveTabBTN.classList.add("removeListTab");
	newRemoveTabBTN.id = `remove${listTabsHC.length}`;
	newRemoveTabBTN.textContent = "⛔";
	newListTab.appendChild(newRemoveTabBTN);


    // the container which will contain list specific to this list
    const newListContainer = document.createElement("div");
	newListContainer.classList.add("currentListContainer");
	newListContainer.id = `todo-container${currentListContainerHC.length}`;
	bodyElem.insertBefore(newListContainer, footerElem);

	currentContainerOnDisplay = newListContainer;

	// newCompletedContainer contains list of todos which have been marked as completed
	const newCompletedContainer = document.createElement("div");
	newCompletedContainer.className = "completed hidden";
	newListContainer.appendChild(newCompletedContainer);

	// removeBTN EL
	newRemoveTabBTN.addEventListener("click", function () {
		let index = extractIndex(newRemoveTabBTN.id, 6);
		idUpdate(index);
		listNodesElem.removeChild(newListTab);
		bodyElem.removeChild(newListContainer);
	});

	newListTab.addEventListener("click", function(event){
		event.stopPropagation();
		hideList(); // hides all the listContainer, even its own listContainer

		newListContainer.classList.remove("hidden"); 
		//now we remove the hidden from the listContainer that is specific to this h3

		index = nonHiddenToDoContainer(); //because only one listContainer
		currentContainerOnDisplay = document.getElementById(
			`todo-container${index}`
		);
	})
	

	newH3.addEventListener("dblclick", function (event) {
		event.stopPropagation();
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

}

addNewListBtn.addEventListener("click", function () {
	hideList(); //hides all the individual list container

	addingListNodeItem();

	//after a new todo list is added i.e. todo tab and todo container, update index
	index = nonHiddenToDoContainer();
	currentContainerOnDisplay = document.getElementById(
		`todo-container${index}`
	);
});



addToDoIFElem.addEventListener("keydown", function (keyEvent) {
	let text = addToDoIFElem.value;

	if (keyEvent.key === "Enter" && text !== "") {
		index = nonHiddenToDoContainer();
		let currentContainer = currentListContainerHC[index];
		let completedContainer = currentContainer.querySelector(".completed");
		const notCompHC = currentContainer.getElementsByClassName("notComp");
		const compHC = completedContainer.getElementsByClassName("comp");
		const toDoItemsInCurrentContainerHC = currentContainer.getElementsByClassName("todoItem");

		const idOfCurrentContainer = currentContainer.id;
		// console.log("AVY LOOK AT THIS ", idOfCurrentContainer);

		const newToDoItemBox = document.createElement("div");
		newToDoItemBox.className = "todoItem navigationJS notComp"
		newToDoItemBox.id = `todo${toDoItemsInCurrentContainerHC.length}`;
		currentContainer.insertBefore(newToDoItemBox, completedContainer);
		newToDoItemBox.classList.add(`TAB${idOfCurrentContainer}`)
		newToDoItemBox.setAttribute("position", `${toDoItemsInCurrentContainerHC.length-1}`);

		
		const newCheckBtnDiv = document.createElement("div");
		newCheckBtnDiv.classList.add("checkButtonDiv");
		newToDoItemBox.appendChild(newCheckBtnDiv);

		const newCheckBoxInput = document.createElement("input");
		newCheckBoxInput.setAttribute("type", "checkbox");
		newCheckBoxInput.classList.add("checkButton");
		newCheckBtnDiv.appendChild(newCheckBoxInput);
		newCheckBoxInput.id = `check${toDoItemsInCurrentContainerHC.length-1}`;
		// EL DONE

		const newDeleteBtn = document.createElement("button");
		newDeleteBtn.textContent = "❌";
		newCheckBtnDiv.appendChild(newDeleteBtn);
		// EL DONE

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
		// EL DONE

		const newDownBtn = document.createElement("button");
		newDownBtn.classList.add("moveDownBtn");
		newDownBtn.textContent = "⬇️";
		newMoveDiv.appendChild(newDownBtn);
		// EL DONE

		newDeleteBtn.addEventListener("click", function () {
			console.log("AVY WATHC THIS,,", currentContainer.contains(newToDoItemBox));
			if(completedContainer.contains(newToDoItemBox)){
				completedContainer.removeChild(newToDoItemBox);
			} else {
				currentContainer.removeChild(newToDoItemBox);
			}
			idUpdateTODOS(currentContainer);
		});

		newCheckBoxInput.addEventListener("click", function () {
			newToDoTextDiv.classList.toggle("strikeTho");
			// let position = extractIndex(newCheckBoxInput.id, 5);
			let position = +newToDoItemBox.getAttribute("position");
			if (newCheckBoxInput.checked) {
				// VERIFIED
				currentContainerOnDisplay.removeChild(newToDoItemBox);
				completedContainer.appendChild(newToDoItemBox);
				if (completedContainer.childElementCount > 0) {
					completedContainer.classList.remove("hidden");
				}
				newToDoItemBox.classList.add("comp");
				newToDoItemBox.classList.remove("notComp");
			} else if (!newCheckBoxInput.checked) {
				const temp = newToDoItemBox;
				const tempID = temp.id;
				const prevIndex = extractIndex(tempID, 4);
				console.log("prevIndex is ", prevIndex);

				if(notCompHC.length === 0) {
					console.log("1st");
					currentContainerOnDisplay.insertBefore(temp,completedContainer);
					newToDoItemBox.classList.remove("comp");
					newToDoItemBox.classList.add("notComp");
				} else if(prevIndex === 0){
					console.log("0th");
					completedContainer.removeChild(temp);
					currentContainerOnDisplay.insertBefore(temp, toDoItemsInCurrentContainerHC[0]);
				} else if(prevIndex === notCompHC.length){
					console.log("2nd");
					//VERIFIED
					const lastChild = toDoItemsInCurrentContainerHC[prevIndex-1];
					const lastChildP = +lastChild?.getAttribute("position");
					console.log("childzeroP for 2nd", lastChildP, "index", prevIndex);
					completedContainer.removeChild(temp);
					if(prevIndex > lastChildP) {
						console.log("uno");
						currentContainerOnDisplay.insertBefore(temp, completedContainer);
					} else if(prevIndex < lastChildP){
						console.log("dos");
						currentContainerOnDisplay.insertBefore(temp,  lastChild);
					}
					newToDoItemBox.classList.remove("comp");
					newToDoItemBox.classList.add("notComp");
				} else if(prevIndex < notCompHC.length){
					console.log("3rd")
					const childZero = toDoItemsInCurrentContainerHC[prevIndex];
					const childPlus = toDoItemsInCurrentContainerHC[prevIndex+1];
					const childMinus = toDoItemsInCurrentContainerHC[prevIndex-1];

					const childZeroP = +childZero?.getAttribute("position");
					const childPlusP = +childPlus?.getAttribute("position");
					const childMinusP = +childMinus?.getAttribute("position");

					if(prevIndex < childZeroP && prevIndex < childMinusP){
						console.log("A")
						currentContainerOnDisplay.insertBefore(temp, childMinus);
					} else if (prevIndex < childZeroP && prevIndex > childMinusP) {
						console.log("B")
						currentContainerOnDisplay.insertBefore(temp, childZero);
					} else if(prevIndex > childZeroP && prevIndex < childPlusP){
						console.log("C")
						currentContainerOnDisplay.insertBefore(temp, childPlus);						
					} else if(prevIndex > childZeroP && prevIndex > childPlusP){
						console.log("D")
						const childPlusPlus = toDoItemsInCurrentContainerHC[prevIndex+2];
						currentContainerOnDisplay.insertBefore(temp, childPlusPlus);
					}
					newToDoItemBox.classList.remove("comp");
					newToDoItemBox.classList.add("notComp");
				} else if(prevIndex > notCompHC.length){

					const lastChild = notCompHC[notCompHC.length-1];
					console.log(lastChild);
					const lastChildP = +lastChild.getAttribute("position");
					console.log("childzeroP for 4th =>", lastChildP, "..index", prevIndex);
					completedContainer.removeChild(temp);
					if(prevIndex > lastChildP) {
						console.log("uno");
						currentContainerOnDisplay.insertBefore(temp, completedContainer);
					} else if(prevIndex < lastChildP){
						console.log("dos");
						currentContainerOnDisplay.insertBefore(temp,  lastChild);
					}


					console.log("4th");
					newToDoItemBox.classList.remove("comp");
					newToDoItemBox.classList.add("notComp");
				}

				if (completedContainer.childElementCount == 0) {
					completedContainer.classList.add("hidden");
				}
			}

			// let toDoItemIndex = extractIndex()
		});

		newUpBtn.addEventListener("click", function(){
			const currentPosition = +newToDoItemBox.getAttribute("position");
			if(currentPosition === 0 ){

			} else {
				const elementAboveCurrent = notCompHC[currentPosition-1];
				console.log(elementAboveCurrent);
				console.log(newToDoItemBox.id, typeof newToDoItemBox.id);
				currentContainer.removeChild(newToDoItemBox);
				currentContainer.insertBefore(newToDoItemBox, elementAboveCurrent);
				newToDoItemBox.removeAttribute("id");
				newToDoItemBox.removeAttribute("position");
				elementAboveCurrent.removeAttribute("id");
				elementAboveCurrent.removeAttribute("position");
				
				newToDoItemBox.id = `todo${currentPosition - 1}`;
				elementAboveCurrent.id = `todo${currentPosition}`;
				newToDoItemBox.setAttribute("position", currentPosition-1)
				elementAboveCurrent.setAttribute("position", currentPosition)
			}
		});

		newDownBtn.addEventListener("click", function(){
			const currentPosition = +newToDoItemBox.getAttribute("position");
			if(currentPosition === notCompHC.length-1 ){
				
			} else {
				const elementBelowCurrent = notCompHC[currentPosition+1];
				console.log(elementBelowCurrent);
				console.log(newToDoItemBox.id, typeof newToDoItemBox.id);
				currentContainer.removeChild(elementBelowCurrent);
				currentContainer.insertBefore(elementBelowCurrent, newToDoItemBox);
				newToDoItemBox.removeAttribute("id");
				newToDoItemBox.removeAttribute("position");
				elementBelowCurrent.removeAttribute("id");
				elementBelowCurrent.removeAttribute("position");
				
				newToDoItemBox.id = `todo${currentPosition + 1}`;
				elementBelowCurrent.id = `todo${currentPosition}`;
				newToDoItemBox.setAttribute("position", currentPosition+1)
				elementBelowCurrent.setAttribute("position", currentPosition)
			}
		})

		addToDoIFElem.value = "";
	} else if (keyEvent.key === "Escape") {
		addToDoIFElem.value = "";
	}
});