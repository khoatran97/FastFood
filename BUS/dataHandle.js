var Cache = require('./Cache');
const xml2js = require('xml2js');
const xmldom = require('xmldom');
var app = require('http');
const request = require('request')

var Data = Cache.CacheData;
var session = [];

function checkSession(id) {
    console.log(session);
    var obj = session.find((obj) => obj.Id === id);
    /*for (var i = 0; i < session.length; i++) {
        if (session[i].id === id) {
            return session[i].role;
        }
    }
    return -1;*/

    if (obj == null || obj == undefined) {
        return -1;
    }
    else {
        return obj.Role;
    }
}

class User {
    constructor() {
        console.log("UserHandle is created");
    }

    GetAll() {
        return Data.User();
    }

    Auth(id, password) {
        return new Promise((resolve, reject) => {
            var result = false;
            if (checkSession(id) !== -1) {
                console.log('The user session had not been deleted yet');
                resolve(true);
            }
            else {
                xml2js.Parser().parseString(this.GetAll(), (err, result) => {
                    if (!err) {
                        var tmp = result.Staff.Member.find((member) => member.$.Id == id && member.$.Mat_khau == password)
                        if (tmp != null && tmp != undefined) {
                            var json = JSON.parse(`{"Id": "${tmp.$.Id}", "Role": ${tmp.$.Chuc_vu}}`);
                            session.push(json)
                            console.log('Log in successfully');
                            resolve(true);
                        }
                        else {
                            console.log('Log in unsuccessfully');
                            reject(Error('Invalid information'));
                        }
                    }
                    else {
                        console.log(`AuthERROR: ${err}`);
                        reject(Error(`AuthERROR: ${err}`));
                    }
                })
            }
            return result;
        });
    }

    async LogOut(id) {
        for (var i = 0; i < session.length; i++) {
            if (session[i].id === id) {
                for (var j = i; i < session.length - 1; i++) {
                    session[j] = session[j+1];
                }
                console.log('Log out successfully');
            }
        }
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