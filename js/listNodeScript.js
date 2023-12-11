
const listNodesEl = document.querySelector(".listNodes");
const listNodesItemsEl = document.querySelector(".listNodeItems");
const showListBtn = document.querySelector(".showList");
const listNodeNameEl = document.querySelector(".listNodeName");
const removeListBtn = document.getElementById("removeListNode");
const addNewListBtn = document.getElementById("addNewList");


//EL

//global EL


//specific EL

//addNewListBtn EL
addNewListBtn.addEventListener("click", function(){

});

const currentListContainerCL = document.getElementsByClassName("currentListContainer");
const showUs = (val) => {
    for(let i = 0; i < currentListContainerCL.length; i++) {
        if(!currentListContainerCL[i].classList.contains("hidden")) {
            currentListContainerCL[i].classList.add("hidden");
        }
        
    }
currentListContainerCL[val].classList.remove("hidden");
}


const avyEl = document.getElementsByClassName("checkButton");
for(let i = 0; i < avyEl.length; i++) {
    avyEl[i].addEventListener("change", function(){
    if(this.checked) {
        console.log("aefaefgaeg");
    } else {
        console.log("12345");
    }
})
}
