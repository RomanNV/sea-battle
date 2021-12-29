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
                shipCoords = ship.coordsShipCells();
                for (let shipCoord of shipCoords) {
                    this.playerField.updateCell(
                        shipCoord.x,
                        shipCoord.y,
                        'ship',
                        this.player
                    );

                }
//тут надо продумать как расставлять флаги если у нас нет x+i or something like this!
                for (let i = -1; i < ship.shipLength + 1; i++) {
                    if ((direction == Ship.verticalDirection && x <= 10 && x >= 0) &&
                        ((this.playerField.cells[y + i][x + 1]) ||
                            (this.playerField.cells[y + i][x - 1]))) {


                        this.playerField.cells[y + i][x + 1] = localStorage.getItem('blockedCell');
                        this.playerField.cells[y + i][x - 1] = localStorage.getItem('blockedCell');
                    }

                }
                if (this.playerField.cells[ship.shipLength + y][x]) {
                    this.playerField.cells[ship.shipLength + y][x] = localStorage.getItem('blockedCell');
                }
                if (this.playerField.cells[y - 1][x]) {
                    this.playerField.cells[y - 1][x] = localStorage.getItem('blockedCell');
                }
                return true;
            }
        }
        return false;
    }

}



export default Flot;