import Field from './fields.js';


class Ship {
    verticalDirection = 0;
    horizontalDirection = 1;
    constructor(type, playerGrid, player) {
        this.shipLength = +localStorage.getItem(`${type}`);
        this.shipList = JSON.parse(localStorage.getItem('numberOfAvailableShips'));
        this.type = type;
        this.playerGrid = playerGrid;
        this.player = player;
        this.maxDamage = this.shipLength;
        this.sunk = false;
    }





    isNormalPosition(x, y, direction) {
        if (!this.shipInBatleField) {
            return false
        }
        let _y = y;
        let _x = x;
        let flagSetVertical = new Set();
        let flagSetHorizontal = new Set();

        for (let i = 0; i < this.shipLength; i++) {

            if (direction === Ship.verticalDirection) {
                if (this.playerGrid.cells[x][_y] === localStorage.getItem('blockedCell') ||
                    this.playerGrid.cells[x][_y] === localStorage.getItem('shipCell')) {
                    flagSetVertical.add(false);
                }

            } else {
                if (this.playerGrid.cells[_x][y] === localStorage.getItem('blockedCell') ||
                    this.playerGrid.cells[_x][y] === localStorage.getItem('shipCell')) {
                    flagSetHorizontal.add(false);
                }

            }
            _y++;
            _x++;
        }
        if (flagSetHorizontal.has('false') || flagSetVertical.has('false')) {
            return false
        } else {
            return true
        }
    }

    updateCellWhenShipPlace(x, y, direction) {
        if (direction === Ship.verticalDirection && this.isNormalPosition(x, y, direction) && x <= 10 && x >= 0) {
            for (let i = 0; i < this.shipLength; i++) {
                this.playerGrid.cells[x + 1][y] = localStorage.getItem('blockedCell');
                this.playerGrid.cells[x - 1][y] = localStorage.getItem('blockedCell');
            }
        } else if (direction === Ship.horizontalDirection && this.isNormalPosition(x, y, direction) && y <= 10 && y >= 0) {
            for (let i = 0; i < this.shipLength; i++) {
                this.playerGrid.cells[x][y + 1] = localStorage.getItem('blockedCell');
                this.playerGrid.cells[x][y - 1] = localStorage.getItem('blockedCell');
            }
        }
    }



    // метод определения правильного положения корабля не выходит ли он за рамки боевого поля
    shipInBatleField(x, y, direction) {
        if (direction === Ship.horizontalDirection) {
            return x + this.shipLength <= 10;
        }
        return y + this.shipLength <= 10;
    }
    //метод создания корабля, принимает 4 параметра координаты x и y, положение корабля и флаг, 
    //который контролирует создавать ли корабль или нет, или просто захватить переданные корднаты для другого метода
    createShip(x, y, direction, flag) {
        this.Position_x = x;
        this.Position_y = y;
        this.direction = direction;
        if (!flag) {
            for (let i = 0; i < this.shipLength; i++) {
                if (this.direction === Ship.verticalDirection) {
                    this.playerGrid.cells[x][y + i] = localStorage.getItem('shipCell');
                } else {
                    this.playerGrid.cells[x + i][y] = localStorage.getItem('shipCell');
                }
            }
        }
    }






}
export default Ship;