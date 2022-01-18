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
  //метод проверяет разрешено ли туда ставить корабль или нет
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
    //метод получения ссылок на массивы поля где стоит корабль
    getTheArrayOfCellAroundShip(x, y, direction) {
        let arrVertical = [];
        if (Ship.verticalDirection === direction) {
            for (let i = -1; i < this.shipLength + 1; i++) {
                arrVertical.push(this.playerField.cells[y + i])
            }
            return arrVertical
        }
        if (Ship.horizontalDirection === direction) {
            for (let i = -1; i < 2; i++) {
                arrVertical.push(this.playerField.cells[y + i])
            }
            return arrVertical
        }


    }
    //метод  апргрейда матрицы поля боя когда помещаем корабль на поля боя

    updateCellWhenShipPlace(x, y, direction) {
        let arr = (this.getTheArrayOfCellAroundShip(x, y, direction)).filter(elem => {
            if (!elem) {
                return false;
            } else
                return true;
        });
        if (Ship.verticalDirection === direction) {
            arr.forEach((elem) => {
                if (elem[x + 1]) {
                    elem[x + 1] = localStorage.getItem('blockedCell');
                }
                if (elem[x - 1]) {
                    elem[x - 1] = localStorage.getItem('blockedCell');
                }
                if (elem[x] != 2) {
                    elem[x] = localStorage.getItem('blockedCell');
                    elem[x] = localStorage.getItem('blockedCell');
                }
            })
        }
        else {arr.forEach((elem)=>{
            if(elem[x]!=2){
                for(let i = 0; i<this.shipLength; i++){
                    elem[x+i]= localStorage.getItem('blockedCell');
                }
            }
            if(elem[x-1]){
                elem[x-1]=localStorage.getItem('blockedCell');
            }
            if(elem[x+this.shipLength]){
                elem[x+this.shipLength]=localStorage.getItem('blockedCell');
            }
            
        })

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

// Метод проверки потоплен корабль или нет

isSunk() {
    return this.damage >= this.maxDamage;
  }
// Метод для отрисовки потопленного корабля

sinkShip() {
    this.damage = this.maxDamage;
    this.sunk = true;

let allCells = this.coordsShipCells();

for (let i = 0; i < this.shipLength; i++) {
      this.playerField.updateCell(
        allCells[i].x,
        allCells[i].y,
        'sunk',
        this.player
      );
    }
  }

incrementDamage() {
    this.damage++;

if (this.isSunk()) {
      this.sinkShip();
      return localStorage.getItem('sunkCell');
    }
return localStorage.getItem('hitCell');
  }
}

}
Ship.verticalDirection = 0;
Ship.horizontalDirection = 1;
export default Ship;
