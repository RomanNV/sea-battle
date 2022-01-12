'use strict';
class Field {
    constructor(size) {
        this.size = size
        this.cells = []

        this.init()
        console.log(this.cells, 'sss')
    }
    init() {
        for (let i = 0; i < this.size; i++) {
            let row = [];
            this.cells[i] = row;
            for (let j = 0; j < this.size; j++) {
                row.push(localStorage.getItem('emptyCell'))
            }
        }


    }
    updateCell(x, y, type, player) {
        // // if (type === 'ship') {
        // //     this.cells[y][x] = localStorage.getItem('shipCell');
        // // }
        // document.querySelector(`[x="${x}"][y="${y}"]`).classList.add(`field-${type}`);
        // document.querySelector(`[x="${x}"][y="${y}"]`).classList.remove('placed-ship');
        
        let target;
        if (player == localStorage.getItem('player')) {
            target = 'player-grid';

        } else { 
            target = 'computer-grid';
        }
        document.querySelector(`.${target} [x="${x}"][y="${y}"]`).classList.add(`field-${type}`);
        document.querySelector(`.${target} [x="${x}"][y="${y}"]`).classList.remove('placed-ship');
        console.log(this.cells)
    }

}


export default Field;