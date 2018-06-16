var app = require('http');
var url = require('url');
var Cache = require('./Cache');

var Data = Cache.CacheData;

var session = [];

function checkAuth(headers) {
    var uid = headers.uid;
    for (var i = 0; i < session.length; i++) {
        if (uid == session[i]) {
            return true;
        }
    }
    return false;
}

app.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    console.log(`${req.method} ${req.url}`);

    switch (req.method) {
        case 'GET':
            var getMethod = require('./Service/GetMethod');
            switch (req.url) {
                case '/LoadStore':
                    if (true) {
                        res.writeHead(200, {
                            'Content-Type': 'text/xml'
                        });
                        res.end(Data.Store());
                    } else {
                        res.writeHeader(404, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("Request was not support!!!")
                    }
                    break;
                case '/LoadMenu':
                    if (true) {
                        res.writeHead(200, {
                            'Content-Type': 'text/xml'
                        });
                        res.end(Data.Menu());
                    } else {
                        res.writeHead(404, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("Request was not support!!!")
                    }
                    break;
                case '/LoadUser':
                    if (true) {
                        res.writeHead(200, {
                            'Content-Type': 'text/xml'
                        });
                        res.end(Data.User());
                    } else {
                        res.writeHead(404, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("Request was not support!!!")
                    }
                    break;
            }
            break;
        case 'PUT':
            var putMethod = require('./Service/PutMethod');
            switch (req.url) {
                case '/UpdateMenu':
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        putMethod.UpdateMenuItem(body).then((result) => {
                            Data.CacheMenu();
                            res.end("Done");
                        }).catch((err) => {
                            res.end("Fail");
                        })
                    });
                    break;
            }
            break;
        case 'POST':
            var postMethod = require('./Service/PostMethod');
            switch (req.url) {
                case '/InsertMenu':
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        postMethod.InsertMenuItem(body).then((result) => {
                            Data.CacheMenu();
                            res.end("Done");
                        }).catch((err) => {
                            res.end("Fail");
                        })
                    });
                    break;
            }
            break;
    }
}).listen(3000, (err) => {
    if (err != null) {
        console.log('ERROR: ', err);
    } else {
        console.log('Data Service is listening at port 3000');
    }
})