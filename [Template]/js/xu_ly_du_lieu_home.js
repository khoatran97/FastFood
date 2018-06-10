function Doc_Danh_sach_mat_hang() { 
    
    var Dia_chi_Dich_vu="http://localhost:8888"
    var Tham_so="Ma_so_Xu_ly=Doc_Du_lieu_Khach_Tham_quan"
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
        // tẩng 1 :<div>
        var div1 = document.createElement("div");
        div1.setAttribute("class", "item");
        // con tầng 1 : 1.1 div
        var div2 = document.createElement("div");
        div2.setAttribute("class","media d-block mb-4 text-center site-media site-animate border-0");
        
        //con tầng 1.1 : 1.1.1 iamge
       var ma_so = Danh_sach[i].getAttribute("Ma_so")

        var img = document.createElement("img");
        img.setAttribute("src", "../../Images/"+Danh_sach[i].getAttribute("Ma_so")+".png");
        img.setAttribute("alt", "No Image");
        img.setAttribute("class", "img-fluid");

        //con tầng 1.1 : 1.1.2 div
        var div3 = document.createElement("div");
        div3.setAttribute("class","media-body p-md-5 p-4");

        // con tầng 1.1.2 : 1.1.2.1 h5
        var content1 = document.createElement("h5");
        content1.setAttribute("class","text-primary")
        content1.innerText = Danh_sach[i].getAttribute("Don_gia_ban");

        var content2 = document.createElement("h5");
        content2.setAttribute("class","mt-0 h4")
        content2.innerText = Danh_sach[i].getAttribute("Ten");
        

        // btn
        var button =  document.createElement("p");
        button.setAttribute("class","mb-0")

        var a = document.createElement("a");
        a.setAttribute("href",'javascrip:;')
       
        a.setAttribute("class","btn btn-primary btn-sm ")
        a.innerText ="Order Now!"

        button.appendChild(a);
        //
        div3.appendChild(content1);
        div3.appendChild(content2);
        div3.appendChild(button);
        //
        div2.appendChild(img);
        div2.appendChild(div3);
        //
        div1.appendChild(div2);
        

        // xét điều kiện để đưa dữu liệu vào các trạng thái tương ứng
        if(Danh_sach[i].getAttribute("Loai_hang") == "DOUONGNONG")
        document.getElementById("ds_douongnong").appendChild(div1);
        else if(Danh_sach[i].getAttribute("Loai_hang") == "DOUONGDA")
        document.getElementById("ds_douongda").appendChild(div1);
        else if(Danh_sach[i].getAttribute("Loai_hang") == "DOUONGDAXAY")
        document.getElementById("ds_douongdaxay").appendChild(div1);
        else if(Danh_sach[i].getAttribute("Loai_hang") == "THUCANVAT")
        document.getElementById("ds_thucanvat").appendChild(div1);

    }
}