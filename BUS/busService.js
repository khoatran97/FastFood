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
        res.setHeader("Access-Control-Allow-Origin", "*");
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
                        res.writeHead(200, {
                            'Content-Type': 'text/xml'
                        });
                        if (req.headers['role'] == 0) {
                            res.end(dataHandle.Menu.GetAllInGuest());
                        }
                        break;
                }
                break;
            case 'PUT':
                switch (req.url) {
                    case '/UpdateMenu':
                        dataHandle.Menu.Update(body).then((result) => {
                            res.end('Done');
                        }).catch((reject) => {
                            res.end('Fail');
                        })
                        break;
                }
                break;
            case 'POST':
                switch (req.url) {
                    case '/InsertMenu':
                        dataHandle.Menu.Insert(body).then((result) => {
                            res.end('Done');
                        }).catch((reject) => {
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