"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
exports.listFolder = function (libDir, fileEnding) {
    if (!fs_1.existsSync(libDir)) {
        throw new Error("specified lib dir does not exist: " + libDir);
    }
    var fileMatch = new RegExp(".*." + fileEnding + "$");
    var files = fs_1.readdirSync(libDir);
    return files
        .filter(function (file) { return file.match(fileMatch); })
        .filter(function (file) { return fs_1.lstatSync(path_1.join(libDir, file)).isFile(); })
        .map(function (file) { return fs_1.realpathSync(path_1.resolve(libDir, file)); });
};
