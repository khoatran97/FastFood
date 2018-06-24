// Lấy chức vụ của user hiện tại
var Role = localStorage.getItem("Role");

// Kiểm tra xem có quyền truy câp trang hay không
if (+Role != 1 || Role == null) {
    window.location.href = "home.html";
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
