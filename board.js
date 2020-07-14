class Board {
    constructor(rows, columns, blocked) {
        this.rows = rows;
        this.columns = columns;
        this.blocked = blocked;
        this.grille = [];


    }

    // Générer une grille vide de toute case

    generateGrid() {
        for (let x = 0; x < this.columns; x++) {
            this.grille[x] = [];

            for (let y = 0; y < this.rows; y++) {
                this.grille[x][y] = new Square("" + x + y, "empty", x, y);
            }

        }
        return this.grille;
    }

    // Générer des blocs impassables et les dispose aléatoirement sur la grille

    generateBlocks() {
        for (let i = 0; i < this.blocked; i++) {
            let randomRow = randomNum(this.rows);
            let randomCol = randomNum(this.columns);

            if (this.grille[randomRow][randomCol].blocked != true) {
                this.grille[randomRow][randomCol].type = "blocked";
                this.grille[randomRow][randomCol].blocked = true;
                this.grille[randomRow][randomCol].reachable = false;
            } else {
                i--;
            }
        }
    }

    // Remplis un tableau des cases non occupées par une case bloc ou un joueur

    getEmptySquare() {
        let emptySquare = new Array();
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.columns; y++) {
                if (this.grille[x][y].type != "blocked" && this.grille[x][y].type != "p1" && this.grille[x][y].type != "p2") {
                    emptySquare.push({
                        X: x,
                        Y: y
                    });
                }
            }
        }
        return emptySquare;

    }

    // Génère deux positions aléatoires et y place les joueurs


    spawnPlayers() {
        let freeSquares = this.getEmptySquare();

        for (let x = 0; x < playerArray.length; x++) {
            let playerIndex = randomNum(freeSquares.length) // Génère un nombre aléatoire ayant pour maximum la taille du tableau de cases vides
            let playerPos = freeSquares[playerIndex];
    
            this.grille[playerPos.X][playerPos.Y].type = playerArray[x].className;
            this.grille[playerPos.X][playerPos.Y].reachable = false;
    
            playerArray[x].position = this.grille[playerPos.X][playerPos.Y]; // Enregistre la nouvelle position du joueur
        }
        
        // Si les deux joueurs sont trop proches, on relance la génération
        if (Math.abs(player1.position.line - player2.position.line) <= 2 || Math.abs(player1.position.col - player2.position.col) <= 2) {
            player1.position.type = "empty";
            player1.position.reachable = true;
            player1.position = null;
            player2.position.type = "empty";
            player2.position.reachable = true;
            player2.position = null;

            this.spawnPlayers()
        }


    }

    // Génération de positions pour les armes
    spawnWeapons() {
        let freeSquares = this.getEmptySquare();
        

        for (let x = 0; x < 4; x++) {
            let w1Pos = randomNum(freeSquares.length);
            let weapon1Pos = freeSquares[w1Pos]
            let weapon1g = this.grille[weapon1Pos.X][weapon1Pos.Y]

            weapon1g.type = armeArray[x].className
            weapon1g.weapon = armeArray[x]
        }

    }

    // Affichage sur la grille des trajectoires possibles
    highlightTraj() {
        for (let x = 0; x < grid.columns; x++) {
            for (let y = 0; y < grid.rows; y++) {
                if (this.grille[x][y].trajectory == true) {
                    // Change la classes des divs correspondant aux trajectoires
                    $('#' + x + y).addClass(currentPlayer.className + 'traj').removeClass('empty') 
                } else {
                    this.grille[x][y].trajectory == false
                }

            }
        }
    }

    // Genère les div pour remplir la grille et change les classes pour faire apparaître les différents types de cases (joueur, arme, bloquées)
    generateDiv() {
        for (let x = 0; x < grid.columns; x++) {
            for (let y = 0; y < grid.rows; y++) {
                let sqtype = this.grille[x][y].type;
                let sqid = this.grille[x][y].id;
                $('<div />').addClass(sqtype).attr("id", sqid).appendTo('#grid')
            }
        }

        $('#wp1').attr("src", "img/" + player1.weapon.className + ".png"); // Ajoute l'image correspondante à l'arme en main
        $('#wp2').attr("src", "img/" + player2.weapon.className + ".png");
        $('#wfp1').append(player1.weapon.force); // Ajoute la force de l'arme en main
        $('#wfp2').append(player2.weapon.force);

    }

    updateInfos() {
        $('#hpp1').html(player1.hp); // Met à jour les HP des joueurs
        $('#hpp2').html(player2.hp);
        $('#health-p1').attr("value", player1.hp); // Met à jour la barre de HP des joueurs
        $('#health-p2').attr("value", player2.hp);
        $('#wp1').attr("src", "img/" + player1.weapon.className + ".png"); // Met à jour le cas échéant l'image de l'arme en main
        $('#wp2').attr("src", "img/" + player2.weapon.className + ".png");
        $('#wfp1').html(player1.weapon.force); // Met à jour le cas échéant la force de l'arme en main
        $('#wfp2').html(player2.weapon.force);
    }

    fighting() {
        setTimeout(function () {
            $('#fight').fadeIn(500), $('.img-player').fadeOut("slow"),
                $('.info-left').animate({ 
                    "left": '+64px'
                }).css("background", "rgba(0,0,0,0.9)"),
                $('#left-dec').hide(), $('#right-dec').hide(),
                $('.info-right').animate({
                    "right": '+84px'
                }).css("background", "rgba(0,0,0,0.9)")
        }, 3500)

    }

}

// Fonction retournant un nombre aléatoire
function randomNum(max) {
    return Math.floor(Math.random() * max);
}