"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startLogger = void 0;
const store_1 = require("./store");
function startLogger() {
    setInterval(() => {
        store_1.GameManager.getInstance().logState();
    }, 4000);
}
exports.startLogger = startLogger;
