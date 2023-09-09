"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var PORT_OPTION = '--port';
if (process.argv.length !== 4) {
    throw Error('В качестве аргумента должен быть передан порт через опцию --port');
}
if (process.argv[2] !== PORT_OPTION) {
    throw Error("\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0443\u043A\u0430\u0437\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u044F " + PORT_OPTION);
}
var app = (0, express_1["default"])();
var port = process.argv[3];
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listening on port " + port);
});
