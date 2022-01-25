import Data from "./data.js";
import Field from "./fields.js";
import Flot from "./flot.js";
import Computer from "./computer.js";

//загрузка служебных файлов
let data = new Data();

class Game {
  constructor() {
    this.placingHandler = this.placingHandler.bind(this);
    this.shipListOnClickHandler = this.shipListOnClickHandler.bind(this);
    this.positioningMouseoutHandler =
      this.positioningMouseoutHandler.bind(this);
    this.shootHandler = this.shootHandler.bind(this);
    this.positioningMouseoverHandler =
      this.positioningMouseoverHandler.bind(this);
    this.rotateShipSpaceKey = this.rotateShipSpaceKey.bind(this);
    this.randomPlaceShips = this.randomPlaceShips.bind(this);
    this.startGameHandler = this.startGameHandler.bind(this);
    this.init();
  }

  init() {
    this.size = 10;
    this.player = localStorage.getItem("player");
    this.computer = localStorage.getItem("computer");
    this.fieldPlayer = new Field(this.size);
    this.fieldComputer = new Field(this.size);
    this.playerFlot = new Flot(this.fieldPlayer, this.player);
    this.computerFlot = new Flot(this.fieldComputer, this.computer);
    this.placeShipOnField = false;
    this.readyToPlay = false;
    this.insertDivOnField();
    this.direction_1 = 0;
    this.robot = new Computer(this);
    this.computerFlot.placeShipsRandom();
    this.setupEventListeneres();
  }

  setupEventListeneres() {
    const shipList = document.querySelector(".ship-list");
    const playerofField = document.querySelector(".player-grid");
    const computerofField = document.querySelector(".computer-grid");

    playerofField.addEventListener("click", (e) => {
      if (e.target.classList.contains("cell")) {
        this.placingHandler(e);
      }
    });
    playerofField.addEventListener("mouseover", (e) => {
      if (e.target.classList.contains("cell")) {
        this.positioningMouseoverHandler(e);
      }
    });
    playerofField.addEventListener("mouseout", (e) => {
      if (e.target.classList.contains("cell")) {
        this.positioningMouseoutHandler(e);
      }
    });

    computerofField.addEventListener("click", (e) => {
      if (e.target.classList.contains("cell")) {
        this.shootHandler(e);
      }
    });

    shipList.addEventListener("click", (e) => {
      if (Game.availableShip.includes(e.target.id)) {
        this.shipListOnClickHandler(e);
      }
    });
    document.getElementById("randomBtn");
    randomBtn.addEventListener("click", this.randomPlaceShips);

    document
      .querySelector("#start-game")
      .addEventListener("click", this.startGameHandler);

    document.addEventListener("keydown", this.rotateShipSpaceKey);
  }

  //разобьем поле боя на клетки с координатами x и y
  insertDivOnField() {
    document.querySelectorAll(".grid").forEach((field) => {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          let divCell = document.createElement("div");
          divCell.setAttribute("x", j);
          divCell.setAttribute("y", i);
          divCell.className = "cell";
          field.appendChild(divCell);
        }
      }
    });
  }

  //создадим метод который работает при клике на список кораблей,
  // метод должен переключать флаг в классе на true и менять стили на элементах li
  shipListOnClickHandler(event) {
    document.getElementById("randomBtn").classList.add("hidden");
    document.getElementById("message").classList.remove("hidden");
    document.getElementById("message").classList.add("visible");
    document.querySelectorAll("li").forEach((elem) => {
      elem.classList.remove("placing");
    });
    Game.placingShipType = event.target.getAttribute("id");
    document.querySelector(`#${Game.placingShipType}`).classList.add("placing");
    this.placeShipOnField = true;
  }

  //метод для отрисовки корабля при наведении на поле боя при расстановке корабля
  positioningMouseoverHandler(event) {
    if (this.placeShipOnField) {
      const x = parseInt(event.target.getAttribute("x"), 10);
      const y = parseInt(event.target.getAttribute("y"), 10);
      const fleetList = this.playerFlot.shipList;

      for (let ship of fleetList) {
        if (
          Game.placingShipType === ship.type &&
          ship.isNormalPosition(x, y, this.direction_1)
        ) {
          ship.createShip(x, y, this.direction_1, true);
          Game.placeShipCoords = ship.coordsShipCells();

          for (let coord of Game.placeShipCoords) {
            let cell = document.querySelector(
              `[x="${coord.x}"][y="${coord.y}"]`
            );

            if (!cell.classList.contains("placed-ship")) {
              cell.classList.add("placed-ship");
            }
          }
        }
      }
    }
  }

  positioningMouseoutHandler() {
    if (this.placeShipOnField) {
      for (let coord of Game.placeShipCoords) {
        let cell = document.querySelector(`[x="${coord.x}"][y="${coord.y}"]`);

        if (cell.classList.contains("placed-ship")) {
          cell.classList.remove("placed-ship");
        }
      }
    }
  }

  // обработчик для расстановки кораблей при клике, если удачно то обнавляем служебные данные
  // также проверяем все ли расставлены корабли и если да, то показываем кнопку старт
  placingHandler(event) {
    if (this.placeShipOnField) {
      const x = parseInt(event.target.getAttribute("x"), 10);
      const y = parseInt(event.target.getAttribute("y"), 10);

      const successful = this.playerFlot.placeTheShip(
        x,
        y,
        this.direction_1,
        Game.placingShipType
      );

      if (successful) {
        document
          .getElementById(`${Game.placingShipType}`)
          .classList.add("placed");
        this.direction_1 = 0;
        Game.placingShipType = "";
        Game.placeShipCoords = [];
        this.placeShipOnField = false;
        if (this.areAllShipsPlaced()) {
          document.getElementById("start-game").classList.remove("hidden");
          document.getElementById("message").classList.add("hidden");
        }
      }
    }
  }

  //Проверка все ли корабли поместили

  areAllShipsPlaced() {
    const fleetList = document.querySelectorAll("li");
    for (let ship of fleetList) {
      if (ship.classList.contains("placed")) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }

  //добавил возможность изменения положения корабля при нажатии на пробел
  rotateShipSpaceKey(event) {
    if (this.placeShipOnField && event.code === "Space") {
      if (this.direction_1 === 0) {
        this.direction_1 = 1;
      } else this.direction_1 = 0;
    }
  }

  //метод случайной расстановки кораблей
  randomPlaceShips() {
    this.playerFlot.placeShipsRandom(this.player);
    document.getElementById("randomBtn").classList.add("hidden");
    document.getElementById("start-game").classList.remove("hidden");
    document.querySelector(".ship-list").classList.add("hidden");
  }
  //обработчик на кнопку старт
  startGameHandler(event) {
    this.readyToPlay = true;
    document.querySelector(".wrapper-list-ships").classList.add("hidden");
  }
  //обработчик на выстрел в зависимости от результата и если игра не окончена, то стреляю я или ход передается компьютеру
  shootHandler(event) {
    if (!this.readyToPlay) return;

    const x = parseInt(event.target.getAttribute("x"), 10);
    const y = parseInt(event.target.getAttribute("y"), 10);

    const result = this.shoot(x, y, localStorage.getItem("computer"));

    if (!Game.gameOver && result === localStorage.getItem("miss")) {
      this.robot.shoot();
    }
  }
  // проверка конец ли игры? также переключаем флаги чтобы нельзя было взаимодействовать с полем после завершения игры
  checkForGameOver() {
    if (this.computerFlot.areAllShipsSunk()) {
      alert("Поздравляю, вы победили!");
      Game.gameOver = true;
      this.readyToPlay = false;
    } else if (this.playerFlot.areAllShipsSunk()) {
      alert("К сожалению, вы проиграли. Компьютер потопил все ваши корабли");
      Game.gameOver = true;
      this.readyToPlay = false;
    }
  }

  //выстрел
  shoot(x, y, targetPlayer) {
    let targetGrid = null;
    let targetFleet = null;
    let result = null;

    if (targetPlayer === localStorage.getItem("player")) {
      targetGrid = this.fieldPlayer;
      targetFleet = this.playerFlot;
    } else if (targetPlayer === localStorage.getItem("computer")) {
      targetGrid = this.fieldComputer;
      targetFleet = this.computerFlot;
    }
    //если кликаем по уже существующей ячейке возвращаем null и ход не переходит
    if (targetGrid.isDamagedShip(x, y) || targetGrid.isMiss(x, y)) {
      return result;
    } else if (targetGrid.isUndamagedShip(x, y)) {
      targetGrid.updateCell(x, y, "hit", targetPlayer);
      result = targetFleet.findShipByCoords(x, y).incrementDamage();
      this.checkForGameOver();
      //добавляем координаты х и у при попадании компьютера по кораблю игрока, для логики добивания
      if (
        targetPlayer === localStorage.getItem("player") &&
        result === localStorage.getItem("hit")
      ) {
        Computer.damagedShipCoordsX.push(x);
        Computer.damagedShipCoordsY.push(y);
      }

      return result;
    } else {
      targetGrid.updateCell(x, y, "miss", targetPlayer);
      result = localStorage.getItem("miss");
      return result;
    }
  }
}
Game.availableShip = JSON.parse(localStorage.getItem("numberOfAvailableShips"));
Game.gameOver = false;
Game.placingShipType = "";
Game.plaseShipDirection = null;
Game.placeShipCoords = [];
let game = new Game();
export default Game;
