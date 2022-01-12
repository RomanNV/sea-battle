import Field from './fields.js';
import Ship from './ship.js';
import Game from './game.js';
import {
    getRandom
} from '../utility.js';
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



    placeShipsRandom(player) {
        let x = null;
        let y = null;
        let direction = null;
        let flag = null;
        let shipCoords = null;
        for (let ship of this.shipList) {
            flag = true;
            while (flag) {
                x = getRandom(0, 9);
                y = getRandom(0, 9);
                direction = getRandom(0, 1);
                if (ship.isNormalPosition(x, y, direction)) {
                    ship.createShip(x, y, direction, false);
                    ship.updateCellWhenShipPlace(x, y, direction);
                    flag = false;
                    if (player == localStorage.getItem('player')) {
                        shipCoords = ship.coordsShipCells();
                        for (let shipCoord of shipCoords) {
                            this.playerField.updateCell(
                                shipCoord.x,
                                shipCoord.y,
                                'ship',
                                this.player
                            );
                        }
                    }

                } else {
                    continue;
                }
            }
        }

    }

}



export default Flot;