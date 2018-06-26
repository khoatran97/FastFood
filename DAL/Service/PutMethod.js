var fs = require('fs');
var path = require('path');
const xml2js = require('xml2js');
const xmldom = require('xmldom');

var menuPath = path.join(__dirname, '/../Data/Menu/');
var billPath = path.join(__dirname, '/../Data/Bill/');

var parser = new xmldom.DOMParser();
var XMLSerializer = new xmldom.XMLSerializer();

module.exports.UpdateMenuItem = (jsonInfo) => {
    return new Promise((resolve, reject) => {
        jsonInfo = JSON.parse(jsonInfo);

        console.log(jsonInfo);

        var filePath = menuPath + `${jsonInfo.Id}.xml`;
        var data = fs.readFileSync(filePath, 'utf-8')

        var xml = parser.parseFromString(data);
        var item = xml.getElementsByTagName("Mon")[0];
        if (jsonInfo.Price != undefined) {
            item.setAttribute("Don_gia", jsonInfo.Price);
        }
        if (jsonInfo.Status != undefined) {
            item.setAttribute("Tinh_trang", jsonInfo.Status);
        }
        var updatedItem = XMLSerializer.serializeToString(item);

        fs.writeFileSync(filePath, updatedItem, "utf8", (err) => {
            if (err) {
                reject(err);
            }
        })
        resolve(true);
    });
}

module.exports.UpdateBill = (jsonInfo) => {
    return new Promise((resolve, reject) => {
        jsonInfo = JSON.parse(jsonInfo);

        var filePath = billPath + `${jsonInfo.Id}.xml`;
        var data = fs.readFileSync(filePath, 'utf-8')

        var xml = parser.parseFromString(data);
        var item = xml.getElementsByTagName("Don_hang")[0];
        item.setAttribute("Tinh_trang", "true");
        var updatedItem = XMLSerializer.serializeToString(item);

        fs.writeFileSync(filePath, updatedItem, "utf8", (err) => {
            if (err) {
                reject(err);
            }
        })
        resolve(true);
    });
}