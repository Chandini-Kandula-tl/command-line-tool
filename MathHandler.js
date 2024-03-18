class Constants {
    static ADD = "add";
    static SUBTRACT = "sub";
    static MULTIPLY = "mul";
    static DIVIDE = "div";
    static HELP = "--help";
}

const baseClass = require('./baseClass.js')
class MathHandler extends baseClass {
    constructor() {
        super();
        this.addkey = ["--add", "-a"];
        this.subkey = ["--sub", "-s"];
        this.mulkey = ["--mul", "-m"];
        this.divkey = ["--div", "-d"];
        this.helpkey = ["--help", "-h"];
    }

    handleInput(command) {
        let operation = command[1];
        let params = [...command.slice(2,)];
        if(this.helpkey.includes(command[command.length - 1]))
        {
            if(command.length === 2 || command.length === 3)
            {
                this.help(command);
            }
        }
        else
        {
        for(let element = 0; element < params.length; element++)
        {
            if(params[Number(element)] >= 0 || params[Number(element)] < 0)
            {
                continue;
            }
            else
            {
                console.log("make sure to enter numbers only");
                break;
            }
        }
        if (this.addkey.includes(operation)) {
            this.add(...params);
        }
        else if (this.subkey.includes(operation)) {
            this.subtract(...params);
        }
        else if (this.mulkey.includes(operation)) {
            this.multiply(...params);
        }
        else if (this.divkey.includes(operation)) {
            this.divide(...params);
        }
        else
        {
            console.log("invalid command");
        }
    }
    }
    add(...params) {
        let sum = 0;
        for (let element of params) {
            sum += Number(element);
        }
        console.log(sum);
    }
    subtract(...params) {
        let sub = params[0];
        for(let element = 1; element < params.length; element++)
        {
            sub -= params[Number(element)];
        }
        console.log(sub);
    }
    multiply(...params) {
        let mul = 1;
        for (let element of params) {
            mul = mul * Number(element);
        }
        console.log(mul);
    }
    divide(...params) {
        let div = params[0];
        for(let element = 1; element < params.length; element++)
        {
            div = div / params[element];
        }
        console.log(div);
    }
    help(command) {
        console.log({command})
        let helpObject = {
            [Constants.ADD]: "add key enables to add list of elements and return their sum",
            [Constants.SUBTRACT]: "sub key enables to subtract list of elements and return the result",
            [Constants.MULTIPLY]: "mul key enables to multiply the list of elements and return the result",
            [Constants.DIVIDE]: "div key enables to division of two numbers and return the reuslt"
        };
        if(command?.length===1){
            return helpObject
        }
        if (command?.length === 2 ) {
            console.log(helpObject)
         
        }
        else if (helpObject[command[1]]) {
            console.log(helpObject[command[1]]);
        }
        else {
            console.log("invalid command");
        }
    }
}

module.exports = MathHandler;