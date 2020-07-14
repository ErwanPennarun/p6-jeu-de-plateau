// Créer deux joueurs et 4 armes
class Game {
    constructor() {
        this.currentPlayer = player1;
        this.currentEnnemy = player2;
    }
}
class Weapon {
    constructor(name, force, img, className) {
        this.name = name;
        this.force = force;
        this.img = img;
        this.className = className;
    }
}

const arme0 = new Weapon("arme 0", 10, '<img src=""></img>', "weapon0");
const arme1 = new Weapon("arme 1", 15, '<img src=""></img>', "weapon1");
const arme2 = new Weapon("arme 2", 20, '<img src=""></img>', "weapon2");
const arme3 = new Weapon("arme 3", 25, '<img src=""></img>', "weapon3");
const arme4 = new Weapon("arme 4", 15, '<img src=""></img>', "weapon4");

class Player {
    constructor(name, hp, weapon, img, className) {
        this.name = name;
        this.hp = hp;
        this.weapon = weapon;
        this.img = img;
        this.className = className;
        this.defense = false;
    }
}

const player1 = new Player("player 1", 100, arme0, '<img src=""></img>', "player1");
const player2 = new Player("player 2", 100, arme0, '<img src=""></img>', "player2");

// Création grille

class Board {
    constructor(row, square, blocked, pw) {
        this.row = row;
        this.square = square;
        this.blocked = blocked;
        this.pw = pw;
    }
}

let newBoard = new Board(10, 10, 10, 6);
players = new Array("player1", "player2");
weapons = new Array("weapon1", "weapon2", "weapon3", "weapon4");
playersWeapons = new Array("player1", "player2","weapon1", "weapon2", "weapon3", "weapon4")


function generateGrid() {

// Génération des lignes
    for (let x = 0; x < newBoard.row; x++) {
        $('.grid').append("<div class='row'></div>");
    }
    
// Génération des cases

    for (let y = 0; y < newBoard.square; y++) {
        $('.row').append("<div class='square empty' blocked=false></div>");
    }

    $('.square').each(function(index) {
        $(this).attr('id', index+1)
    });

// Génération cases spéciales

    let square = $('.square').get();
    // Récupération des blocs libres
    console.log(square)
    for (let i = 0; i < newBoard.blocked; i++) {
        let blockedSquare = square[Math.floor(Math.random() * square.length)];
        console.log(blockedSquare)
        $(blockedSquare).each(function (event){
            $(blockedSquare).addClass('blocked').removeClass('empty').attr('blocked', true)
        })
        

    }

    
// Récupération empty et assignation 

    let empty = $('.empty').get();
    console.log(empty)
    for (let j = 0; j < newBoard.pw; j++) {
        let spawnable = empty[Math.floor(Math.random() * empty.length)];
        $(spawnable).addClass('spawnable').removeClass('empty');
    }

    $('.spawnable').each(function(j) {
        $(this).addClass(playersWeapons[j]).removeClass('spawnable');
    });
       

// Attribution lignes et colonnes 
/*
    $('.row').each(function(x) {
        $(this).attr('id', x+1)
        line = $(this).attr('id')
        $(this).children('div').each(function(y){
            $(this).attr('id', String(x+1)+ "-" + String(y+1))
        });
    });
  */ 
// Cases adjacentes
};


function getAdjacentBoxes(clickedEl){
    // filters into a new array "adjacentIds" that are less than 0 or greater than 99
    let adjacentIds = [(parseInt(clickedEl.id) + 1), (parseInt(clickedEl.id) - 1), (parseInt(clickedEl.id) + this.square), (parseInt(clickedEl.id) - this.square)];
    adjacentIds = adjacentIds.filter(v => {
      if (v > 0 && v < (this.row * this.square) -1) return v;
    });
    return adjacentIds;
  };





$(function(){
    generateGrid();
    getAdjacentBoxes();
});




// Génération de blocs impassables
/* 
function generateBlocked() {
    let square = $('.empty').get();

    for (i = 0; i < newBoard.blocked; i++) {
        let blockedSquare = square[Math.floor(Math.random() * square.length)];
        $(blockedSquare).addClass('blocked').removeClass('empty');
    };
};



// Génération cases pour armes et joueurs

function casesLibres() {

    let square = $('.empty').get();
    
    for (i = 0; i < playersWeapons.length; i++) 
    {
    let libres = square[Math.floor(Math.random() * square.length)];
    $(libres).addClass('name').removeClass('empty');

    };
};

// Génération cases joueurs + armes

function generatePlayersWeapons() {

    i = 0;
    $('.name').each(function(i, name) {
        $(name).addClass(playersWeapons[i]).removeClass('name');
        ++i; 
        if (i === playersWeapons.length) { 
            i=0 
        }
    });
}


*/


// Génération position joueur 
/*

 function generatePlayer() {

    let square = $('.empty').get();

    for (i = 0; i < 2; i++) {
        let player = square[Math.floor(Math.random() * square.length)];
        $(player).addClass('player').removeClass('empty');
    };
};
*/ 
// Génération armes

/*

function generatePlayer()
{
    let square = $('.empty').get();
    let posPlayer1 = 1;
    let posPlayer2 = 1;

    do { 
        posPlayer1 = Math.floor(Math.random() * square.length) + 1;
    } 
    while (posPlayer1 === posPlayer2);

    do {
        posPlayer2 = Math.floor(Math.random() * square.length) + 1;
    } 
    while (posPlayer2 === posPlayer1); 

    $('.empty').each(function(index) {
        if (index === posPlayer1) {
            $(this).addClass(player1.className).removeClass('empty');

        }
        if (index === posPlayer2) {
            $(this).addClass(player2.className).removeClass('empty');
            
        }
    });

}
*/


// Appel des fonctions

