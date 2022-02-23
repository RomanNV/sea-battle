import Game from "./game.js";
class Field {
  constructor(size) {
    this.size = size;
    this.cells = [];
    this.init();
    console.log(this.cells);
  }
  init() {
    for (let i = 0; i < this.size; i++) {
      let row = [];
      this.cells[i] = row;
      for (let j = 0; j < this.size; j++) {
        row.push("0");
      }
    }
  }
  //модификация поля при клике на клетку в зависимости от результата
  updateCell(x, y, type, player) {
    let target;
    if (player == Game.player) {
      target = "player-grid";
    } else {
      target = "computer-grid";
    }

    this.cells[y][x] = Game.dataGame[type];
    document
      .querySelector(`.${target} [x="${x}"][y="${y}"]`)
      .classList.add(`field-${type}`);
  }
  //модификация поля если мы промахнулись
  isMiss(x, y) {
    return this.cells[y][x] === Game.dataGame.miss;
  }
  //модификация если мы попали по кораблю но он не потоплен
  isUndamagedShip(x, y) {
    return this.cells[y][x] === Game.dataGame.shipCell;
  }
  //проверка если мы кликаем на уже подбитый корабль или на клетку где произошло попадание
  isDamagedShip(x, y) {
    return (
      this.cells[y][x] === Game.dataGame.hit ||
      this.cells[y][x] === Game.dataGame.sunk
    );
  }
}

export default Field;
