import Fighter from "./class.js"
import displayFighters from "./displayChoiceMenu.js"

//---------3 DIFFERENT CHARACTERS FROM THE FIGHTER CLASS
let merlin = new Fighter("merlin", "Merlin", 10, 30, 50, 100, 150);
let conan = new Fighter("conan", "Conan", 50, 100, 10, 50, 100);
let robin = new Fighter("robin", "Robin des bois", 35, 85, 25, 75, 120);
//---------ARRAY TO STORE PLAYER AND CHARACTER
let choosenFighters = [];
//---------ALL CLASS PUT AWAY IN AN ARRAY
let characters = [merlin, conan, robin]

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

	physicalAttackBtn.addEventListener("click", function (){

		const opponent = choosenFighters.filter(elem=>elem.character != fighter.id)
		const enemy = characters.filter(elem => elem.id == opponent[0].character)[0]
		const who = opponent[0].player === "Joueur 1" ? "player_one" : "player_two"
		const arenaId = who === "player_one" ? "arena_1" : "arena_2"
		fighter.hit("physical", enemy)
		chooseCharacter(arenaId,enemy,who)
		enemy.displayDeath()
	})

	const magicalAttackBtn = document.getElementById(getMagicalStrikeId(player))

	magicalAttackBtn.addEventListener("click", function (){

		const opponent = choosenFighters.filter(elem=>elem.character != fighter.id)
		const enemy = characters.filter(elem => elem.id == opponent[0].character)[0]
		const who = opponent[0].player === "Joueur 1" ? "player_one" : "player_two"
		const arenaId = who === "player_one" ? "arena_1" : "arena_2"
		fighter.hit("magical", enemy)
		chooseCharacter(arenaId,enemy,who)
		enemy.displayDeath()
		
	})
}
//---------FUNCTION TO DISPLAY CHARACTER USER CHOSE
function displayChoosenFighter(fighter, player) {
	const whichOne = player === "player_one" ? "Joueur 1" : "Joueur 2";
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
			<input id=${getPhysicalStrikeId(player)} class="ps_button" type="button" value="Attaque physique"/>
			<input id=${getMagicalStrikeId(player)} class="ms_button" type="button" value="Attaque magique"/>
		</div>
	</div>`	
};


export {storePlayerAndFighter, getPhysicalStrikeId, getMagicalStrikeId, displayChoosenFighter, chooseCharacter }