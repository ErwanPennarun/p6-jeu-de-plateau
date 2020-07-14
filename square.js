class Square {
    constructor(id, type, line, col) {
        this.id = id;
        this.blocked = false;
        this.type = type;
        this.reachable = true;
        this.trajectory = false;
        this.line = line;
        this.col = col;
        this.weapon = null;
    }

}