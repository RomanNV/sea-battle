import { getRandom, getRandomFromArray } from "./utility.js";
import Game from "./game.js";
class Computer {
  constructor(game) {
    this.game = game;
    this.hasDamagedShip = false;
  }
  //если рандомно выбраны координаты компьютерем, метод проверяет координаты не заняты ли кораблем или вокруг корабля
  isSunkShipAreaCell(x, y) {
    for (let coord of Computer.sunkShipsAreaCoords) {
      if (coord.xPos === x && coord.yPos === y) {
        return true;
      }
    }
    return false;
  }
  //метод получения массива координат вокруг ячейки если мы попали в корабль или потопили
  getCellsAround(x, y) {
    let cells = [
      { yPos: y - 1, xPos: x - 1 },
      { yPos: y - 1, xPos: x },
      { yPos: y - 1, xPos: x + 1 },
      { yPos: y, xPos: x - 1 },
      { yPos: y, xPos: x + 1 },
      { yPos: y + 1, xPos: x - 1 },
      { yPos: y + 1, xPos: x },
      { yPos: y + 1, xPos: x + 1 },
    ];
    cells = cells.filter((cell) => {
      return (
        cell.xPos >= 0 && cell.xPos <= 9 && cell.yPos >= 0 && cell.yPos <= 9
      );
    });
    return cells;
  }
  // выстрел компьютера
  shoot() {
    let x = null;
    let y = null;
    let result = null;

    while (Game.gameOver === false && result !== localStorage.getItem("miss")) {
      if (this.hasDamagedShip) {
        let randomDirection = null;
        let randomValue = null;

        if (
          Computer.damagedShipCoordsX.length > 1 &&
          Computer.damagedShipCoordsX[0] !== Computer.damagedShipCoordsX[1]
        ) {
          randomDirection = "xDirection";
        } else if (
          Computer.damagedShipCoordsX.length > 1 &&
          Computer.damagedShipCoordsX[0] === Computer.damagedShipCoordsX[1]
        ) {
          randomDirection = "yDirection";
        } else if (Computer.damagedShipCoordsX.length === 1) {
          randomDirection = getRandomFromArray(["xDirection", "yDirection"]);
        }

        randomValue = getRandomFromArray([-1, 1]);

        if (randomDirection === "xDirection") {
          if (randomValue === 1) {
            let maxXpos = Math.max(...Computer.damagedShipCoordsX);
            if (maxXpos + 1 < 10) {
              x = maxXpos + 1;
              y = Computer.damagedShipCoordsY[0];
            }
          } else {
            let minXpos = Math.min(...Computer.damagedShipCoordsX);
            if (minXpos - 1 >= 0) {
              x = minXpos - 1;
              y = Computer.damagedShipCoordsY[0];
            }
          }
        } else {
          if (randomValue === 1) {
            let maxYpos = Math.max(...Computer.damagedShipCoordsY);
            if (maxYpos + 1 < 10) {
              y = maxYpos + 1;
              x = Computer.damagedShipCoordsX[0];
            }
          } else {
            let minYpos = Math.min(...Computer.damagedShipCoordsY);
            if (minYpos - 1 >= 0) {
              y = minYpos - 1;
              x = Computer.damagedShipCoordsX[0];
            }
          }
        }
      } else {
        x = getRandom(0, 9);
        y = getRandom(0, 9);
      }

      if (this.isSunkShipAreaCell(x, y)) {
        continue;
      }
      if (x === null || y === null) {
        x = getRandom(0, 9);
        y = getRandom(0, 9);
      }
      result = this.game.shoot(x, y, localStorage.getItem("player"));

      if (result === localStorage.getItem("hit")) {
        this.hasDamagedShip = true;
      } else if (result === localStorage.getItem("sunk")) {
        for (let i = 0; i < Computer.damagedShipCoordsX.length; i++) {
          let cellsToPush = this.getCellsAround(
            Computer.damagedShipCoordsX[i],
            Computer.damagedShipCoordsY[i]
          );
          Computer.sunkShipsAreaCoords.push(...cellsToPush);
        }
        Computer.sunkShipsAreaCoords.push(...this.getCellsAround(x, y));
        this.hasDamagedShip = false;
        Computer.damagedShipCoordsX = [];
        Computer.damagedShipCoordsY = [];
      }
    }
  }
}
Computer.damagedShipCoordsX = [];
Computer.damagedShipCoordsY = [];
Computer.sunkShipsAreaCoords = [];

export default Computer;
