var Cache = require('./Cache');
const xml2js = require('xml2js');
const xmldom = require('xmldom');
var app = require('http');
const request = require('request')

var Data = Cache.CacheData;
var session = [];

class User {
    constructor() {
        console.log("UserHandle is created");
    }

    checkSession(id) {
        console.log('session ::'+ session);
        console.log('$$$$$$$$');
        console.log('id ::' + id);
        var obj = session.find((obj) => obj.Id === id);

        if (obj == null || obj == undefined) {
            return -1;
        }
        else {
            return obj.Role;
        }
    }

    GetAll() {
        return Data.User();
    }

    Auth(id, password) {
        return new Promise((resolve, reject) => {
            var result = false;
            if (this.checkSession(id) !== -1) {
                console.log('The user session had not been deleted yet');
                resolve(true);
            }
            else {
                xml2js.Parser().parseString(this.GetAll(), (err, result) => {
                    if (!err) {
                        var tmp = result.Danh_sach.Nhan_vien.find((member) => member.$.Id == id && member.$.Mat_khau == password)
                        if (tmp != null && tmp != undefined) {
                            var json = JSON.parse(`{"Id": "${tmp.$.Id}", "Role": ${tmp.$.Chuc_vu}}`);
                            session.push(json);
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

    async LogOut(body) {
        var json = JSON.parse(body);
        for (var i = 0; i < session.length; i++) {
            if (session[i].Id == json.UserId) {
                session.splice(i, 1);
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

    GetAll(body) {
        var json = JSON.parse(body);
        var obj = session.find((obj) => obj.Id === json.UserId);
        if (obj == null || obj == undefined) {
            return this.GetAllInGuest();
        }

        switch (obj.Role) {
            case 2: 
                return this.GetAllInCashier();
                break;
            default:
                return this.GetAllInGuest();
        }
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

    GetAllInCashier() {
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
                if (res == 'Done') {
                    Data.CacheMenu().then((result) => {
                        Data.menuCache = result;
                        resolve(true);
                    })
                }
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
                if (res == 'Done') {
                    Data.CacheMenu().then((result) => {
                        Data.menuCache = result;
                        resolve(true);
                    })
                }
            })
        });
    }
}

class Bill {
    constructor() {
        console.log("MenuHandle is created");
    }

    Create(jsonInfo) {
        return new Promise((resolve, reject) =>{
            var _jsonInfo = JSON.parse(jsonInfo);
            var options = {
                uri: "http://localhost:3000/InsertBill",
                body: jsonInfo,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(options, (err,data,res) => {
                if (res != 'Fail') {
                    Data.CacheBill().then((result) => {
                        Data.billCache = result;
                        resolve(`${res}`);
                    })
                }
                    
            })
        });
    }

    Pay(jsonInfo) {
        return new Promise((resolve, reject) =>{
            var _jsonInfo = JSON.parse(jsonInfo);
            var options = {
                uri: "http://localhost:3000/UpdateBill",
                body: jsonInfo,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(options, (err,data,res) => {
                if (res == 'Done') {
                    Data.CacheBill().then((result) => {
                        Data.billCache = result;
                        resolve(true);
                    })
                }
            })
        });
    }

    GetAll() {
        return Data.Bill();
    }
}

module.exports.User = new User();
module.exports.Store = new Store();
module.exports.Menu = new Menu();
module.exports.Bill = new Bill();