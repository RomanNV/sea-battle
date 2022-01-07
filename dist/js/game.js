import Data from './data.js';
import Field from './fields.js';
import Ship from './ship.js';
import Flot from './flot.js';

//загрузка служебных файлов
let data = new Data();

class Game {


    constructor() {
        this.size = 10;
        this.playerField = localStorage.getItem('player');
        this.computerField = localStorage.getItem('computer');
        this.fieldPlayer = new Field(this.size);
        this.fieldComputer = new Field(this.size);
        this.playerFlot = new Flot(this.fieldPlayer, this.playerField);
        this.placeShipOnField = false;
        this.insertDivOnField();
        this.init();
        this.direction_1 = 0;






    }
    //разобьем поле боя на клетки с координатами x и y
    insertDivOnField() {
        document.querySelectorAll('.grid').forEach((field) => {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    let divCell = document.createElement('div');
                    divCell.setAttribute('x', j)
                    divCell.setAttribute('y', i);
                    divCell.className = 'cell';
                    field.appendChild(divCell);
                }
            }
        })
    }

    //создадим метод который работает при клике на список кораблей,
    // метод должен переключать флаг в классе на true и менять стили на элементах li
    shipListOnClickHandler(event) {
        document.querySelectorAll('.ship-list li').forEach(elem => {
            elem.classList.remove('placing');
        })
        Game.placingShipType = event.target.getAttribute('id');
        document.querySelector(`#${Game.placingShipType}`).classList.add('placing');
        this.placeShipOnField = true;


    }
    //метод для изменения data-direction в методе подключим к кнопке


    //метод для отрисовки корабля при наведении на поле боя при расстановке корабля 
    positioningMouseoverHandler(event) {
        if (this.placeShipOnField) {
            const x = parseInt(event.target.getAttribute('x'), 10);

            const y = parseInt(event.target.getAttribute('y'), 10);
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


                        if (!cell.classList.contains('placed-ship')) {
                            cell.classList.add('placed-ship');
                        }
                    }
                }
            }
        }
    }


    positioningMouseoutHandler() {
        if (this.placeShipOnField) {
            for (let coord of Game.placeShipCoords) {
                let cell = document.querySelector(
                    `[x="${coord.x}"][y="${coord.y}"]`
                );


                if (cell.classList.contains('placed-ship')) {
                    cell.classList.remove('placed-ship');
                }
            }
        }
    }

    placingHandler(event) {
        if (this.placeShipOnField) {
            const x = parseInt(event.target.getAttribute('x'), 10);
            const y = parseInt(event.target.getAttribute('y'), 10);

            const successful = this.playerFlot.placeTheShip(
                x,
                y,
                this.direction_1,
                Game.placingShipType
            );

            if (successful) {
                document.querySelector(`#${Game.placingShipType}`).classList.add('placed');
                this.direction_1 = 0;
                Game.placingShipType = '';
                Game.placeShipCoords = [];
                this.placeShipOnField = false;
            }
        }
    }
//доавил возможность изменения положения корабля при нажатии на пробел, думаю кнопку удалю со временем
    rotateShipSpaceKey(event) {
        if (this.placeShipOnField && event.code === 'Space') {
            if (this.direction_1 === 0) {
                this.direction_1 = 1;
            } else this.direction_1 = 0;
        }
    }


    init() {
        let ListOfPlayerGrid = document.querySelectorAll('.player-grid .cell');
        ListOfPlayerGrid.forEach(cell => {
            cell.addEventListener('click', this.placingHandler.bind(this));
            cell.addEventListener('mouseover', this.positioningMouseoverHandler.bind(this), false);
            cell.addEventListener('mouseout', this.positioningMouseoutHandler.bind(this));

        })

        document.querySelectorAll('li').forEach((ship) => {
            ship.addEventListener('click', this.shipListOnClickHandler.bind(this), false);
        })
        document.addEventListener('keydown', this.rotateShipSpaceKey.bind(this))


    }


    //необходимо добавить метод расстановки кораблей рандомно
// думаю вместо расстановки корабля по нажатию на название корабля просто сделать одну кнопку начать игру и затем две кнопки расставить рандомно либо кастомно
//попробовать надо реализоваь чтобы просто по очереди корабли вываливались при наведении на поле боя, 
//можно попробовать реализовать метод отмены расстановки корабля не знаю успею ли


}
Game.placingShipType = '';
Game.plaseShipDirection = null;
Game.placeShipCoords = [];




let game = new Game();


export default Game;