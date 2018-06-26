
// Lấy chức vụ của user hiện tại
var Role = getRole();
var UserId = localStorage.getItem('UserId');
// Kiểm tra xem có quyền truy câp trang hay không
// số 2 này tương ứng với role == 2 của user trong CSDL
if (+Role != 2 || Role == null) {
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
//LoadBill, PayBill, LogOut

function LoadBill(){
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open( "POST", 'http://localhost:3001' + `/LoadBill`,false);
  
    Xu_ly_HTTP.send(JSON.stringify({"UserId": `${UserId}`},{"Role":`${Role}`}));
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
    console.log('ket qua LoadBill ::' + Chuoi_Tra_ve);
    return Chuoi_Tra_ve;

}


