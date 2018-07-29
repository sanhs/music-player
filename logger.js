// 'use strict'
var moment = require('moment');

var fg = {
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
}

var bg = {
    Black: "\x1b[40m",
    Red: "\x1b[41m",
    Green: "\x1b[42m",
    Yellow: "\x1b[43m",
    Blue: "\x1b[44m",
    Magenta: "\x1b[45m",
    Cyan: "\x1b[46m",
    White: "\x1b[47m",
}

var ft = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
}

// var ops = ['debug']

// NOTE: this is from log4js-extend...
function prepareStackTrace(error, structuredStackTrace) {
    var trace = structuredStackTrace[0];
    return {
        name: trace.getMethodName() || trace.getFunctionName() || "<anonymous>",
        file: trace.getFileName().split('/').pop(),
        line: trace.getLineNumber(),
        column: trace.getColumnNumber()
    };
}

function getTrace(caller) {
    var error = {};
    Error.prepareStackTrace = prepareStackTrace;
    Error.captureStackTrace(error, caller || getTrace);
    return error.stack;
}

function errorStack(caller) {
}

var Logger = function (level, trace) {
    this.level = level; this.trace = trace
    this._log = function (color, args, stack, trace) {
        if (typeof color === 'object') color = fg.White;
        var s = '', logInfo = null;
        for (var i = 0; i < args.length; i++) { s += args[i] + ' ' }
        if (stack) logInfo = stack.file + '::' + stack.name + '::' + stack.line + ':' + stack.column
        console.log(color + '[' + moment().format('YYYY:MM:DD::HH:mm:ss:SSS') + '] ' + stack.msg + s + '<' + logInfo + '> ' + ft.Reset)
        if (trace) console.log(trace)
    }
}

Logger.prototype.debug = function () {
    if (this.trace && this.level > -1) var stack = getTrace(this.__proto__.debug);
    stack.msg = '[DEBUG] '
    this._log(bg.Cyan, arguments, stack)
}

Logger.prototype.warn = function () {
    if (this.trace && this.level > -1) var stack = getTrace(this.__proto__.warn);
    stack.msg = '[WARN] '
    this._log(fg.Yellow, arguments, stack)
}

Logger.prototype.info = function () {
    if (this.trace && this.level > -1) var stack = getTrace(this.__proto__.info);
    stack.msg = '[INFO] '
    this._log(fg.Green, arguments, stack)
}

Logger.prototype.error = function () {
    if (this.trace && this.level > -1) var stack = getTrace(this.__proto__.error);
    stack.msg = '[ERROR] '
    var error = {};
    Error.prepareStackTrace = null
    Error.captureStackTrace(error, this.__proto__.error);
    this._log(fg.Red, arguments, stack, error.stack)
}

Logger.prototype.fatal = function () {
    if (this.trace && this.level > -1) stack = getTrace(this.__proto__.fatal);
    stack.msg = '[FATAL] '
    var error = {};
    Error.prepareStackTrace = null
    Error.captureStackTrace(error, this.__proto__.error);
    this._log(bg.Red, arguments, stack)
}
// clears screen
Logger.prototype.reset = function () {
    return process.stdout.write('\033c');
}

module.exports = new Logger(0, true);

// var log = new Logger(0, true);
