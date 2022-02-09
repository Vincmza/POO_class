import displayFighters from "./displayChoiceMenu.js"

//---------ARRAY TO STORE PLAYER AND CHARACTER
let choosenFighters = [];
//---------BUTTON TO DELETE CHOOSEN CHARACTERS AND COME BACK TO CHOOSE MENU

const deleteButton = document.getElementById("delete")
//I LISTEN TO THE DELETE CHOOSEN CHARACTERS BUTTON
deleteButton.addEventListener("click", function () {
	deleteChoosenFighters()
	displayFighters()
})

//FUNCTION TO DELETE CHOOSEN CHARACTERS
function deleteChoosenFighters(){
	let arena1 = document.getElementById("arena_1")
	let arena2 = document.getElementById("arena_2")
	choosenFighters = []
	arena1.innerHTML="";
	arena2.innerHTML="";
}
export default deleteChoosenFighters
