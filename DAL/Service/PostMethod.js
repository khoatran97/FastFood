var fs = require('fs');
var path = require('path');
const xml2js = require('xml2js');
const xmldom = require('xmldom');

var menuPath = path.join(__dirname, '/../Data/Menu/');
var billPath = path.join(__dirname, '/../Data/Bill/');

var parser = new xmldom.DOMParser();
var XMLSerializer = new xmldom.XMLSerializer();

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}
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
            <Mon Ten ="${jsonInfo.Name}" Ma_so = "${Id}" Don_gia = "${jsonInfo.Price}" Tinh_trang="${jsonInfo.Status}">
            </Mon>
            `
            fs.writeFileSync(filePath, xml, "utf8");
            
            console.log(`Inserted successfully`);
            resolve(true);
        });
    })
    
}

function addHistory(id, price, quantity) {
    var parser = new xmldom.DOMParser();
    itemFile = menuPath + `${id}.xml`;
    var data = fs.readFileSync(itemFile, 'utf-8');

    var xml = parser.parseFromString(data);
    var root = xml.getElementsByTagName('Mon')[0];
    var newHistory = xml.createElement('Lich_su_Ban_hang');
    newHistory.setAttribute('Ngay', `${getDate()}`);
    newHistory.setAttribute('So_luong', `${quantity}`);
    newHistory.setAttribute('Don_gia', `${price}`);
    var Doanh_thu = root.getAttribute('Doanh_thu');
    root.setAttribute('Doanh_thu', +Doanh_thu + +price * +quantity);
    root.appendChild(newHistory);
    var updatedItem = XMLSerializer.serializeToString(root);

    fs.writeFileSync(itemFile, updatedItem);
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
                addHistory(item.Id, item.Price, item.Quantity);
                total = total + sum;
                xml = xml + `<Mon Ten="${item.Name}" Ma_so="${item.Id}" So_luong="${item.Quantity}" Don_gia="${item.Price}" Tong="${sum}"/>
                `;
            })

            xml = `<Don_hang Ma="${Id}" Ngay="${getDate()}" Tong_tien="${total}" Tinh_trang="false">
            ${xml}</Don_hang>`;
            
            fs.writeFileSync(filePath, xml, "utf8");
            
            console.log(`Inserted successfully`);
            resolve(true);
        });
    })
}