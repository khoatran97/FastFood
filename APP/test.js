var app = require('http');

app.get('http://localhost:3001/LoadStore', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
        data += chunk;
    });
    resp.on('end', () => {
        document.getElementById("result").innerHTML = data;
    });
})