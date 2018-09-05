export default class LocalStorage {
    constructor() {}

    getItem(key) {
        return window.localStorage.getItem(key);
    }

    getJsonItem(key) {
        return JSON.parse(window.localStorage.getItem(key));
    }

    setItem(key, value) {
        window.localStorage.setItem(key, value);
    }

    setJsonItem(key, jsonValue) {
        window.localStorage.setItem(key, JSON.stringify(jsonValue));
    }

    removeItem(key) {
        window.localStorage.removeItem(key);
    }
}