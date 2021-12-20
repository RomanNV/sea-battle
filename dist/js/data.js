class Data {
    dataGame = {
        emptyCell: 0,
        missCell: 1,
        shipCell: 2,
        hitCell: 3,
        sunkCell: 4,
        player: 0,
        computer: 1,
    }
    constructor(){
        
    }
    setInLocalStorage() {
        for (let prop in this.dataGame) {
            localStorage.setItem(`${prop}`, `${this.dataGame[prop]}`) //записываем все значения в localStorage
        }
    }
}

export default Data;