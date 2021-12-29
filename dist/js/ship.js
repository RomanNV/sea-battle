import Field from './fields.js';


class Ship {

    constructor(type, playerField, player) {
        this.shipLength = +localStorage.getItem(`${type}`);
        this.shipList = JSON.parse(localStorage.getItem('numberOfAvailableShips'));
        this.type = type;
        this.playerField = playerField;
        this.player = player;
        this.maxDamage = this.shipLength;
        this.sunk = false;


    }
//зачастую не правильно работает нужна отладка
    isNormalPosition(x, y, direction) {
        if (!this.shipInBatleField(x, y, direction)) {
            return false
        }
        let _y = y;
        let _x = x;
        let flagSetVertical = new Set();
        let flagSetHorizontal = new Set();

        for (let i = 0; i < this.shipLength; i++) {

            if (direction === Ship.verticalDirection) {
                if (this.playerField.cells[x][_y] === localStorage.getItem('blockedCell') ||
                    this.playerField.cells[x][_y] === localStorage.getItem('shipCell')) {
                    flagSetVertical.add(false);
                }

            } else {
                if (this.playerField.cells[_x][y] === localStorage.getItem('blockedCell') ||
                    this.playerField.cells[_x][y] === localStorage.getItem('shipCell')) {
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

    // метод определения правильного положения корабля не выходит ли он за рамки боевого поля
    shipInBatleField(x, y, direction) {
        if (direction === Ship.horizontalDirection) {
            return x + this.shipLength <= 10;
        } else {
            return y + this.shipLength <= 10;
        }
    }

    //метод  апргрейда матрицы поля боя когда помещаем корабль на поля боя

    updateCellWhenShipPlace(x, y, direction) {
        if (direction === Ship.verticalDirection && x <= 10 && x >= 0) {
            for (let i = 0; i < this.shipLength; i++) {
                this.playerField.cells[y ][x] = localStorage.getItem('blockedCell');
                this.playerField.cells[y ][x] = localStorage.getItem('blockedCell');
            }
        } else if (direction === Ship.horizontalDirection && this.isNormalPosition(x, y, direction) && y <= 10 && y >= 0) {
            for (let i = 0; i < this.shipLength; i++) {
                this.playerField.cells[x][y + 1] = localStorage.getItem('blockedCell');
                this.playerField.cells[x][y - 1] = localStorage.getItem('blockedCell');
            }
        }
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
                    this.playerField.cells[y + i][x] = localStorage.getItem('shipCell');
                    console.log(y + i)
                    console.log(x)
                    console.log(this.shipLength)
                } else
                if (this.direction === Ship.horizontalDirection) {
                    this.playerField.cells[y][x + i] = localStorage.getItem('shipCell');
                }

            }
        }

    }

    //создадим метод который перехватывает координаты корабля когда мы его создаем и записывает в массив объектов
    coordsShipCells() {
        let coordsShipCellsObjectList = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (this.direction === Ship.verticalDirection) {
                coordsShipCellsObjectList.push({
                    x: this.Position_x,
                    y: this.Position_y + i
                })

            } else {
                coordsShipCellsObjectList.push({
                    x: this.Position_x + i,
                    y: this.Position_y
                })

            }


        }
        console.log(coordsShipCellsObjectList)
        return coordsShipCellsObjectList;
    }







}
Ship.verticalDirection = 0;
Ship.horizontalDirection = 1;
export default Ship;