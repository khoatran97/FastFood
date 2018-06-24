var app = require('http');

module.exports.CacheData = new class Cache {
    constructor() {
        this.CacheUser().then(result => {
            this.userCache = result;
            return this.userCache;
        })
        this.CacheStore().then(result => {
            this.storeCache = result;
            return this.storeCache;
        })
        this.CacheMenu().then(result => {
            this.menuCache = result;
            return this.menuCache;
        })
        console.log("Cache is created");
    }

    async CacheUser() {
        return new Promise(function(resolve, reject) {
            app.get('http://localhost:3000/LoadUser', (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    resolve(data);
                });
            }).on("error", (err) => {
                console.log(`CACHE: ${err}`);
            });
        });
    }

    async CacheStore() {
        return new Promise(function(resolve, reject) {
            app.get('http://localhost:3000/LoadStore', (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    resolve(data);
                });
            }).on("error", (err) => {
                console.log(`CACHE: ${err}`);
            });
        });
    }

    async CacheMenu() {
        return new Promise(function(resolve, reject) {
            app.get('http://localhost:3000/LoadMenu', (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    resolve(data);
                });
            }).on("error", (err) => {
                console.log(`CACHE: ${err}`);
            });
        });
    }

    async CacheBill() {
        return new Promise(function(resolve, reject) {
            app.get('http://localhost:3000/LoadBill', (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    resolve(data);
                });
            }).on("error", (err) => {
                console.log(`CACHE: ${err}`);
            });
        });
    }

    User() {
        if (this.userCache == "" || this.userCache == undefined) {
            this.CacheUser().then(result => {
                this.userCache = result;
                return this.userCache;
            })
        }
        else {
            return this.userCache;
        }
    }

    Bill() {
        if (this.billCache == "" || this.billCache == undefined) {
            this.CacheBill().then(result => {
                this.billCache = result;
                return this.billCache;
            })
        }
        else {
            return this.billCache;
        }
    }

    Store() {
        if (this.storeCache == "" || this.storeCache == undefined) {
            this.CacheStore().then(result => {
                this.storeCache = result;
                return this.storeCache;
            })
        }
        else {
            return this.storeCache;
        }
    }
    
    Menu() {
        if (this.menuCache == "" || this.menuCache == undefined) {
            this.CacheMenu().then(result => {
                this.menuCache = result;
                return this.menuCache;
            })
        }
        else {
            return this.menuCache;
        }
    }
}