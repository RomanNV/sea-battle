import Game from "./game.js";

class Ship {
  static verticalDirection = 0;
  static horizontalDirection = 1;
  constructor(type, playerField, player) {
    this.shipLength = +Game.dataGame[type];
    this.type = type;
    this.playerField = playerField;
    this.player = player;
    this.maxDamage = this.shipLength;
    this.sunk = false;
    this.damage = 0;
  }
  //метод проверяет разрешено ли туда ставить корабль или нет
  isNormalPosition(x, y, direction) {
    if (!this.shipInBatleField(x, y, direction)) {
      return false;
    }
    let _y = y;
    let _x = x;

    for (let i = 0; i < this.shipLength; i++) {
      if (direction === Ship.verticalDirection) {
        if (
          this.playerField.cells[_y][x] === Game.dataGame.blockedCell ||
          this.playerField.cells[_y][x] === Game.dataGame.shipCell
        ) {
          return false;
        }
      } else {
        if (
          this.playerField.cells[y][_x] === Game.dataGame.blockedCell ||
          this.playerField.cells[y][_x] === Game.dataGame.shipCell
        ) {
          return false;
        }
      }
      _y++;
      _x++;
    }
    {
      return true;
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
  //метод получения ссылок на массивы поля где стоит корабль чтобы затем использовать для модификации исходного поля
  getTheArrayOfCellAroundShip(x, y, direction) {
    let result = [];
    if (Ship.verticalDirection === direction) {
      for (let i = -1; i < this.shipLength + 1; i++) {
        result.push(this.playerField.cells[y + i]);
      }
      return result;
    }
    if (Ship.horizontalDirection === direction) {
      for (let i = -1; i < 2; i++) {
        result.push(this.playerField.cells[y + i]);
      }
      return result;
    }
  }
  //метод  апргрейда матрицы поля боя когда помещаем корабль на поля боя

  updateCellWhenShipPlace(x, y, direction) {
    let arr = this.getTheArrayOfCellAroundShip(x, y, direction).filter(
      (elem) => {
        if (!elem) {
          return false;
        } else return true;
      }
    );
    if (Ship.verticalDirection === direction) {
      arr.forEach((elem) => {
        if (elem[x + 1]) {
          elem[x + 1] = Game.dataGame.blockedCell;
        }
        if (elem[x - 1]) {
          elem[x - 1] = Game.dataGame.blockedCell;
        }
        if (elem[x] != 2) {
          elem[x] = Game.dataGame.blockedCell;
          elem[x] = Game.dataGame.blockedCell;
        }
      });
    } else {
      arr.forEach((elem) => {
        if (elem[x] != 2) {
          for (let i = 0; i < this.shipLength; i++) {
            elem[x + i] = Game.dataGame.blockedCell;
          }
        }
        if (elem[x - 1]) {
          elem[x - 1] = Game.dataGame.blockedCell;
        }
        if (elem[x + this.shipLength]) {
          elem[x + this.shipLength] = Game.dataGame.blockedCell;
        }
      });
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
          this.playerField.cells[y + i][x] = Game.dataGame.shipCell;
        } else if (this.direction === Ship.horizontalDirection) {
          this.playerField.cells[y][x + i] = Game.dataGame.shipCell;
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
          y: this.Position_y + i,
        });
      } else {
        coordsShipCellsObjectList.push({
          x: this.Position_x + i,
          y: this.Position_y,
        });
      }
    }
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
        "sunk",
        this.player
      );
    }
  }
  //апгрейд корабля по увеличению урона с одновременной проверкой потоплен ли он или нет с отрисовкой потопленного корабля
  incrementDamage() {
    this.damage++;

    if (this.isSunk()) {
      this.sinkShip();
      return Game.dataGame.sunk;
    }
    return Game.dataGame.hit;
  }
}

export default Ship;
