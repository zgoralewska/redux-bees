"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = buildActionCreators;

var _beesActionCreators = require("./actionCreators/beesActionCreators");

function buildActionCreators() {
    var endpoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return Object.keys(endpoints).reduce(function (acc, key) {
        acc[key] = endpoints[key];
        acc[key].action = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _beesActionCreators.callAction.apply(undefined, [endpoints[key]].concat(args));
        };
        return acc;
    }, {});
}