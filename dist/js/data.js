class Data {
    dataGame = {
        blockedCell:-1,
        emptyCell: 0,
        missCell: 1,
        shipCell: 2,
        hitCell: 3,
        sunkCell: 4,
        player: 0,
        computer: 1,
        linkor: 4,
        fregat_1: 3,
        fregat_2: 3,
        galera_1: 2,
        galera_2: 2,
        galera_3: 2,
        kater_1: 1,
        kater_2: 1,
        kater_3: 1,
        kater_4: 1,
    }
    constructor() {
        this.setInLocalStorage();
        this.addShipList()
    }
// записываем в localStorage массив кораблей
    addShipList() { 
        let shipList = document.querySelectorAll('li');
        shipList = [].slice.call(shipList).map(elem => {
            return elem.getAttribute('id');
        });
        localStorage.setItem('numberOfAvailableShips', JSON.stringify(shipList));

    }
    setInLocalStorage() {
        for (let prop in this.dataGame) {
            localStorage.setItem(`${prop}`, `${this.dataGame[prop]}`) //записываем все значения в localStorage
        }
    }
}

export default Data;