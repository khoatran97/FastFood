var fs = require('fs');
var path = require('path');
const xml2js = require('xml2js');
const xmldom = require('xmldom');

var menuPath = path.join(__dirname, '/../Data/Menu/');

var parser = new xmldom.DOMParser();
var XMLSerializer = new xmldom.XMLSerializer();

module.exports.InsertMenuItem = (jsonInfo) => {
    return new Promise((resolve, reject) => {
        jsonInfo = JSON.parse(jsonInfo);

        fs.readdir(menuPath, (err, files) => {
            if (err) {
                console.log(`InsertMenu Error: ${err}`);
                reject(err)
            }
            var Id = files.length + 1;
            var filePath = menuPath + `${Id}.xml`;

            var xml = `
            <Mon Ten ="${jsonInfo.Name}" Ma_so = "${Id}" Don_gia = "${jsonInfo.Price}" Tinh_trang="${jsonInfo.Status}">
            </Mon>
            `
            fs.writeFileSync(filePath, xml, "utf8");
            
            console.log(`Inserted successfully`);
            resolve(true);
        });
    })
    
}