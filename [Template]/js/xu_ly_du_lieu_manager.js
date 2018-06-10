function Doc_Danh_sach_mat_hang() { 
    
    var Dia_chi_Dich_vu="http://localhost:8888"
    var Tham_so="Ma_so_Xu_ly=Doc_Du_lieu_Quan_ly"
    var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}?${Tham_so}`
    var Xu_ly_http = new XMLHttpRequest()
    Xu_ly_http.open("GET",  Dia_chi_Xu_ly, false)
    Xu_ly_http.send("")
    var Chuoi_XML = Xu_ly_http.responseText
    var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement
    var Danh_sach_mat_hang=Du_lieu.getElementsByTagName("Hang")
    //console.log(Danh_sach_mat_hang)
    return Danh_sach_mat_hang
}




function Hien_Du_lieu(Danh_sach) {
    console.log(Danh_sach)
    for (var i = 0; i<Danh_sach.length; i++) {
        
        var parent = document.createElement('tr');
        // stt
        var el1 = document.createElement('td');
        el1.innerText = `${i+1}`;
        // id
        var el2 = document.createElement('td');
        el2.innerText = Danh_sach[i].getAttribute("Ma_so");
        // img 
        var el3 = document.createElement('img');
        el3.setAttribute("src", "../../Images/"+Danh_sach[i].getAttribute("Ma_so")+".png");
        el3.setAttribute("alt", "No Image");
        el3.setAttribute("height", "100px");
        el3.setAttribute("width", "100px");
        // name
        var el4 =document.createElement('td');
        el4.innerText = Danh_sach[i].getAttribute("Ten");
        // quantity purchase
        var el5 =document.createElement('td');
        el5.innerText = Danh_sach[i].getAttribute("Soluongnhap");
        // value sold
        var el6 =document.createElement('td');
        el6.innerText = `${ (Danh_sach[i].getAttribute("Don_gia_ban") *1).toLocaleString('vi')}`;
        // value in stock
        var el7 =document.createElement('td');
        el7.innerText = `${ (Danh_sach[i].getAttribute("Don_gia_ban") *  Danh_sach[i].getAttribute("Soluongton")).toLocaleString('vi')}`;
        // quantity stock
        var el8 =document.createElement('td');
        el8.innerText = Danh_sach[i].getAttribute("Soluongton") ;
        // quantity sold
        var el9 =document.createElement('td');
        el9.innerText = Danh_sach[i].getAttribute("Soluongban") ;

        parent.appendChild(el1);
        parent.appendChild(el2);
        parent.appendChild(el3);
        parent.appendChild(el4);
        parent.appendChild(el5);
        parent.appendChild(el6);
        parent.appendChild(el7);
        parent.appendChild(el8);
        parent.appendChild(el9);

        document.getElementById("customers").appendChild(parent);

    }
}


