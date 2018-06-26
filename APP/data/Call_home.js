var role = getRole();
switch (role) {
    case 1:
        window.location.href = "../UI/waiter.html";
        break;
    case 2:
        window.location.href = "../UI/cashier.html";
        break;
    case 3:
        window.location.href = "../UI/manager.html";
        break;
}

function LoadStore() {
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("POST", 'http://localhost:3001' + `/LoadStore`, false);

    Xu_ly_HTTP.send(JSON.stringify({"UserId": `${window.UserId}`}));
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
    // Display in Index
}

function LoadMenu() {
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open( "POST", 'http://localhost:3001' + `/LoadMenu`,false);

    Xu_ly_HTTP.send(JSON.stringify({"UserId": `${window.UserId}`}));

    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
    console.log('ket qua Guest ::' + Chuoi_Tra_ve);
    return Chuoi_Tra_ve;
}
