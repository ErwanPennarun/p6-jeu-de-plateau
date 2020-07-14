// Créer deux joueurs et 4 armes
class Player {
    constructor(name, weapon, img, className) {
        this.name = name;
        this.hp = 100;
        this.weapon = weapon;
        this.img = img;
        this.className = className;
        this.defense = false;
        this.position = null;

    }
}



class Weapon {
    constructor(name, force, img, className) {
        this.name = name;
        this.force = force;
        this.img = img;
        this.className = className;
        this.line = -1;
        this.col = -1;
    }
}

const arme0 = new Weapon("arme 0", 10, '<img src=""></img>', "weapon0");
const arme1 = new Weapon("arme 1", 15, '<img src=""></img>', "weapon1");
const arme2 = new Weapon("arme 2", 20, '<img src=""></img>', "weapon2");
const arme3 = new Weapon("arme 3", 25, '<img src=""></img>', "weapon3");
const arme4 = new Weapon("arme 4", 15, '<img src=""></img>', "weapon4");


const player1 = new Player("player 1", arme0, '<img src=""></img>', "player1");
const player2 = new Player("player 2", arme0, '<img src=""></img>', "player2");

class Square {
    constructor(id, type, line, col) {
        this.id = id;
        this.type = type;
        this.trajectory = true;
        this.line = line;
        this.col = col;
        this.player = false;
        this.weapon = null;
    }

}


function randomNum(max) {
    return Math.floor(Math.random() * max);
}


class Board {
    constructor() {
        this.rows = 10;
        this.columns = 10;
        this.weapons = 4;
        this.players = 2
        this.blocked = 10;
        this.grille = [];
        this.currentPlayer = player1;
        this.currentEnemy = player2;
    }

    // Générer la grille vide de toute case

    generatethis.gameMap() {
        for (let x = 0; x < this.columns; x++) {
            this.grille[x] = [];

            for (let y = 0; y < this.rows; y++) {
                this.grille[x][y] = new Square(""+x+y, "empty", x, y);
            }

        }
        return this.grille;
    }

    // Générer des blocs impassables

    generateBlocks() {
        for (let i = 0; i < this.blocked; i++) {
            let randomRow = randomNum(this.rows);
            let randomCol = randomNum(this.columns);

            if (this.grille[randomRow][randomCol].type !== "blocked") {
                this.grille[randomRow][randomCol].type = "blocked";
            } else {
                i--;
            }
        }
    }

    // Chercher des cases vides 

    getEmptySquare() {
        let emptySquare = new Array();
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                if (this.grille[x][y].type !== "blocked") {
                    emptySquare.push({
                        X : x,
                        Y: y 
                    });
                }
            }
        }
            return emptySquare;
        
    }


   spawnPlayers() {
        let freeSquares = this.getEmptySquare();

        let p1Pos = randomNum(freeSquares.length);
        let play1Pos = freeSquares[p1Pos];
      
        let p2Pos = randomNum(freeSquares.length);
        let play2Pos = freeSquares[p2Pos];

        this.grille[play1Pos.X][play1Pos.Y].type = "p1";
        this.grille[play1Pos.X][play1Pos.Y].player = "player1";
        player1.position = this.grille[play1Pos.X][play1Pos.Y];

        this.grille[play2Pos.X][play2Pos.Y].type = "p2";
        this.grille[play2Pos.X][play2Pos.Y].player = "player2";
        player2.position = this.grille[play2Pos.X][play2Pos.Y];

        
        
    } 
    
nextTurn() {
    if (this.currentPlayer == player1) {
        this.currentPlayer = player2;
        this.currentEnnemy = player1;
    }
    else if (this.currentPlayer == player2) {
        this.currentPlayer = player1;
        this.currentEnnemy = player2;
    }
}

casesMax(posX,posY,direction) {
    // Limites direction
  
        let limit;
        switch (direction){
            case "left" :
                var y = posY;
                var stop = false; // 
                var limLeft = posY-3;
                while (y >= 0 && y >= limLeft && !stop) {
                    if (this.grille[posX][y].type == "blocked" || this.grille[posX][y].player == currentEnemy) {
                        stop = true;
                    }
                    y--;
                }
                limit = y + 1;
                break;
            case "right" :
                var y = posY;
                var stop = false;
                var limRight = posY+3;
                while (y < this.grille.length && y <= limRight && !stop) {
                    if (this.grille[posX][y].type == "blocked" || this.grille[posX][y].player == currentEnemy) {
                        stop = true;
                    }
                    y++;
                }
                limit = y - 1;
                break;
            case "up" :
                var x = posX;
                var stop = false;
                var limUp = posX-3;
                while (x >= 0 && x >= limUp && !stop) {
                    if (this.grille[x][posY].type == "blocked" || this.grille[x][posY].player == currentEnemy) {
                        stop = true;
                    }
                    x--;
                }
                limit = x + 1;
                break;
            case "down" :
                var x = posX;
                var stop = false;
                var limDown = posX+3;
                while (x < this.grille.length && x <= limDown && !stop) {
                    if (this.grille[x][posY].type == "blocked" || this.grille[x][posY].player == currentEnemy) {
                        stop = true;
                    } 
                    x++;
                }
                limit = x - 1;
                break;
            default :
                limit = -1;
        }
      
        return limit;
    }


trajectory()
{
    for (let x = 0; x < this.rows; x++) {
        for (let y = 0; y < this.columns; y++) {
            if (this.grille[x][y].player == player1) {
                let limUp = this.casesMax(x, y, "up");
                    for (let upX = x; upX >= limUp; upX--) {
                        this.grille[upX][y].trajectory = true;
                    }

                let limDown = this.casesMax(x, y, "down");
                    for (let downX = x; downX >= limDown; downX++) {
                        this.grille[downX][y].trajectory = true;
                    }
                    
                let limLeft = this.casesMax(x, y, "left");
                    for (let leftY = y; leftY >= limLeft; leftY--) {
                        this.grille[x][leftY].trajectory = true;
                    }
                let limRight = this.casesMax(x, y, "right");
                    for (let rightY = y; rightY <= limRight; rightY++) {
                        this.grille[x][rightY].trajectory = true;
                    }
            }
        }
    }
}

surlTrajectory() {
             
    for (let x = 0; x < this.rows; x++) {
        for (let y = 0; y < this.columns; y++) {
            if (this.grille[x][y].trajectory == true && this.grille[x][y].type !== "blocked" && this.grille[x][y].player == false) {
                $('#'+x+y).addClass("traj");
            }
            else {
                this.grille[x][y].trajectory = false;
            }
        }
    }
}


}

let this.gameMap = new Board();


function generateDiv() {
    for (let x = 0; x < this.gameMap.columns; x++) {
        for (let y = 0; y < this.gameMap.rows; y++) {
            let sqtype = this.gameMap.grille[x][y].type;
            let sqid = this.gameMap.grille[x][y].id;
            $('<div />').addClass(sqtype).attr("id", sqid).appendTo('#this.gameMap')
        }
    }
}

$(function () {
    this.gameMap.generatethis.gameMap();
    this.gameMap.generateBlocks();
    this.gameMap.getEmptySquare();
    this.gameMap.spawnPlayers();
    this.gameMap.casesMax();
    this.gameMap.trajectory();
    this.gameMap.surlTrajectory();

    generateDiv();
    console.log(this.gameMap);



})

/*
// Cherche le nombre d'occurences dans un tableau

function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}
function generatethis.gameMap() {

    for (let x = 0; x < newBoard.row; x++) {
        for (let y = 0; y < newBoard.square; y++) {
        grille.push('empty')
    }
    }

    while ((getOccurrence(grille, 'blocked') < newBoard.blocked)) {
        let random = randomNum(100)
        grille[random] = 'blocked';
    }

    while ((getOccurrence(grille, 'pw') < newBoard.pw)) {
            let random = randomNum(100)
            if (grille[random] !== 'blocked') { 
                grille[random] = 'pw' 
            
        } 
    }

// Transformation en div

 for (i = 0; i < grille.length; i++) {
 $('<div />').addClass(grille[i]).attr('id', [i+1]).appendTo('.this.gameMap')
  }

console.log(getOccurrence(grille, 'blocked'));
console.log(getOccurrence(grille, 'pw'));

    i = 0;
    $('.pw').each(function(i, pw) {
        $(pw).addClass(playersWeapons[i]).removeClass('pw');
        ++i; 
        if (i === playersWeapons.length) { 
            i = 0 
        }
    });
}


$(function() {
    generatethis.gameMap();
})


// Génération de la grille
/*


// Appel général des fonctions





/* 
function generatethis.gameMap() {

    for (let x = 0; x < newBoard.row; x++) {
        for (let y = 0; y < newBoard.square; y++) {
            $('.this.gameMap').append('<div class = "square empty" x=' + [y + 1] + ' y=' + [x + 1] + '></div>')
        }
    }
    /*
    // Génération des lignes
        for (let x = 0; x < newBoard.row; x++) {
            $('.this.gameMap').append('<div class="row" id='+[x+1]+'></div>');
        }
        
    // Génération des cases

        for (let y = 0; y < newBoard.square; y++) {
            $('.row').append("<div class='square empty' blocked=false></div>");
        }

        $('.row').each(function(index) {
            $(this).attr('id', index+1)
        });
    
    // Récupération empty et assignation 

    let square = $('.square').get();
    for (let j = 0; j < newBoard.pw; j++) {
        let spawnable = square[Math.floor(Math.random() * square.length)];
        $(spawnable).addClass('spawnable').removeClass('empty');
    }

    $('.spawnable').each(function (j) {
        $(this).addClass(playersWeapons[j]).removeClass('spawnable');
    });


    // Génération blocs noirs

    let empty = $('.empty').get();
    for (let i = 0; i < newBoard.blocked; i++) {
        let blockedSquare = empty[Math.floor(Math.random() * empty.length)];
        console.log(blockedSquare)
        $(blockedSquare).each(function () {
            $(blockedSquare).addClass('blocked').removeClass('empty').attr('blocked', true)
        })

    }
};



/*
trajectory() {
    let posX = posX; // récupérer l'id x de la div du joueur / x
    let posY = posY;  // récupérer id y de la div du joueur / y

    for (let i = 0; i <= 3; i++) {
        const leftSquare = // récupérer id, (parseInt(posX) - i)
        if (leftSquare === null) {
            break; 
        }
        else if (!$(leftSquare).hasClass('player') && $(leftsquare).hasClass('blocked')) 
        {
        $(leftsquare).addClass('trajectory');
        } 
        else 
        { break; }
    }

    for (let i = 0; i <= 3; i++) {
        const topSquare = // récupérer id, (parseInt(posY) + i)
        if (topSquare === null) {
            break; 
        }
        else if (!$(topSquare).hasClass('player') && $(topSquare).hasClass('blocked')) 
        {
        $(topSquare).addClass('trajectory');
        } 
        else 
        { break; }
    }


}

 */





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