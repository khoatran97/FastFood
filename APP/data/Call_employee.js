

let Xu_ly_HTTP = new XMLHttpRequest();

function LoadStore() {
    Xu_ly_HTTP.open("GET", 'http://localhost:3001' + `/LoadStore`, false);
    Xu_ly_HTTP.send();
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
    // Display in Index
}

function LoadMenuInEmployee(value) {
    Xu_ly_HTTP.open( "GET", 'http://localhost:3001' + `/LoadMenu2`,false);

   //Xu_ly_HTTP.setRequestHeader('role',value);

    Xu_ly_HTTP.send("");
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
   
    return Chuoi_Tra_ve;
}

