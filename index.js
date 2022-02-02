class Fighter{
    constructor(id,name,attack,defense,magicAttack,magicDefense,health){
        this.id = id,
        this.name = name || "Unknown fighter",
        this.attack = attack,
        this.defense = defense,
        this.magicAttack = magicAttack || 0,
        this.magicDefense = magicDefense || 0,
        this.health = health
    }
    isDead(){
        return this.health <= 0
    }
    displayDeath(){
        this.isDead() ? console.log(`${this.name} est mort au combat`) : ("")
    }
    //ATTACK
    hit(type,aggressor){
        if(this.health > 0){
            if(type === "physical"){
                return aggressor.defense > 0 ? (aggressor.defense -= this.attack) : (aggressor.health -= this.attack)
            } else if (type === "magical"){
                return aggressor.magicDefense > 0 ? (aggressor.magicDefense -= this.magicAttack) : (aggressor.health -= this.magicAttack)
            }
        }
        else{
            this.displayDeath
        } 
    }
}
//3 DIFFERENT CHARACTERS FROM THE FIGHTER CLASS
let merlin = new Fighter("merlin","Merlin", 10, 30, 50, 100, 150)
let conan = new Fighter("conan","Conan",50, 100, 10, 50, 100)
let robin = new Fighter("robin","Robin des bois", 35, 85, 25, 75, 120)

function displayFighters(conan,merlin,robin){
    const chooseMenu = document.querySelector(".choose_menu")
    chooseMenu.innerHTML = `<div class="fighter">
    <div id="${conan.id}">
        <span class="name">${conan.name}</span>
        <div class="img_container">
            <img src="./images/${conan.id}.jpg" alt="photo conan">
        </div>
        <div class="specifications">
            <div class="spe"><span>Attack</span><span>${conan.attack}</span></div>
            <div class="spe"><span>Defense</span><span>${conan.defense}</span></div>
            <div class="spe"><span>Magical Attack</span><span>${conan.magicAttack}</span></div>
            <div class="spe"><span>Magical Defense</span><span>${conan.magicDefense}</span></div>
            <div class="spe"><span>Health</span><span>${conan.health}</span></div>
        </div>
    </div>
</div>
<div class="fighter">
    <div id="${merlin.id}">
        <span class="name">${merlin.name}</span>
        <div class="img_container">
            <img src="./images/${merlin.id}.jpg" alt="photo conan">
        </div>
        <div class="specifications">
            <div class="spe"><span>Attack</span><span>${merlin.attack}</span></div>
            <div class="spe"><span>Defense</span><span>${merlin.defense}</span></div>
            <div class="spe"><span>Magical Attack</span><span>${merlin.magicAttack}</span></div>
            <div class="spe"><span>Magical Defense</span><span>${merlin.magicDefense}</span></div>
            <div class="spe"><span>Health</span><span>${merlin.health}</span></div>
        </div>
    </div>
</div>
<div class="fighter">
    <div id="${robin.id}">
        <span class="name">${robin.name}</span>
        <div class="img_container">
            <img src="./images/${robin.id}.jpg" alt="photo conan">
        </div>
        <div class="specifications">
            <div class="spe"><span>Attack</span><span>${robin.attack}</span></div>
            <div class="spe"><span>Defense</span><span>${robin.defense}</span></div>
            <div class="spe"><span>Magical Attack</span><span>${robin.magicAttack}</span></div>
            <div class="spe"><span>Magical Defense</span><span>${robin.magicDefense}</span></div>
            <div class="spe"><span>Health</span><span>${robin.health}</span></div>
        </div>
    </div>
</div>
`
}

//DISPLAY ALL CHARACTERS
displayFighters(conan,merlin,robin)

//CHECKBOX ALLOWING USER TO CONFIRM UPCOMING CHARACTER CHOICE
const playerOne = document.getElementById("first_player_choose")
const playerTwo = document.getElementById("second_player_choose")

//FIGHTER CARD
const fighterConan = document.getElementById("conan")
const fighterMerlin = document.getElementById("merlin")
const fighterRobin = document.getElementById("robin")

//FUNCTIONS TO ALLOW USER TO CHOOSE A CHARACTER
function displayChoosenFighter(fighter, player){
    return `<div class="fighter">
    <span>${player}</span>
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
</div>`
}
function chooseCharacter (id,fighter,player){
    const arena = document.getElementById(id)
    const playerContainer = document.createElement("div")
    const addId = `<div id="${player}"></div>`
    arena.appendChild(playerContainer)
    playerContainer.insertAdjacentHTML("afterend", addId)
    const anyPlayer = document.getElementById(`${player}`)
    anyPlayer.innerHTML= displayChoosenFighter(fighter, player)
}


//PLAYER ONE CHOOSE CHARACTER
fighterConan.addEventListener("click", function(){
    if(playerOne.checked === true){
        chooseCharacter("arena_1", conan, "player_one")
    } else if(playerTwo.checked === true){
        chooseCharacter("arena_2", conan, "player_two")
    }
})
fighterMerlin.addEventListener("click", function(){
    if(playerOne.checked === true){
        chooseCharacter("arena_1", merlin, "player_one")
    }else if(playerTwo.checked === true){
        chooseCharacter("arena_2", merlin, "player_two")
    }
})
fighterRobin.addEventListener("click", function(){
    if(playerOne.checked === true){
        chooseCharacter("arena_1", robin, "player_one")
    } else if(playerTwo.checked === true){
        chooseCharacter("arena_2", robin, "player_two")
    }
})




    

