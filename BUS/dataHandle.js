var Cache = require('./Cache');
const xml2js = require('xml2js');
const xmldom = require('xmldom');
var app = require('http');
const request = require('request')

var Data = Cache.CacheData;

class User {
    constructor() {
        console.log("UserHandle is created");
    }

    GetAll() {
        return Data.User();
    }
}

class Store {
    constructor() {
        console.log("StoreHandle is created");
    }

    GetAll() {
        return Data.Store();
    }
}

class Menu {
    constructor() {
        console.log("MenuHandle is created");
    }

    GetAllInGuest() {
        // tại đây có thay đổi cấu trúc dữ liệu .......
        ///
        var menuItems = [];
        xml2js.Parser().parseString(Data.Menu(), (err, result) =>{
            (result.root.Mon).forEach(item => {
                
               // load dữ liệu để hiển thị
               menuItems.push({'Mon': item.$});
            });
        });
        var builder = new xml2js.Builder();
        return builder.buildObject(menuItems)
    }

    GetAllInEmplyee() {
        // tại đây có thay đổi cấu trúc dữ liệu .......
        ///
        var menuItems = [];
        xml2js.Parser().parseString(Data.Menu(), (err, result) =>{
            (result.root.Mon).forEach(item => {
               // load dữ liệu để hiển thị
               menuItems.push({'Mon': item});
            });
        });
        var builder = new xml2js.Builder();
        return builder.buildObject(menuItems)
    }

    Update(jsonInfo) {
        return new Promise((resolve, reject) =>{
            var _jsonInfo = JSON.parse(jsonInfo);
            /*if (_jsonInfo.Price != undefined && isNaN(parseInt(_jsonInfo.Price))) {
                console.log("a");
                reject("invalid value");
            }
            if (_jsonInfo.Status != true && _jsonInfo.Status != false) {
                console.log("b");
                reject("invalid value");
            }*/
            var options = {
                uri: "http://localhost:3000/UpdateMenu",
                body: jsonInfo,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(options, (err,data,res) => {
                if (res == 'Done')
                    resolve(true);
            })
        });
    }

    Insert(jsonInfo) {
        return new Promise((resolve, reject) =>{
            var _jsonInfo = JSON.parse(jsonInfo);
            /*if (_jsonInfo.Price != undefined && isNaN(parseInt(_jsonInfo.Price))) {
                console.log("a");
                reject("invalid value");
            }
            if (_jsonInfo.Status != true && _jsonInfo.Status != false) {
                console.log("b");
                reject("invalid value");
            }*/
            var options = {
                uri: "http://localhost:3000/InsertMenu",
                body: jsonInfo,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(options, (err,data,res) => {
                if (res == 'Done')
                    resolve(true);
            })
        });
    }
}

module.exports.User = new User();
module.exports.Store = new Store();
module.exports.Menu = new Menu();