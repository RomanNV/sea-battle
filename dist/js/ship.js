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

        for (let i = 0; i < this.shipLength; i++) {

            if (direction === Ship.verticalDirection) {
                if (this.playerField.cells[_y][x] === localStorage.getItem('blockedCell') ||
                    this.playerField.cells[_y][x] === localStorage.getItem('shipCell')) {
                    return false
                }

            } else {
                if (this.playerField.cells[y][_x] === localStorage.getItem('blockedCell') ||
                    this.playerField.cells[y][_x] === localStorage.getItem('shipCell')) {
                    return false
                }
            }
            _y++;
            _x++;

        } {
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
        if (Ship.verticalDirection === direction) {
            for (let i = 0; i <= this.shipLength; i++) {
                if (!!this.shipInBatleField(x, y, direction)) {
                    this.playerField.cells[y + i][x + 1] = localStorage.getItem('blockedCell');
                    this.playerField.cells[y + i][x - 1] = localStorage.getItem('blockedCell');
                }
            }
            if (this.playerField.cells[this.shipLength + y][x]) {
                this.playerField.cells[this.shipLength + y][x] = localStorage.getItem('blockedCell');
            }
            if (this.playerField.cells[y - 1][x]) {
                this.playerField.cells[y - 1][x] = localStorage.getItem('blockedCell');
            }
        } else
        if (Ship.horizontalDirection === direction) {
            for (let i = 0; i <= this.shipLength; i++) {
                if (!!this.shipInBatleField(x, y, direction)) {
                    this.playerField.cells[y + 1][x + i] = localStorage.getItem('blockedCell');
                    this.playerField.cells[y - 1][x + i] = localStorage.getItem('blockedCell');
                }
            }
            if (this.playerField.cells[y - 1][x - 1]) {

            }
            if (this.playerField.cells[y][x + this.shipLength]) {
                this.playerField.cells[y][x + this.shipLength] = localStorage.getItem('blockedCell');
            }
            if (this.playerField.cells[y][x - 1]) {
                this.playerField.cells[y][x - 1] = localStorage.getItem('blockedCell');
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