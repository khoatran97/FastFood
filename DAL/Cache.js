var app = require('http');

var getMethod = require('./Service/GetMethod');

module.exports.CacheData = new class Cache {
    constructor() {
        this.userCache = this.CacheUser();
        this.storeCache = this.CacheStore();
        this.menuCache = this.CacheMenu();
        console.log("Cache is created");
    }

    CacheUser() {
        return getMethod.loadAllUser();
    }

    CacheStore() {
        return getMethod.loadAllStore();
    }

    CacheMenu() {
        return getMethod.loadAllMenuItem();
    }

    User() {
        if (this.userCache == "" || this.userCache == undefined) {
            this.userCache = this.CacheUser();
            return this.userCache;
        }
        else {
            return this.userCache;
        }
    }

    Store() {
        if (this.storeCache == "" || this.storeCache == undefined) {
            this.storeCache = this.CacheStore();
            return this.storeCache;
        }
        else {
            return this.storeCache;
        }
    }
    
    Menu() {
        if (this.menuCache == "" || this.menuCache == undefined) {
            this.menuCache = this.CacheMenu();
            return this.menuCache;
        }
        else {
            return this.menuCache;
        }
    }
}