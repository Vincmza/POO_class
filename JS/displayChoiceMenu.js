import {chooseCharacter} from "./displayChoosenCharacters.js"
import Fighter from "./class.js"
//---------3 DIFFERENT CHARACTERS FROM THE FIGHTER CLASS
let merlin = new Fighter("merlin", "Merlin", 10, 30, 50, 100, 150);
let conan = new Fighter("conan", "Conan", 50, 100, 10, 50, 100);
let robin = new Fighter("robin", "Robin des bois", 35, 85, 25, 75, 120);
//---------ALL CLASS PUT AWAY IN AN ARRAY
let characters = [merlin, conan, robin]
//---------ARRAY TO STORE PLAYER AND CHARACTER
let choosenFighters = [];
//---------MENU WHERE ALL CHARACTERS ARE DISPLAYED
const chooseMenu = document.querySelector(".choose_menu");
//---------RADIO BUTTONS ALLOWING USER TO CONFIRM CHARACTER CHOICE
const playerOne = document.getElementById("first_player_choose");
const playerTwo = document.getElementById("second_player_choose");

function displayFighters() {
    const unChoosenCharacters = choosenFighters.map(elem=> elem.character)
    let str = ""
    characters.forEach(perso=>{
        if(!unChoosenCharacters.includes(perso.id)){
            str += `<div class="fighter">
            <div id="${perso.id}">
                <span class="name">${perso.name}</span>
                <div class="img_container">
                    <img src="./images/${perso.id}.jpg" alt="photo conan">
                </div>
                <div class="specifications">
                    <div class="spe"><span>Attack</span><span>${perso.attack}</span></div>
                    <div class="spe"><span>Defense</span><span>${perso.defense}</span></div>
                    <div class="spe"><span>Magical Attack</span><span>${perso.magicAttack}</span></div>
                    <div class="spe"><span>Magical Defense</span><span>${perso.magicDefense}</span></div>
                    <div class="spe"><span>Health</span><span>${perso.health}</span></div>
                </div>
            </div>
        </div>`
        }
    })
    chooseMenu.innerHTML = str
    //---------FIGHTER CARD
    characters.forEach(item=>{
        let fighterDOM = document.getElementById(item.id)
        fighterDOM.addEventListener("click", function () {
            if (playerOne.checked === true) {
                chooseCharacter("arena_1", item, "player_one");
                displayFighters()
                
            }if (playerTwo.checked === true) {
                chooseCharacter("arena_2", item, "player_two");
                displayFighters()
            }
        });
    })
}
export default displayFighters