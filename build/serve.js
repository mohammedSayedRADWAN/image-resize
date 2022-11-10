"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cashing = function (path) {
    try {
        return fs_1.default.existsSync(path);
    }
    catch (e) {
        console.log(e);
    }
    return false;
};
var queryValid = function (width, height, path) {
    if (width <= 0 || height <= 0 || (!fs_1.default.existsSync(path)) || isNaN(width) || isNaN(height))
        return false;
    return true;
};
exports.default = { queryValid: queryValid, cashing: cashing };
