class Game {
    constructor() {}

    // Permet de gérer le tour par tour
    nextTurn() {

        if (currentPlayer.className == "p1") {
            currentPlayer = player2;
            currentEnnemy = player1;
        } else if (currentPlayer.className == "p2") {
            currentPlayer = player1;
            currentEnnemy = player2;
        }
    }

    // On définit les cases sur lesquelles le joueur peut se déplacer
    setTrajectory() {

        let playerX = currentPlayer.position.line;
        let playerY = currentPlayer.position.col;


        for (let i = 1; i <= 3; i++) { // Boucle vérifiant les trois prochaines cases vers la droite
            if (playerY + i > 9) { // Vérifie si l'on reste dans les limites de la grille
                break;
            } else if (grid.grille[playerX][playerY + i].reachable != false) { // Vérifie que la case n'est pas bloquée
                grid.grille[playerX][playerY + i].trajectory = true
            } else {
                break
            }
        }

        for (let i = 1; i <= 3; i++) {
            if (playerY - i < 0) {
                break;
            } else if (grid.grille[playerX][playerY - i].reachable != false) {
                grid.grille[playerX][playerY - i].trajectory = true
            } else {
                break
            }
        }

        for (let i = 1; i <= 3; i++) {
            if (playerX + i > 9) {
                break;
            } else if (grid.grille[playerX + i][playerY].reachable != false) {
                grid.grille[playerX + i][playerY].trajectory = true
            } else {
                break
            }
        }

        for (let i = 1; i <= 3; i++) {
            if (playerX - i < 0) {
                break;
            }
            if (grid.grille[playerX - i][playerY].reachable != false) {
                grid.grille[playerX - i][playerY].trajectory = true
            } else {
                break
            }
        }

    }
    // Met en empty les cases de trajectoire après le déplacement
    resetTrajectory() {
        for (let x = 0; x < grid.columns; x++) {
            for (let y = 0; y < grid.rows; y++) {
                if (grid.grille[x][y].trajectory != false) {
                    grid.grille[x][y].trajectory = false;
                    grid.grille[x][y].type = "empty";
                    $('#' + x + y).removeClass(currentEnnemy.className + 'traj').addClass('empty')
                }

            }
        }

    }

    // On échange les armes le cas échéant
    swapWeapon() {
        for (let x = 0; x < grid.columns; x++) {
            for (let y = 0; y < grid.rows; y++) {
                // Boucle se lancant si la case sur lequel est le joueur contient une arme
                if ((grid.grille[x][y].weapon != null) && (grid.grille[x][y].player == currentPlayer.name)) {
                    let newWeapon = grid.grille[x][y].weapon; // Enregistre la nouvelle arme
                    let oldWeapon = currentPlayer.weapon; // Enregistre l'arme à déposer
                    $('#' + x + y).addClass(oldWeapon.className).removeClass(newWeapon.className) // Change le visuel de la case
                    currentPlayer.weapon = newWeapon // Accorde la nouvelle arme au joueur
                    grid.grille[x][y].weapon = oldWeapon // Dépose l'arme sur la case
                    grid.grille[x][y].type = oldWeapon.className



                }
            }
        }
    }

    // Vérifie si les joueurs sont côte à côte
    isAdjacent() {
        let adjacent = false;
        // Si la position verticale des deux joueurs est la même, on vérifie leur position horizontale
        if (currentPlayer.position.col == currentEnnemy.position.col) {
            if (Math.abs(currentPlayer.position.line - currentEnnemy.position.line) == 1) {
                adjacent = true;

            }
        }
        // Si la position horizontale des deux joueurs est la même, on vérifie leur position verticale
        if (currentPlayer.position.line == currentEnnemy.position.line) {
            if (Math.abs(currentPlayer.position.col - currentEnnemy.position.col) == 1) {
                adjacent = true;
            }
        }
        return adjacent;
    }

    // On gère le déplacement des joueurs
    movePlayer() {

        $('.' + currentPlayer.className + 'traj').click(function () {
            // Récupération de la position dans le tableau de la div cliquée
            let idClicked = $(this).attr('id');
            let idArr = idClicked.split("");
            let posX = idArr[0];
            let posY = idArr[1];

            if (grid.grille[posX][posY].trajectory != false) {
                // Suppression de la position initiale du joueur et mise à jour div quittante
                currentPlayer.position.player = null;
                currentPlayer.position.type = "empty";
                currentPlayer.position.reachable = true;
                $('#' + currentPlayer.position.id).removeClass(currentPlayer.className).addClass('empty')

                // Modification de la position du joueur et mise à jour div entrante
                currentPlayer.position = grid.grille[posX][posY];
                grid.grille[posX][posY].type = currentPlayer.className;
                grid.grille[posX][posY].player = currentPlayer.name;
                grid.grille[posX][posY].reachable = false;
                $('#' + currentPlayer.position.id).addClass(currentPlayer.className).removeClass('empty').removeClass("traj");

                newGame.swapWeapon(); // Echange l'arme le cas échéant
                newGame.isAdjacent(); // Vérifie si les joueurs ont des positions adjacentes
                newGame.updateGame(); // Lance une suite de fonction permettant de gérer le jeu

            }
        })

    }
    // Gère l'attaque
    attacking() {
        currentPlayer.fight(currentEnnemy); // Utilise la fonction fight déclarée dans player.js
        setTimeout(function () {
            $('#defend' + currentPlayer.className).hide()
        }, 400) // Cache le bouclier le cas échéant
        newGame.updateGame(); // Continue le jeu

    }

    // Gère la défense
    defending() {
        currentPlayer.defend(); // Utilise la fonction defend déclarée dans player.js
        $('#defend' + currentPlayer.className).show(); // Affiche un bouclier
        newGame.updateGame() // Continue le jeu

    }

    // Fin de la partie
    endGame() {
        setTimeout(function () {
            alert(currentEnnemy.name + ' a gagné. Cliquez sur OK pour relancer la partie'),
                window.location.reload()
        }, 200)
    }

    // Suite de fonctions permettant au jeu de continuer
    updateGame() {
        grid.updateInfos(); // Met à jour les cases armes et force si besoin
        newGame.nextTurn(); // Change le joueur actif
        $('#playerName').html(currentPlayer.name).prop("class", "name-" + currentPlayer.className);

        newGame.resetTrajectory(); // Efface l'ancienne trajectoire

        if (!this.isAdjacent()) { // Si les deux joueurs ne sont pas côte à côte, on exécute
            newGame.setTrajectory();
            grid.highlightTraj(); // Met en évidence sur le plateau les cases accessibles
            newGame.movePlayer(); // Déplace le joueur
        } else {
            if (panneauAffiche !== 1) {
                $('#annonce-fight').fadeIn("slow", function () {
                    $(this).delay(3000).fadeOut("fast")
                    panneauAffiche = 1
                })
                grid.fighting()

            }
        }

    }
}
