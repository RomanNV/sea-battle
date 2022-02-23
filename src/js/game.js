import Field from "./fields.js";
import Flot from "./flot.js";
import Computer from "./computer.js";

//загрузка служебных файлов

class Game {
  static player = "0";
  static computer = "1";
  static placeShipOnField = false;
  static readyToPlay = false;
  static direction_1 = 0;
  static availableShip = [
    "linkor",
    "fregat_1",
    "fregat_2",
    "galera_1",
    "galera_2",
    "galera_3",
    "kater_1",
    "kater_2",
    "kater_3",
    "kater_4",
  ];
  static gameOver = false;
  static placingShipType = "";
  static plaseShipDirection = null;
  static placeShipCoords = [];
  static dataGame = {
    blockedCell: "-1",
    emptyCell: "0",
    miss: "1",
    shipCell: "2",
    hit: "3",
    sunk: "4",
    linkor: "4",
    fregat_1: "3",
    fregat_2: "3",
    galera_1: "2",
    galera_2: "2",
    galera_3: "2",
    kater_1: "1",
    kater_2: "1",
    kater_3: "1",
    kater_4: "1",
  };

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
    this.player = Game.player;
    this.computer = Game.computer;
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
    Game.placeShipOnField = true;
  }

  //метод для отрисовки корабля при наведении на поле боя при расстановке корабля
  positioningMouseoverHandler(event) {
    if (Game.placeShipOnField) {
      const x = parseInt(event.target.getAttribute("x"), 10);
      const y = parseInt(event.target.getAttribute("y"), 10);
      const fleetList = this.playerFlot.shipList;

      for (let ship of fleetList) {
        if (
          Game.placingShipType === ship.type &&
          ship.isNormalPosition(x, y, Game.direction_1)
        ) {
          ship.createShip(x, y, Game.direction_1, true);
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
    if (Game.placeShipOnField) {
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
    if (Game.placeShipOnField) {
      const x = parseInt(event.target.getAttribute("x"), 10);
      const y = parseInt(event.target.getAttribute("y"), 10);

      const successful = this.playerFlot.placeTheShip(
        x,
        y,
        Game.direction_1,
        Game.placingShipType
      );

      if (successful) {
        document
          .getElementById(`${Game.placingShipType}`)
          .classList.add("placed");
        Game.direction_1 = 0;
        Game.placingShipType = "";
        Game.placeShipCoords = [];
        Game.placeShipOnField = false;
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
    if (Game.placeShipOnField && event.code === "Space") {
      if (Game.direction_1 === 0) {
        Game.direction_1 = 1;
      } else Game.direction_1 = 0;
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
    Game.readyToPlay = true;
    document.querySelector(".wrapper-list-ships").classList.add("hidden");
  }
  //обработчик на выстрел в зависимости от результата и если игра не окончена, то стреляю я или ход передается компьютеру
  shootHandler(event) {
    if (!Game.readyToPlay) return;

    const x = parseInt(event.target.getAttribute("x"), 10);
    const y = parseInt(event.target.getAttribute("y"), 10);

    const result = this.shoot(x, y, Game.computer);

    if (!Game.gameOver && result === Game.dataGame.miss) {
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
      Game.readyToPlay = false;
    }
  }

  //выстрел
  shoot(x, y, targetPlayer) {
    let targetGrid = null;
    let targetFleet = null;
    let result = null;

    if (targetPlayer === Game.player) {
      targetGrid = this.fieldPlayer;
      targetFleet = this.playerFlot;
    } else if (targetPlayer === Game.computer) {
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
      if (targetPlayer === Game.player && result === Game.dataGame.hit) {
        Computer.damagedShipCoordsX.push(x);
        Computer.damagedShipCoordsY.push(y);
      }

      return result;
    } else {
      targetGrid.updateCell(x, y, "miss", targetPlayer);
      result = Game.dataGame.miss;
      return result;
    }
  }
}

export default Game;
