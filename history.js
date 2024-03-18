const ALL = "--all"
class History {
    constructor() {
        this.history = [];
    }

    storeHistory(command) {
        this.history.push(command)
    }

    handleInput(command) {
        let historyLength = this.history.length;
        if (command[1] > historyLength) {
            this.history.forEach(element => console.log(element));
            console.log("total command count in history are : " + this.history.length);
        }
        else if (command[1] <= historyLength) {
            let count = command[1];
            let index = historyLength - count;
            this.history.slice(index,).forEach(element => console.log(element));
        }
        else if (command[1] === ALL) {
            this.history.forEach(element => console.log(element));

        }
        else {
            let count = 5;
            let index = historyLength - count;
            if (index < 0) {
                index = index * -1;
            }
            this.history.slice(index,).forEach(element => console.log(element));
            console.log("history command will show last 5 commands by default \n It prints the given number of latest commands from the history  observe the format : <history> <count>");
        }
    }
}
module.exports = History;