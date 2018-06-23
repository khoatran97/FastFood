

function LoadStore() {
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("GET", 'http://localhost:3001' + `/LoadStore`, false);

    var str = `{"UserId": "${window.UserId}"}`;
    var json = JSON.parse(str);

    Xu_ly_HTTP.send(str);
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
    // Display in Index
}

function LoadMenuInGuest(value) {
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open( "GET", 'http://localhost:3001' + `/LoadMenu`,false);

    var str = `{"UserId": "${window.UserId}"}`;
    var json = JSON.parse(str);

    Xu_ly_HTTP.send(json);
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
    console.log('ket qua Guest ::' + Chuoi_Tra_ve);
    return Chuoi_Tra_ve;
}
