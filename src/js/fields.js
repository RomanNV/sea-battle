class Field {
  constructor(size) {
    this.size = size;
    this.cells = [];
    this.init();
  }
  init() {
    for (let i = 0; i < this.size; i++) {
      let row = [];
      this.cells[i] = row;
      for (let j = 0; j < this.size; j++) {
        row.push(localStorage.getItem("emptyCell"));
      }
    }
  }
  //модификация поля при клике на клетку в зависимости от результата
  updateCell(x, y, type, player) {
    let target;
    if (player == localStorage.getItem("player")) {
      target = "player-grid";
    } else {
      target = "computer-grid";
    }

    this.cells[y][x] = localStorage.getItem(`${type}`);
    document
      .querySelector(`.${target} [x="${x}"][y="${y}"]`)
      .classList.add(`field-${type}`);
  }
  //модификация поля если мы промахнулись
  isMiss(x, y) {
    return this.cells[y][x] === localStorage.getItem("miss");
  }
  //модификация если мы попали по кораблю но он не потоплен
  isUndamagedShip(x, y) {
    return this.cells[y][x] === localStorage.getItem("shipCell");
  }
  //проверка если мы кликаем на уже подбитый корабль или на клетку где произошло попадание
  isDamagedShip(x, y) {
    return (
      this.cells[y][x] === localStorage.getItem("hit") ||
      this.cells[y][x] === localStorage.getItem("sunk")
    );
  }
}

export default Field;
