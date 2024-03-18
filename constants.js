const HELP_MSGS = {
    "register": "used to register a command and actions assigned to the command 'register <command_name>'",
    "unregister": "used to unregister a command",
    "active": "activates the command mentioned in the '<command_name>', it makes the user to gain access to run this command",
    "deactive": "deactivates the command mentioned in the '<command_name>', it makes the user to loss access to run this command",
    "history": "print <count> latest commands, default count is 5",
    "log": `logs commands from the log file location \n 'log --all' : print all commands from the current log file
        \n 'log --tail 9' : "print last 9 commands from the current log file
        \n "'log --head 9' : print first 9 commands from the current log file
        \n "'log --clear' : clears all logs from the current log file
        \n "'log --stop' : stops logging commands but keep the current log file`
};

module.exports = { HELP_MSGS };