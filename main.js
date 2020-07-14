// class Armes (name, damage, className)
const arme0 = new Weapon("Boomerang", 10, "boomerang");
const arme1 = new Weapon("Hallberd", 15, "hallberd");
const arme2 = new Weapon("Scimitar", 20, "scimitar");
const arme3 = new Weapon("Fire rod", 25, "firerod");
const arme4 = new Weapon("Epée gardien", 30, "guardiansword");

let armeArray = [arme1, arme2, arme3, arme4]

// class Player (name, weapon, className)
let player1 = new Player("Zelda", arme0, "p1");
let player2 = new Player("Link", arme0, "p2");

let playerArray = [player1, player2]

// Déclaration des variables grille et joueurs
let grid = new Board(10, 10, 10);
let newGame = new Game();

let currentPlayer = player1;
let currentEnnemy = player2;
var panneauAffiche = 0;



// Appel des fonctions

$(function () {
    grid.generateGrid();
    grid.generateBlocks();
    grid.spawnPlayers();
    grid.spawnWeapons();
    newGame.setTrajectory();
    grid.generateDiv();
    grid.highlightTraj();

    newGame.movePlayer();
})