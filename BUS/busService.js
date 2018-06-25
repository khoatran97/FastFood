var app = require('http');
var url = require('url');
var query = require('querystring');
var xml2js = require('xml2js');
var dataHandle = require('./dataHandle');

var port = 3001

app.createServer((req, res) => {

    let body='';
    req.on('data', (chunk) => {
        body += chunk.toString();
    }).on('end', () => {
        res.setHeader('Access-Control-Allow-Origin',' *');
        
        var Role = 0;
        if (body != '') {
            var js = JSON.parse(body);
            console.log('----------');
            console.log(js.UserId);
            var role_tmp = dataHandle.User.checkSession(js.UserId);
            Role = role_tmp == -1 ? 0 : role_tmp;
            console.log(Role);
        }
        
    //Check the petition Method
    
        console.log(`${req.method} ${req.url}`);
        switch (req.method) {
            case 'GET':
                res.end('Do not use GET method');
                break;
            case 'PUT':
                res.end('Do not use PUT method');
                break;
            case 'POST':
                console.log(Role);
                switch (req.url) {
                    case '/InsertMenu':
                        if (Role == 3) {
                            dataHandle.Menu.Insert(body).then((result) => {
                                res.end('Done');
                            }).catch((reject) => {
                                res.end('Fail');
                            })
                        }
                        else {
                            res.end('No Permission');
                        }
                        break;
                    case '/CreateBill':
                        if (Role == 1) {
                            dataHandle.Bill.Create(body).then((result) => {
                                res.end(`${result}`);
                            }).catch((reject) => {
                                res.end('Fail');
                            })
                        }
                        else {
                            res.end('No Permission');
                        }
                        break;
                    case '/LogIn':
                        var user = JSON.parse(body);
                        dataHandle.User.Auth(user.Id, user.Password).then(() => {
                            res.end('Done');
                        }).catch((err) => {
                            res.end('Fail');
                        })
                        break;
                    case '/LoadUser':
                        res.writeHead(200, {
                            'Content-Type': 'text/xml'
                        });
                        res.end(dataHandle.User.GetAll());
                        break;
                    case '/LoadStore': 
                        res.writeHead(200, {
                            'Content-Type': 'text/xml'
                        });
                        res.end(dataHandle.Store.GetAll());
                        break;
                    case '/LoadMenu':
                        /// ở đây bỏ rồi xuống dưới đi                    
                        if (body != '') {
                            res.writeHead(200, {
                                'Content-Type': 'text/xml'
                            });
                            res.end(dataHandle.Menu.GetAll(body));
                        }
                        else {
                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            });
                            res.end('Fail');
                        }
                        break;
                    case '/LogOut':
                        dataHandle.User.LogOut(body);
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        });
                        res.end('Done');
                        break;
                    case '/Session':
                        var json = JSON.parse(body);
                        var id = json.UserId;
                       
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        });
                        console.log('####IDIDIDI');
                        console.log('isd :: ' + dataHandle.User.checkSession(json.UserId));
                        res.end(`${dataHandle.User.checkSession(json.UserId)}`);

                        break;
                    case '/LoadBill':
                    console.log('role của tui ::' + Role);
                        if (Role == 2 || Role == 3) {
                            res.writeHead(200, {
                                'Content-Type': 'text/xml'
                            });
                            res.end(dataHandle.Bill.GetAll());
                            break;
                        }
                        else {
                            res.end('No Permission');
                        }
                        break;
                        case '/UpdateMenu':
                        if (Role == 3) {
                            dataHandle.Menu.Update(body).then((result) => {
                                res.end('Done');
                            }).catch((reject) => {
                                res.end('Fail');
                            })
                        }
                        else {
                            res.end('No Permission');
                        }
                        break;
                    case '/PayBill':
                        if (Role == 2) {
                            dataHandle.Bill.Pay(body).then((result) => {
                                res.end('Done');
                            }).catch((reject) => {
                                res.end('Fail');
                            })
                        }
                        else {
                            res.end('No Permission');
                        }
                        break;
                }
                break;
        }
    });
}).listen(port, (err) => {
    if (err != null)
        console.log('==> Error: ' + err)
    else
        console.log('BUS Service is starting at port ' + port)
})