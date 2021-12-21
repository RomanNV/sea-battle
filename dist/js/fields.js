'use strict';
class Field {
    constructor(size) {
        this.size = size
        this.cells = []
        console.log(this.cells)
        this.init()


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

}

export default Field;