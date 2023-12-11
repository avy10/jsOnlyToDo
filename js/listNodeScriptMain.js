//variables
const listNodesEl = document.querySelector(".listNodes");
let listNodesItemsArr = document.getElementsByClassName("listNodeItems");
// let showListBtnArr = document.getElementsByClassName("showList");
let listNodeNameArr = document.getElementsByClassName("listNodeName");
let removeListBtnArr = document.getElementsByClassName("removeListNode");
const addNewListBtn = document.getElementById("addNewList");

let tempIFElArr = document.getElementsByClassName("tempIF");
let currentListContainerArr = document.getElementsByClassName("currentListContainer");

// let firstTimeH3Creation = [false,];
    //^ this array tracks whether a listNodeItem (a H3) has been created first time
    //why needed? what if user clicks on +, we get a textInputField
    //then instead of entering a value for H3
    ///he goes on and double clicks the other H3
    //now we have two inputTextField so how to know which one was new and which one was old
    //initially i thought of tracking whether a inputfield is first time created by keeping false or true 
    /* now, when a new h3 is created,let us name our h3 as NewList. 
    if user clicks on +, in the background the h3 gets a value of "NewList", 
    but on the render page: user will se a inputTextFIeld where he can enter the desired name for the listGroup  */

    /*
        now if a user clicks on an already existing h3, 
        we will save that old h3 name inside a variable, 
        incase the user changes his mind that he does not wanna rename
        he can press escape and old name will populate
        now how to store that h3 Names, probably in an array
    */
let h3Names = ["Home",];
// class for EL, id for add/remove logic building

//index tracker variable
    //h3 index tracker
let h3Index = 0;
    //remove button index tracker
let removeIndex = 0;
    //temporary Input field index tracker;
let tempIFIndex = 0;    

    //boolean variable to track whether the listNodeitem is first time created
    //true when we run event listener on addNewListBtn EL
let firstTime = false;

//global function which are used by all
const extractIndex = (str, len) => {
    let numStr = str.slice(len, str.length);
    let num = Number(numStr);
    return num;
}

const h3NamesUpdate = () => {
    for(let i = 0; i < listNodeNameArr.length; i++){
        h3Names[i] = listNodeNameArr[i].textContent;
    }
}


//function to update all the array variables 

const arrayUpdate = () => {
    listNodesItemsArr = document.getElementsByClassName("listNodeItems");
    listNodeNameArr = document.getElementsByClassName("listNodeName");
    removeListBtnArr = document.getElementsByClassName("removeListNode");
    tempIFElArr = document.getElementsByClassName("tempIF");
    currentListContainerArr = document.getElementsByClassName("currentListContainer");
    h3NamesUpdate();
}

//logical functions


const addingListNodeItem = () => {
    //create a new listItemNode
    const newListNodeItem = document.createElement("div");
    newListNodeItem.classList.add("listNodeItems");

        //create h3 
    const newH3 = document.createElement("h3");
    newH3.textContent="New List Group";
    newH3.classList.add("listNodeName");
    newH3.classList.add("hidden");
    newH3.id=`lNM${listNodeNameArr.length}`;
            //create and add ID
        
            //adding h3 to parent node
    newListNodeItem.appendChild(newH3);
        //create a input textField inside newListNodeItem
    const newTextInputField = document.createElement("input");
    newTextInputField.classList.add("tempIF"); //tempIF = temporary Input Field
    newTextInputField.setAttribute("type", "text");
    newTextInputField.setAttribute("placeHolder", `Try "DSA" and hit enter`);
    newTextInputField.id=`if${listNodesItemsArr.length - 1}`; 
    newListNodeItem.appendChild(newTextInputField);

        //length - 1 cz button#addNewList is also a child of div.listNodeItems

        // creating and adding button
        //creating and adding buttons
    const newButton = document.createElement("button");
    newButton.classList.add("removeListNode");
    newButton.id=`remove${listNodeNameArr.length}`;
    newButton.textContent = "⛔";
    newListNodeItem.appendChild(newButton);
    // newListNodeItem.textContent = "Hello Avy";
    // listNodesEl.appendChild(newListNodeItem);

    //adding the new List Node before the + button
    const lastChild = listNodesItemsArr[listNodesItemsArr.length-1];
    listNodesEl.insertBefore(newListNodeItem, lastChild);

    
    arrayUpdate();
    tempIFElArrUpdate();
    h3EventListeners();
}
///hideList function: hides all of the list
const hideList = () => {
    for(let i = 0; i < currentListContainerArr.length; i++){
        currentListContainerArr[i].classList.add("hidden");
        // console.log(currentListContainerArr[i]);

    }
    // console.log("the hideList is executed");
};

//showList function => shows the list of the clicked listGroup
const showList = (i) => {
    hideList();
    // console.log("the showlist is executed");
    currentListContainerArr[i].classList.toggle("hidden");
};

const addTextField = (i) => {
    return false;
};

//function containing logic for text Input Field



//these functions update eventListeners

const tempIFElArrUpdate = () => {
    
    for(let i = 0; i < tempIFElArr.length; i++) {
        tempIFElArr[i].addEventListener("click", function(){
            let tempIFIndex = extractIndex(tempIFElArr[i].id, 2);
            console.log(`you have clicked the tempIF of id : ${tempIFIndex} at index ${i}`);
            // console.log("whatever");
            let update = addTextField();
            // console.log(listNodeNameArr[i].id);
            if(!update){
                listNodeNameArr[tempIFIndex].classList.remove("hidden");
                tempIFElArr[i].classList.add("hidden");
            }
        });
    }
}

const h3EventListeners = () => {
    for(let i = 0; i < listNodeNameArr.length; i++) {
    listNodeNameArr[i].addEventListener("click", function(){
        h3Index = extractIndex(listNodeNameArr[i].id, 3);
        console.log("this h3 button is pressed : " + h3Index);
        //showList function banana hai and usko yaha call
        showList(i);
    });

    listNodeNameArr[i].addEventListener("dblclick", function(){
        h3Index = extractIndex(listNodeNameArr[i].id, 3);
        console.log("this h3 button is double clicked : " + h3Index);
        
        //inserting new text field
        listNodeNameArr[h3Index].classList.add("hidden");
        const newTextInputField = document.createElement("input");
    newTextInputField.classList.add("tempIF"); //tempIF = temporary Input Field
    newTextInputField.setAttribute("type", "text");
    newTextInputField.setAttribute("placeHolder", `Try "DSA" and hit enter`);
    newTextInputField.id=`if${i}`; 
    listNodesItemsArr[i].insertBefore(newTextInputField, removeListBtnArr[h3Index]);
        arrayUpdate();
    tempIFElArrUpdate();
        //renameList function banana hai and usko yaha call
        addTextField(h3Index);

        
    });
}
}
// const addNewListBtnEventListener = () => {
//     addNewListBtn.addEventListener("click", function(){
//         firstTime = true;
//         addingListNodeItem();  
//     })
// };
//specific function






//EL
    //global El

    //looped EL

        //h3 click event listener
// for(let i = 0; i < listNodeNameArr.length; i++) {
//     listNodeNameArr[i].addEventListener("click", function(){
//         h3Index = extractIndex(listNodeNameArr[i].id, 3);
//         console.log("this h3 button is pressed : " + h3Index);
//         //showList function banana hai and usko yaha call
//         showList(i);
//     });

//     listNodeNameArr[i].addEventListener("dblclick", function(){
//         h3Index = extractIndex(listNodeNameArr[i].id, 3);
//         console.log("this h3 button is double clicked : " + h3Index);
//         //renameList function banana hai and usko yaha call


        
//     });
// }

//         //h3 double click event listener
// for(let i = 0; i < listNodeNameArr.length; i++) {
//     listNodeNameArr[i].addEventListener("dblclick", function(){
//         h3Index = extractIndex(listNodeNameArr[i].id, 3);
//         console.log("this h3 button is double clicked : " + h3Index);
//         //renameList function banana hai and usko yaha call

h3EventListeners();
        
//     });
// }

        //input field EL
// for(let i = 0; i < tempIFElArr.length; i++) {
//     tempIFElArr[i].addEventListener("click", function(){
//         //actually replace the click event with keypress event of Enter
        

//         //index tracker
//         tempIFIndex = extractIndex(tempIFEl[i].id, 2);

//         //after enter is hit, send the input value to h3, then assign that string to textcontent of h3
//     })
// }
    //specific EL
    //1.addNewListBtn EL
        //this EL creates a listNodeItem befor + button
        //in the newly added listNodeItem a text field in which user enter new list name and hits enter to add new list-class
        //while the text field is active, + button is hidden
        //if user presses ESc or anywhere on a translucent overlay, the listNodeItem is deleted and + button is visible again
addNewListBtn.addEventListener("click", function(){
    firstTime = true;
    addingListNodeItem();  
})
// addNewListBtnEventListener();

                    // listNodeNameArr[0].addEventListener("dblclick", function(){
                    //     //for renaming the class list name
                    //     const newTextInputField = document.createElement("input");
                    //     newTextInputField.classList.add("tempIF"); //tempIF = temporary Input Field
                    //     newTextInputField.setAttribute("type", "text");
                    //     newTextInputField.setAttribute("placeHolder", `Try "DSA" and hit enter`);

                    //     //input text field is ready, need to find the calling button and append the input field
                    //         //demo
                    //         // document.getElementById("show0").removeChild(document.querySelector(".listNodeName"));
                    //         document.querySelector(".listNodeName").classList.add("hidden");
                    //         document.getElementById("show0").insertBefore(newTextInputField, document.getElementById("remove0"));

                    // })

//tempIF EL
    //click EL: to track which one of the tempIF textField I am clicking on

    // for(let i = 0; i < tempIFElArr.length; i++) {
    //     tempIFElArr[i].addEventListener("click", function(){
    //         console.log(`you have clicked the tempIF of id : ${tempIFElArr[i].id} at index ${i}`);
    //         // console.log("whatever");
    //     });
    // }

    tempIFElArrUpdate();
    //enter key to add the list
    //esc key to exit the input field and discard the input field??
    //or just exit functionality
    //for discard I might at remove button .removeListNode
// tempIFElArr.addEventListener("keydown", function(keyEvent){
//     if(firstTime) {

//     }
// });



// console.log(listNodesItemsArr);
// console.log(removeListBtnArr)
// for(let i = 0; i<removeListBtnArr.length; i++) {
//     console.log(removeListBtnArr[i].id);
// }

h3NamesUpdate();
console.log(h3Names);