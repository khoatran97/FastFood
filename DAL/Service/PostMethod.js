var fs = require('fs');
var path = require('path');
const xml2js = require('xml2js');
const xmldom = require('xmldom');

var menuPath = path.join(__dirname, '/../Data/Menu/');
var billPath = path.join(__dirname, '/../Data/Bill/');

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
            var Id = files.length;
            var filePath = menuPath + `${Id}.xml`;

            var xml = `
            <Mon Ten ="${jsonInfo.Name}" Ma_so = "MT_${Id}" Don_gia = "${jsonInfo.Price}" Tinh_trang="${jsonInfo.Status}">
            </Mon>
            `
            fs.writeFileSync(filePath, xml, "utf8");
            
            console.log(`Inserted successfully`);
            resolve(true);
        });
    })
    
}

module.exports.InsertBill = (jsonInfo) => {
    return new Promise((resolve, reject) => {
        jsonInfo = JSON.parse(jsonInfo);
        var items = jsonInfo.Items;
        console.log(items);
        fs.readdir(billPath, (err, files) => {
            if (err) {
                console.log(`InsertBill Error: ${err}`);
                reject(err)
            }
            var Id = files.length + 1;
            var filePath = billPath + `${Id}.xml`;
            
            var xml = ``;
            var total = 0;
            items.forEach((item) => {
                var sum = +(item.Quantity) * +(item.Price);
                total = total + sum;
                xml = xml + `<Mon Ten="${item.Name}" Ma_so="${item.Id}" So_luong="${item.Quantity}" Don_gia="${item.Price}" Tong="${sum}"/>
                `;
            })

            xml = `<Don_hang Ma="${Id}" Ngay="${Date.now()}" Tong_tien="${total}" Tinh_trang="false">
            ${xml}</Don_hang>`;
            
            fs.writeFileSync(filePath, xml, "utf8");
            
            console.log(`Inserted successfully`);
            resolve(true);
        });
    })
}