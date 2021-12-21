import Field from './fields.js';
import Ship from './ship.js';
import Game from './game.js';
class Flot {
    constructor(playerField, player) {
        this.player = player;
        this.playerField = playerField;
        this.shipList = []
        this.addShips();
    }
    addShips() {
        let shipNum = JSON.parse(localStorage.getItem('numberOfAvailableShips'));
        for (let i = 0; i < shipNum.length; i++) {
            this.shipList.push(new Ship(
                shipNum[i], 
                this.playerField, 
                this.player))
        }
    }
}



export default Flot;