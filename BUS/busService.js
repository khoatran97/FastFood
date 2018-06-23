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
            var role_tmp = dataHandle.User.checkSession(js.UserId);
            Role = role_tmp == -1 ? 0 : role_tmp;
        }
        
    //Check the petition Method
    
        console.log(`${req.method} ${req.url}`);
        switch (req.method) {
            case 'GET':
                switch (req.url) {
                    case '/LoadUser':
                        res.writeHead(200, {
                            'Content-Type': 'text/xml'
                        });
                        res.end(dataHandle.User.GetAll());
                        break;
                    case '/LoadStore':
                        app.get('http://localhost:3000/LoadStore', (resp) => {
                            let data = '';
                            resp.on('data', (chunk) => {
                                data += chunk;
                            });
                            resp.on('end', () => {
                                res.writeHead(200, {
                                    'Content-Type': 'text/xml'
                                });
                                res.end(data);
                            });
                        }).on("error", (err) => {
                            res.writeHeader(404, {
                                'Content-Type': 'text/plain'
                            })
                            res.end("Error: " + err.message);
                        });
                        break;
                    case '/LoadMenu':
                        /// ở đây bỏ rồi xuống dưới đi                        
                        res.writeHead(200, {
                            'Content-Type': 'text/xml'
                        });
                        if (body != '') {
                            res.end(dataHandle.Menu.GetAll(body));
                        }
                        else {
                            res.writeHead(200, {
                                'Content-Type': 'text/xml'
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
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        });
                        res.end(dataHandle.User.checkSession(json.Id));
                    case '/LoadBill':
                        if (Role == 2 || Role == 3) {
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
                }
                break;
            case 'PUT':
                switch (req.url) {
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
                                res.end('Done');
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