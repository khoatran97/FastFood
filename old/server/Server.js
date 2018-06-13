
var app = require('http');
var fs = require('fs');
var port = 4444;
app.createServer((Yeu_cau, Phan_hoi) => {
    
    var url;
    if (Yeu_cau.url == '/') {
        url = '[Template]/UI/home.html';
    }
    else if (Yeu_cau.url == '/Khach_Tham_quan.html') {
        url = '[Template]/UI/Home.html';
    }
    else if (Yeu_cau.url =='/manager.html') {
        console.log('da vao day');
        // sẽ tách chuỗi để lấy được Media|Ma_so
        
        url = '[Template]/UI/manager.html';
        //url = '[Template]/UI/DetailsProduct.html';
    }
    else
    {
        url = Yeu_cau.url;
    }

    var extension = Yeu_cau.url.lastIndexOf('.');
    var header
    header = (extension == -1 && Yeu_cau.url != '/')? 'text/plain' :  {
        '/' : 'text/html',
        '.html' : 'text/html',
        '.ico' : 'image/x-icon',
        '.jpg' : 'image/jpeg',
        '.png' : 'image/png',
        '.gif' : 'image/gif',
        '.css' : 'text/css',
        '.js' : 'text/javascript'
        }[ Yeu_cau.url.substr(extension) ];

    if (typeof header == "undefined") {
        header = 'text/html';
    }

    fs.readFile('../' + url, (Loi, Du_lieu) => {
        if (Loi) {
            console.log("Error: " + Loi);
            Phan_hoi.writeHead(404, 'Not found')
            Phan_hoi.end()
        }
        else {
            Phan_hoi.setHeader('Content-type', header);
            Phan_hoi.end(Du_lieu)
        }
    })
}).listen(port, (Loi) => {
    if (Loi) {
        console.log("Error: " + Loi);
    }
    else {
        console.log("Listening at port" + port)
    }
})