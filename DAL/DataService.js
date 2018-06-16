var app = require('http');
var url = require('url');

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
                        var data = getMethod.loadAllStore();
                        res.end(data);
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
                        var data = getMethod.loadAllMenuItem();
                        res.end(data);
                    } else {
                        res.writeHeader(404, {
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
                        var data = getMethod.loadAllUser();
                        res.end(data);
                    } else {
                        res.writeHeader(404, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("Request was not support!!!")
                    }
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