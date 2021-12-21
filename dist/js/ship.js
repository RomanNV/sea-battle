import Field from './fields.js';


class Ship {
    constructor(type, playerGrid, player) {
        this.shipLength = localStorage.getItem(`${type}`);
        this.shipList = JSON.parse(localStorage.getItem('numberOfAvailableShips'));
        this.type = type;
        this.playerGrid = playerGrid;
        this.player = player;
        this.maxDamage = this.shipLength;
            this.sunk = false;
    }
    isNormalPosition(){

}

}
export default Ship;