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
        const death = document.querySelector(".death")
		this.isDead() ? death.innerHTML=`<i class="fas fa-skull-crossbones"></i><span class="fighterDead">${this.name} est mort au combat </span><i class="fas fa-skull-crossbones"></i>` : "";
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
}
export default Fighter