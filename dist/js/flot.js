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

    placeTheShip(x, y, direction, shipType) {
        let shipCoords = null;

        for (let ship of this.shipList) {
            if (shipType === ship.type && ship.isNormalPosition(x, y, direction)) {
                ship.createShip(x, y, direction, false);
                ship.updateCellWhenShipPlace(x, y, direction);
                shipCoords = ship.coordsShipCells();
                for (let shipCoord of shipCoords) {
                    this.playerField.updateCell(
                        shipCoord.x,
                        shipCoord.y,
                        'ship',
                        this.player
                    );
                }

                return true;
            }
        }
        return false;
    }

}



export default Flot;