var fs = require('fs');
var path = require('path');
const xml2js = require('xml2js');

var menuPath = path.join(__dirname, '/../Data/Menu/');
var storePath = path.join(__dirname, '/../Data/Store/');
var userPath = path.join(__dirname, '/../Data/User/');

var MenuItems = [];

module.exports.loadAllStore = () => {
    var data = fs.readFileSync(storePath + 'Stores.xml', 'utf-8');
    return data;
}

module.exports.loadAllUser = () => {
    var data = fs.readFileSync(userPath + 'Users.xml', 'utf-8');
    return data;
}

module.exports.loadAllMenuItem = () => {
    fs.readdirSync(menuPath + 'McCafes/').forEach(file => {
        var filePath = menuPath + '/McCafes/' + file;
        var data = fs.readFileSync(filePath, 'utf-8')

        var parser = new xml2js.Parser();
        parser.parseString(data, function (err, result) {
            if (result != null)
                MenuItems.push({'Item': result.Mon.$});
        });
    });
    console.log(MenuItems);

    var builder = new xml2js.Builder();
    var xml = builder.buildObject(MenuItems)

    return xml;
}