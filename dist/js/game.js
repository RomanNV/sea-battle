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
        // this.playerFlot = new Flot();
        this.insertDivOnField();
        // this.ship = new Ship();
        


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