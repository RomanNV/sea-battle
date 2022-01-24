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
        row.push(localStorage.getItem("emptyCell"));
      }
    }
  }
  updateCell(x, y, type, player) {
    let target;
    if (player == localStorage.getItem("player")) {
      target = "player-grid";
    } else {
      target = "computer-grid";
    }

    if (type !== "ship") {
      this.cells[y][x] = localStorage.getItem(`${type}`);
      document
        .querySelector(`.${target} [x="${x}"][y="${y}"]`)
        .classList.add(`field-${type}`);
    }

    document
      .querySelector(`.${target} [y="${y}"][x="${x}"]`)
      .classList.add(`field-${type}`);
  }
  isMiss(x, y) {
    return this.cells[y][x] === localStorage.getItem("miss");
  }

  isUndamagedShip(x, y) {
    return this.cells[y][x] === localStorage.getItem("shipCell");
  }

  isDamagedShip(x, y) {
    let result;
    try {
      result =
        this.cells[y][x] === localStorage.getItem("hit") ||
        this.cells[y][x] === localStorage.getItem("sunk");
    } catch (error) {
      console.warn({ x, y });
      console.warn(this.cells[y][x]);
    }
    return result;
  }
}

export default Field;
