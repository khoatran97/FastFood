var app = require('http');

var getMethod = require('./Service/GetMethod');

module.exports.CacheData = new class Cache {
    constructor() {
        this.userCache = this.CacheUser();
        this.storeCache = this.CacheStore();
        this.menuCache = this.CacheMenu();
        this.billCache = this.CacheBill();
        console.log("Caches are created");
    }

    CacheUser() {
        var users = getMethod.loadAllUser();
        this.userCache = users;
        return users;
    }

    CacheStore() {
        var stores = getMethod.loadAllStore();
        this.storeCache = stores;
        return stores;
    }

    CacheMenu() {
        var items = getMethod.loadAllMenuItem();
        this.menuCache = items;
        return items;
    }

    CacheBill() {
        var bills = getMethod.loadAllBill();
        this.billCache = bills;
        return bills;
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

    Bill() {
        if (this.billCache == "" || this.billCache == undefined) {
            this.billCache = this.CacheBill();
            return this.billCache;
        }
        else {
            return this.billCache;
        }
    }
}