let Xu_ly_HTTP = new XMLHttpRequest();
Xu_ly_HTTP.open("GET", 'http://localhost:3001'+`/LoadStore`, false);
Xu_ly_HTTP.send();
let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;