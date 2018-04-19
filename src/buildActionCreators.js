import { callAction } from "./actionCreators/beesActionCreators";

export default function buildActionCreators(endpoints = {}) {
    return Object.keys(endpoints).reduce((acc, key) => {
        acc[key] = endpoints[key];
        acc[key].action = (...args) => callAction(endpoints[key], ...args);
        return acc;
    }, {});
}