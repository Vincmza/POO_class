import Fighter from "./class.js"

//---------3 DIFFERENT CHARACTERS FROM THE FIGHTER CLASS
let merlin = new Fighter("merlin", "Merlin", 20, 60, 60, 100, 200, 200, 275, 275);
let conan = new Fighter("conan", "Conan", 100, 200, 200, 20, 100, 100, 200, 200);
let robin = new Fighter("robin", "Robin des bois", 75, 170, 170, 60, 150, 150, 240, 240);

//---------ALL CLASS PUT AWAY IN AN ARRAY
let characters = [merlin, conan, robin]

//---------ARRAY TO STORE PLAYER AND CHARACTER
export let choosenFighters = [];

//---------MENU WHERE ALL CHARACTERS ARE DISPLAYED
const chooseMenu = document.querySelector(".choose_menu");

//---------RADIO BUTTONS ALLOWING USER TO CONFIRM CHARACTER CHOICE
const playerOne = document.getElementById("first_player_choose");
const playerTwo = document.getElementById("second_player_choose");

//POTIONS
let potionP1 = true
let potionP2 = true

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
displayFighters()

function storePlayerAndFighter(whichPlayer, fighterId) {
	const index = choosenFighters.findIndex(elem => elem.player === whichPlayer);
	if (index === -1) {
		choosenFighters.push({ player: whichPlayer, character: fighterId });
	} else if (index !== -1) {
		choosenFighters[index].character = fighterId;
	}
}
function getPhysicalStrikeId(player){
	return player === "player_one" ? "physical_strike_p1" : "physical_strike_p2";
}
function getMagicalStrikeId(player){
	return player === "player_one" ? "magical_strike_p1" : "magical_strike_p2";
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

	const physicalAttackBtn = document.getElementById(getPhysicalStrikeId(player))
	//LISTEN TO PHYSICAL STRIKE BTN
	physicalAttackBtn.addEventListener("click", function (){

		const opponent = choosenFighters.filter(elem=>elem.character != fighter.id)
		const enemy = characters.filter(elem => elem.id == opponent[0].character)[0]
		const who = opponent[0].player === "Joueur 1" ? "player_one" : "player_two"
		const arenaId = who === "player_one" ? "arena_1" : "arena_2"
		fighter.hit("physical", enemy)
		chooseCharacter(arenaId,enemy,who)
		enemy.displayDeath()
		enemy.displayVictory()
	})

	const magicalAttackBtn = document.getElementById(getMagicalStrikeId(player))
	//LISTEN TO MAGICAL STRIKE BTN
	magicalAttackBtn.addEventListener("click", function (){

		const opponent = choosenFighters.filter(elem=>elem.character != fighter.id)
		const enemy = characters.filter(elem => elem.id == opponent[0].character)[0]
		const who = opponent[0].player === "Joueur 1" ? "player_one" : "player_two"
		const arenaId = who === "player_one" ? "arena_1" : "arena_2"
		fighter.hit("magical", enemy)
		chooseCharacter(arenaId,enemy,who)
		enemy.displayDeath()
		enemy.displayVictory()
		
	})

	const healPotion = document.getElementById(whichPlayerToHeal(player))
		if(potionP1 === true || potionP2 === true){
			if(healPotion){
				healPotion.addEventListener("click", function(){
					const currentFighter = choosenFighters.filter(elem=>elem.character == fighter.id)
					const who = currentFighter[0].player === "Joueur 1" ? "player_one" : "player_two"
					const arenaId = who === "player_one" ? "arena_1" : "arena_2"
					fighter.getPotion(fighter.id)
					isPotionDrunk(player)
					chooseCharacter(arenaId,fighter, player)
				})
			}
		}	
}
//---------FUNCTION TO DISPLAY OR HIDE POTION ICON
const displayPotionContainer = (player, fighter)=>{
	if(player === "player_one"){
		if(potionP1 === true && fighter.health > 0){
			return `<div class="heal_button">
			<i id=${whichPlayerToHeal(player)} class="fas fa-prescription-bottle-alt"></i>
		</div>`
		} else if (potionP1 === false || fighter.health == 0){
			return ""
		}
	}else if (player === "player_two"){
		if(potionP2 === true && fighter.health > 0){
			return `<div class="heal_button">
			<i id=${whichPlayerToHeal(player)} class="fas fa-prescription-bottle-alt"></i>
		</div>`
		} else if (potionP2 === false || fighter.health == 0){
			return ""
		}
	}
}
const isPotionDrunk = (player)=>{
	return player === "player_one" ? potionP1 = false : potionP2 = false
}
function isStatDown(fighter,key){
    if(fighter[key] <= 40){
        return `<span class="current_health" style="color:red; font-weight:bold">${fighter[key]}</span>`
    }else if (fighter[key] > 40){
        return `<span>${fighter[key]}</span>`
    }
}
//---------DETERMINE PLAYER TO HEAL 
const whichPlayerToHeal = (player)=>{
	return player === "player_one" ? "heal_player_one" : "heal_player_two"
}
//---------FUNCTION TO DISPLAY CHARACTER USER CHOSE
function displayChoosenFighter(fighter, player) {
	const whichOne = player === "player_one" ? "Joueur 1" : "Joueur 2";
	storePlayerAndFighter(whichOne, fighter.id);
	return `<div class="fighter fighterInArena">
		<span id="which_player">${whichOne}</span>
		<div id="${fighter.id}">
			<span class="name">${fighter.name}</span>
			<div class="img_container">
				<img src="./images/${fighter.id}.jpg" alt="photo conan">
			</div>
			<div class="specifications">
				<div class="spe"><span>Attack</span><span>${fighter.attack}</span></div>
				<div class="spe"><span>Defense</span><span>${isStatDown(fighter, "defense")}</span></div>
				<div class="spe"><span>Magical Attack</span><span>${fighter.magicAttack}</span></div>
				<div class="spe"><span>Magical Defense</span><span>${isStatDown(fighter, "magicDefense")}</span></div>
				<div class="spe"><span>Health</span><span>${isStatDown(fighter, "health")}</span></div>
			</div>
		</div>
		<div class="strike_buttons">
			<input id=${getPhysicalStrikeId(player)} class="ps_button" type="button" value="Attaque physique"/>
			<input id=${getMagicalStrikeId(player)} class="ms_button" type="button" value="Attaque magique"/>
		</div>
		${displayPotionContainer(player,fighter)}
	</div>`	
};

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
	const death = document.querySelector(".death")
	const victory = document.querySelector(".victory")

	for(let i = 0; i<characters.length; i++){

		let fighterId = characters[i].id
		for(let j = 0; j<choosenFighters.length; j++){
			let fighterName = choosenFighters[j].character
			if(fighterId === fighterName){
				characters[i].heal()
			}
		}
	}
	choosenFighters = []
	arena1.innerHTML="";
	arena2.innerHTML="";
	death.innerHTML ="";
	victory.innerHTML = "";
	potionP1 = true;
	potionP2 = true;
}

