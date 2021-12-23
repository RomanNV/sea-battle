import Data from './data.js';
import Field from './fields.js';
import Ship from './ship.js';
import Flot from './flot.js';

//загрузка служебных файлов
let data = new Data();

class Game {
    placingShipType = ''
    plaseShipOnGrid = false

    constructor() {
        this.size = 10;
        this.playerField = localStorage.getItem('player');
        this.computerField = localStorage.getItem('computer');
        this.fieldPlayer = new Field(this.size);
        this.fieldComputer = new Field(this.size);
        this.playerFlot = new Flot();
        this.insertDivOnField();
        this.ship = new Ship();
        this.init();



    }
    //разобьем поле боя на клетки с координатами x и y
    insertDivOnField() {
        document.querySelectorAll('.grid').forEach((field) => {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    let divCell = document.createElement('div');
                    divCell.setAttribute('x', i);
                    divCell.setAttribute('y', j)
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
        Game.plaseShipDirection = parseInt(document.querySelector('.direction').getAttribute('data-direction'), 10);
        Game.plaseShipOnGrid = true;
        console.log(Game.plaseShipOnGrid);

    }
    //метод для изменения data-direction в методе 
    rotateShip(event) {
        let dataDirection = event.target.getAttribute('data-direction');
        if (dataDirection == 0) {
            event.target.setAttribute('data-direction', 1);
        } else {
            event.target.setAttribute('data-direction', 0)

        }

    }
    //метод для отрисовки кораблся при наведении на поле боя при расстановке корабля 
    positioningMouseoverHandler(event) {
        if (Game.plaseShipOnGrid) {
            const x = parseInt(event.target.getAttribute('data-x'), 10);
            const y = parseInt(event.target.getAttribute('data-y'), 10);
            const fleetList = this.playerFlot.fleetList;
        }

    }



    init() {
        let rotateButtom = document.querySelector('.direction');
        rotateButtom.addEventListener('click', this.rotateShip, false);
        document.querySelectorAll('li').forEach((ship) => {
            ship.addEventListener('click', this.shipListOnClickHandler);
        })

    }


    // getShipOnClick() {
    //     let shipList = document.querySelectorAll('li');
    //     shipList.forEach((elem) => {
    //         elem.addEventListener('click', (event) => {
    //             return new Ship(event.getAttribute('id'))
    //         })

    //     })
    // }

    // mouseClickOnShipHandler(event) {


    // }






}



let game = new Game();


export default Game;