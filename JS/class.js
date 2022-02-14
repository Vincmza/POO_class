import {choosenFighters} from "./index.js"
class Fighter {
	constructor(id, name, attack, defense, maxDefense, magicAttack, magicDefense, maxMagicDefense, health, fullHealth) {
			(this.id = id),
			(this.name = name || "Unknown fighter"),
			(this.attack = attack),
			(this.defense = defense),
			(this.maxDefense = maxDefense),
			(this.magicAttack = magicAttack || 0),
			(this.magicDefense = magicDefense || 0),
			(this.maxMagicDefense = maxMagicDefense),
			(this.health = health),
			(this.fullHealth = fullHealth);
	}
	isDead() {
		return this.health <= 0;
	}
	displayVictory(){
		const whoWins = document.querySelector(".victory")
		const whoHasSurvived = choosenFighters.filter(item => item.character !== this.id)
		this.isDead() ? whoWins.innerHTML = `<i class="fas fa-khanda"></i> ${whoHasSurvived[0].character.toUpperCase()} est victorieux ! <i class="fas fa-khanda"></i>`: ""
	}
	displayDeath() {
        const death = document.querySelector(".death")
		this.isDead() ? death.innerHTML=`<i class="fas fa-skull-crossbones"></i><span class="fighterDead">${this.name.toUpperCase()} n'est plus </span><i class="fas fa-skull-crossbones"></i>` : "";
	}
    defenseScore (aggressor){
        if(aggressor.defense < 0) {aggressor.defense = 0}
        if(aggressor.magicDefense < 0) {aggressor.magicDefense = 0}
        if(aggressor.health < 0){aggressor.health = 0}
    }
	//ATTACK
	hit(type, aggressor) {
		if (this.health > 0) {
			if (type === "physical") {
                if(aggressor.defense > 0){
                    aggressor.defense -= this.attack
                    this.defenseScore(aggressor)
                } else if (aggressor.defense <= 0){
                    aggressor.health -= this.attack
                    this.defenseScore(aggressor)
                }
			} else if (type === "magical") {
				if(aggressor.magicDefense > 0){
                    aggressor.magicDefense -= this.magicAttack
                    this.defenseScore(aggressor)
                } else if (aggressor.magicDefense <= 0){
                    aggressor.health -= this.magicAttack
                    this.defenseScore(aggressor)
                }
			}
		} else {
			this.displayDeath;
		}
	}
	heal(){
		this.health = this.fullHealth;
		this.defense = this.maxDefense;
		this.magicDefense = this.maxMagicDefense;
	}
	getPotion(id){
		if(id === "robin") return this.health += Math.round((this.fullHealth/100)*70)
		if(id === "merlin") return this.health += Math.round((this.fullHealth/100)*15)
		if(id === "conan") return this.health += Math.round((this.fullHealth/100)*25)
	}
	
}
export default Fighter