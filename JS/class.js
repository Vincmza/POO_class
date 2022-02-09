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
export default Fighter