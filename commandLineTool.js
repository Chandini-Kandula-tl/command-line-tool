const MODULES = { MathHandler: require('./MathHandler.js') }
const { HELP_MSGS } = require('./constants.js')
const History = require('./history.js')
const { Logs, Log } = require('./logfile.js')
//class of logfile


class Constants {
    static REGISTER = "register";
    static UNREGISTER = "unregister";
    static ACTIVE = "active";
    static DEACTIVE = "deactive";
    static HISTORY = "history";
    static LOG = "log";
    static HELP = "--help";
    static EXIT = "exit";
    static START = "--start";
    static STOP = "--stop"
}

const DEFAULT_CMD_CONDITIONS = {
    [Constants.LOG]: { length: 3, formate: "<log> <command_name> <count>", isLengthNotConst: true },
    [Constants.REGISTER]: { length: 3, formate: "<register> <command_name> <executor>", isLengthNotConst: false },
    [Constants.UNREGISTER]: { length: 2, formate: "<unregister> <command_name>", isLengthNotConst: false },
    [Constants.ACTIVE]: { length: 2, formate: "<active> <command_name>", isLengthNotConst: false },
    [Constants.DEACTIVE]: { length: 2, formate: "<deactive> <command_name>", isLengthNotConst: false },
    [Constants.HISTORY]: { length: 3, formate: "<history> <count>", isLengthNotConst: true },
    [Constants.HELP]: { length: 3, formate: "<command_name> <--help>", isLengthNotConst: true }
}


class CommandTool {
    constructor() {
        this.registeredCommands = {};
        this.validCommands = [Constants.REGISTER, Constants.UNREGISTER, Constants.ACTIVE, Constants.DEACTIVE, Constants.HISTORY, Constants.LOG, Constants.HELP];
        this.history = new History()
        this.logs = new Logs()
        // this.logSerialNumber = 0;
        this.commandStore = {
            [Constants.LOG]: this.logHandler.bind(this),
            [Constants.REGISTER]: this.register.bind(this),
            [Constants.UNREGISTER]: this.unregister.bind(this),
            [Constants.ACTIVE]: this.activate.bind(this),
            [Constants.DEACTIVE]: this.deactivate.bind(this),
            [Constants.HISTORY]: this.historyMethod.bind(this),
            [Constants.HELP]: this.help.bind(this),
        }
    }

    handleCommand() {
        while (true) {
            let input = prompt("enter command : ");
            this.history.storeHistory(input)
            let command = input.split(" ");
            let mainCommand = command[(command.length) - 1] === Constants.HELP ? Constants.HELP : command[0];
            if (this.logs.isLogingStart) {
                this.storeLogDeatails(command);
            }
            if (command[0] === Constants.HELP && command.length === 1) {
                let keys = Object.keys(this.registeredCommands);
                if (keys.length === 0) {
                    console.log(HELP_MSGS);
                }
                else {
                    let helpObj = {};
                    for (let item of keys) {
                        helpObj = { ...HELP_MSGS, [item]: { ...this.registeredCommands[item].object.help(["all"]) } }
                    }
                    console.log(helpObj)
                }
            }
            else {
                if (mainCommand === Constants.EXIT) {
                    break
                }
                else if (!!this.commandStore[mainCommand]) {
                    if (DEFAULT_CMD_CONDITIONS[mainCommand].isLengthNotConst || command.length === DEFAULT_CMD_CONDITIONS[mainCommand].length)
                        this.commandStore?.[mainCommand](command);
                    else {
                        console.log("command or number of input commands are wrong. Please observe the format : " + DEFAULT_CMD_CONDITIONS[mainCommand].formate);
                    }
                }
                else {
                    this.handleOtherCommands(command)
                }
            }
        }
    }
    handleOtherCommands(command) {
        // command = command.split(" ");
        if (command[0] in this.registeredCommands) {
            if (this.registeredCommands[command[0]].isActive) {
                let access = this.registeredCommands[command[0]]["object"];
                access.handleInput(command);
            }
            else {
                console.log("command not activated");
            }
        }
        else {
            console.log("command not registered");
        }
    }

    logHandler(command) {
        // command = command.split(" ");
        if (command[1] === Constants.START) {
            this.logs.isLogingStart = true;
            // this.logs.logCheck = false;
            // this.storeLogDeatails(command);
            this.logs.handleLog(command)
        }
        else if (this.logs.isLogingStart) {
            // this.storeLogDeatails(command);
            this.logs.handleLog(command)
        }
        else {
            console.log("log is not yet started");
        }
    }

    help(command) {
        // command = command.split(" ");
        if (this.validCommands.includes(command[0])) {
            console.log(HELP_MSGS[command[0]]);
        }
        else if (!!this.registeredCommands?.[command[0]]) {
            this.registeredCommands[command[0]]["object"].handleInput(command);
        }
        else console.log("module is not present in register");
    }

    register(command) {
        // command = command.split(" ");
        let module = MODULES?.[command[2]]
        if (!!module) {
            const baseClass = require('./baseClass.js');
            let object = new module();
            const isModulePresent = !!Object.values(this.registeredCommands).find(value => value.moduleName === command[2])
            if (command[1] in this.registeredCommands || isModulePresent) {
                console.log('command or module already registered');
            }
            else if (object instanceof baseClass) {
                this.registeredCommands[command[1]] = { object, isActive: true, moduleName: command[2] };
                console.log("command registered");
                if (this.logs.isLogingStart === false) {
                    console.log("logs are in deactive state, please activate to store logs \nobserve the format : <log --start> <filepath>");
                }
            }
        }
        else {
            if (!module)
                console.log(`Module not found,Please use any of this ${Object.keys(MODULES)}`);
            else {
                console.log("invalid Command");
                console.log("observe the format : " + DEFAULT_CMD_CONDITIONS[mainCommand].formate);
            }
        };
    }
    unregister(command) {
        // command = command.split(" ");
        // console.log(command);
        if (command[1] in this.registeredCommands) {
            delete this.registeredCommands[command[1]];
            console.log("command unregistered");
        }
        else {
            console.log("invalid Command");
            console.log("observe the format : " + DEFAULT_CMD_CONDITIONS[mainCommand].formate);
        }
    }
    activate(command) {
        // command = command.split(" ");
        // console.log(command[1])
        if (command[1] in this.registeredCommands) {
            if (this.registeredCommands[command[1]].isActive) {
                console.log("command already activated");
            } else {
                this.registeredCommands[command[1]].isActive = true;
                console.log("command activated");
            }
        }
        else {
            console.log("command not registered");
        }
    }
    deactivate(command) {
        // command = command.split(" ");
        if (command[1] in this.registeredCommands) {
            if (!this.registeredCommands[command[1]].isActive) {
                console.log("command already deactivated");
            } else {
                this.registeredCommands[command[1]].isActive = false;
                console.log("command deactivated");
            }
        }
        else {
            console.log("command not registered");
        }
    }
    historyMethod(command) {
        // command = command.split(" ");
        this.history.handleInput(command);
    }

    storeLogDeatails(command) {
        // let log = new Log({ logSerial: this.logs.totalLogs.length + 1, timeStamp: Date.now(), logCommand: command }); // object for logclass //object creation3
        command = command.join(" ");
        let log = new Log({ logSerial: this.logs.logSerialNumber, timeStamp: Date.now(), logCommand: command });
        this.logs.storeLog(log);
    }

}
module.exports = CommandTool;
// let prompt = promptsync();
const prompt = require("prompt-sync")();
const commandTool = new CommandTool();
commandTool.handleCommand();

