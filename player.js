// Créer deux joueurs et 4 armes
class Player {
    constructor(name, weapon, className) {
        this.name = name;
        this.hp = 100;
        this.weapon = weapon;
        this.className = className;
        this.defense = false;
        this.position = null;

    }


isHit(dmg) {
    
    if (this.defense == true) { 
        this.hp = this.hp - (dmg/2); // Si l'ennemi se défend, les dégats reçus sont divisés par 2 
        this.defense = false;
    } else {
        this.hp = this.hp - dmg; // Sinon, on soustrait la force de l'arme aux HP de l'ennemi
    }

    if (this.hp <= 0) { // Si les HP sont à 0 ou en dessous...
        this.hp = 0; // On affiche que les HP sont à 0
        $('.btn-fight').hide(); 
        $('#to-do').hide();
        newGame.endGame(); // Le jeu se finit
    }
}

defend() {
    this.defense = true;
    return this.defense
}

fight(ennemy) {
    ennemy.isHit(this.weapon.force);
    return true;
}

}





