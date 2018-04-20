'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.callAction = callAction;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function callAction(endpoint) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return function (dispatch) {
        var _args$ = args[3],
            meta = _args$ === undefined ? {} : _args$;

        var params = Object.keys(meta).length ? args.slice(0, -1) : args;
        var apiMeta = {
            api: true,
            name: endpoint.actionName,
            params: params
        };

        dispatch({
            type: 'api/' + endpoint.actionName + '/request',
            meta: _extends({}, apiMeta, meta.request || {}, { type: 'request' })
        });

        return new Promise(function (resolve, reject) {
            endpoint.apply(undefined, _toConsumableArray(params)).then(function (result) {
                dispatch({
                    type: 'api/' + endpoint.actionName + '/response',
                    payload: result,
                    meta: _extends({}, apiMeta, meta.success || {}, { type: 'response' })
                });
                return resolve(result);
            }).catch(function (result) {
                dispatch({
                    type: 'api/' + endpoint.actionName + '/error',
                    payload: result,
                    meta: _extends({}, apiMeta, meta.error || {}, { type: 'error' })
                });
                return reject(result);
            });
        });
    };
}