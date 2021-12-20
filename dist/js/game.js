import Data from './data.js';
import Field from './fields.js'

//загрузка служебных файлов
let data = new Data();
data.setInLocalStorage();
class Game {
    constructor() {
        this.size = 10;
        this.fieldPlayer = new Field(this.size);
        this.fieldComputer = new Field(this.size);
    }
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

}


let game = new Game();
game.insertDivOnField()