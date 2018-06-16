var Cache = require('./Cache');
const xml2js = require('xml2js');

var Data = Cache.CacheData;

class User {
    constructor() {
        console.log("UserHandle is created");
    }

    GetAll() {
        return Data.User();
    }
}

module.exports.User = new User();