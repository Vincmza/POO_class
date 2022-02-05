class Fighter {
	constructor(id, name, attack, defense, magicAttack, magicDefense, health) {
		(this.id = id),
			(this.name = name || "Unknown fighter"),
			(this.attack = attack),
			(this.defense = defense),
			(this.magicAttack = magicAttack || 0),
			(this.magicDefense = magicDefense || 0),
			(this.health = health);
	}
	isDead() {
		return this.health <= 0;
	}
	displayDeath() {
		this.isDead() ? console.log(`${this.name} est mort au combat`) : "";
	}
	//ATTACK
	hit(type, aggressor) {
		if (this.health > 0) {
			if (type === "physical") {
				return aggressor.defense > 0
					? (aggressor.defense -= this.attack)
					: (aggressor.health -= this.attack);
			} else if (type === "magical") {
				return aggressor.magicDefense > 0
					? (aggressor.magicDefense -= this.magicAttack)
					: (aggressor.health -= this.magicAttack);
			}
		} else {
			this.displayDeath;
		}
	}
}
//3 DIFFERENT CHARACTERS FROM THE FIGHTER CLASS
let merlin = new Fighter("merlin", "Merlin", 10, 30, 50, 100, 150);
let conan = new Fighter("conan", "Conan", 50, 100, 10, 50, 100);
let robin = new Fighter("robin", "Robin des bois", 35, 85, 25, 75, 120);

let characters = [merlin, conan, robin]

//---------MENU WHERE ALL CHARACTERS ARE DISPLAYED
const chooseMenu = document.querySelector(".choose_menu");
//---------ARRAY TO STORE PLAYER AND CHARACTER
let choosenFighters = [];
//---------FUNCTION TO DISPLAY ALL AVAILABLE CHARACTERS
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
//---------DISPLAY ALL CHARACTERS USER CAN CHOOSE
displayFighters();

//---------RADIO BUTTONS ALLOWING USER TO CONFIRM CHARACTER CHOICE
const playerOne = document.getElementById("first_player_choose");
const playerTwo = document.getElementById("second_player_choose");

//---------FUNCTION TO STORE PLAYER AND CHARACTER
function storePlayerAndFighter(whichPlayer, fighterId) {
	const index = choosenFighters.findIndex((elem) => elem.player === whichPlayer);
	if (index === -1) {
		choosenFighters.push({ player: whichPlayer, character: fighterId });
	} else if (index !== -1) {
		choosenFighters[index].character = fighterId;
	}
}
//---------FUNCTION TO DISPLAY CHARACTER USER CHOSE
function displayChoosenFighter(fighter, player) {
	const whichOne = player === "player_one" ? "Joueur 1" : "Joueur 2";
	const idPhysicalStrike = player === "player_one" ? "physical_strike_p1" : "physical_strike_p2";
	const idMagicalStrike = player === "player_one" ? "magical_strike_p1" : "magical_strike_p2";
	storePlayerAndFighter(whichOne, fighter.id);
	return `<div class="fighter">
    <span id="which_player">${whichOne}</span>
    <div id="${fighter.id}">
        <span class="name">${fighter.name}</span>
        <div class="img_container">
            <img src="./images/${fighter.id}.jpg" alt="photo conan">
        </div>
        <div class="specifications">
            <div class="spe"><span>Attack</span><span>${fighter.attack}</span></div>
            <div class="spe"><span>Defense</span><span>${fighter.defense}</span></div>
            <div class="spe"><span>Magical Attack</span><span>${fighter.magicAttack}</span></div>
            <div class="spe"><span>Magical Defense</span><span>${fighter.magicDefense}</span></div>
            <div class="spe"><span>Health</span><span>${fighter.health}</span></div>
        </div>
    </div>
    <div class="strike_buttons">
        <input id=${idPhysicalStrike} class="ps_button" type="button" value="Attaque physique"/>
        <input id=${idMagicalStrike} class="ms_button" type="button" value="Attaque magique"/>
    </div>
</div>`;
}
//---------FUNCTION TO BUILD CODE BASE WHERE CHOOSEN CHARACTER SETS IN
function chooseCharacter(id, fighter, player) {
	//THE TARGET IS THE ID ALREADY SET IN HTML
	const arena = document.getElementById(id);
	arena.innerHTML = "";
	//I CREATE A DIV TAG
	const playerContainer = document.createElement("div");
	//THAT DIV WILL CONTAIN AN ID
	const addId = `<div id="${player}"></div>`;
	//I SET THAT NEW DIV AS A CHILD OF ARENA
	arena.appendChild(playerContainer);
	//I INSERT THE ID
	playerContainer.insertAdjacentHTML("afterend", addId);
	//I AIM AT THE ID OF THE NEW CHILD OF ARENA
	const anyPlayer = document.getElementById(`${player}`);
	//I CALL THE FUNCTION THAT SETS THE CHARACTER CODE BASE
	anyPlayer.innerHTML = displayChoosenFighter(fighter, player);
}



