



function LoadStore() {
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("GET", 'http://localhost:3001' + `/LoadStore`, false);
    Xu_ly_HTTP.send();
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
    // Display in Index
}

function LoadMenuInEmployee(value) {
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open( "GET", 'http://localhost:3001' + `/LoadMenu`,false);

    console.log(client.Client.UserId);
    var str = `{"UserId": ${client.Client.UserId}}`;
    var json = JSON.parse(str);

    Xu_ly_HTTP.send(json);
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;

    console.log(Chuoi_Tra_ve);
    return Chuoi_Tra_ve;
}

