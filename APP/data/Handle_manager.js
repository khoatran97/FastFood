var Chuoi_du_lieu = null;

function Search_Value() {
    Chuoi_Tra_cuu = txtSearch.value.toUpperCase();
    var Tai_lieu = new DOMParser().parseFromString("<root /", "text/xml");
    //var Tai_lieu = new DOMParser().parseFromString("<root>", "text/xml");
    var Danh_sach_Kq = Tai_lieu.documentElement

    var Danh_sach = Chuoi_du_lieu.getElementsByTagName("Mon");
    for (var i = 0; i < Danh_sach.length; i++) {
        var Mat_hang = Chuoi_du_lieu.getElementsByTagName('Ten')[i].innerHTML;
        console.log(Mat_hang);
        var Ten = Mat_hang.toUpperCase()
        if (Ten.indexOf(Chuoi_Tra_cuu) >= 0)
            Danh_sach_Kq.appendChild(Tai_lieu.importNode(Danh_sach[i], true))
    }
    Hien_Du_lieu(Danh_sach_Kq, false);
}



function Hien_Du_lieu(Danh_sach,check) {
   
    var Du_lieu;

    if (check) // nếu dữ liệu được gọi từ Bus về
    {
        var Du_lieu = new DOMParser().parseFromString(Danh_sach, "text/xml").documentElement;
        if (Chuoi_du_lieu == null)
            Chuoi_du_lieu = Du_lieu;
    } else // Dữ liệu được gọi từ catche web
    {
        Du_lieu = Danh_sach;
    }

    var Danh_sach= Du_lieu.getElementsByTagName("Mon");
   
    var div =[];

    for (var i = 0; i<Danh_sach.length; i++) {
        
        var tr_parent = document.createElement('tr');
        // con của tr_parent
        //sub 1.1
        var image = document.createElement('Image');
        image.setAttribute('src', '../images/' + Du_lieu.getElementsByTagName('Ma_so')[i].innerHTML+".png");
        image.setAttribute('class','pl-5');
        image.setAttribute('style','height:200px');
        var td_1 = document.createElement('td');
        td_1.appendChild(image);
        //sub 1.2
        var td_2 = document.createElement('td');
        td_2.innerHTML = Du_lieu.getElementsByTagName('Ma_so')[i].innerHTML;

        //sub 1.3
        var td_3 = document.createElement('td');
        td_3.innerHTML = Du_lieu.getElementsByTagName('Ten')[i].innerHTML;
        //sub 1.4
        var td_4 = document.createElement('td');
        td_4.innerHTML = Du_lieu.getElementsByTagName('Don_gia')[i].innerHTML;
        //sub 1.5
        var td_5 = document.createElement('td');
        td_5.innerHTML = Du_lieu.getElementsByTagName('Tinh_trang')[i].innerHTML;
        //sub 1.6
        var button1 = document.createElement('button');
        button1.setAttribute('id', 'btnStop')
        button1.setAttribute('type', 'button');
        button1.setAttribute('class', ' btn btn-danger');
        button1.innerHTML = 'Stop';
        var td_6 = document.createElement('td');
        td_6.setAttribute('class', 'p-0');
        td_6.appendChild(button1);
        //sub 1.7
        var button2 = document.createElement('button');
        button2.setAttribute('id', 'btnEdit')
        button2.setAttribute('type', 'button');
        button2.setAttribute('class', ' btn btn-info');
        button2.innerHTML = 'Edit';
        var td_7 = document.createElement('td');
        td_7.setAttribute('class', 'p-0');
        td_7.appendChild(button2);

        // thiết lập đợt 1
        tr_parent.appendChild(td_1);
        tr_parent.appendChild(td_2);
        tr_parent.appendChild(td_3);
        tr_parent.appendChild(td_4);
       // tr_parent.appendChild(td_5);
        tr_parent.appendChild(td_6);
        tr_parent.appendChild(td_7);
        if (td_5.innerHTML == 'true')// chỉ hiển thị những hóa đơn có tình trạng là true : còn cung cấp
        {
            div += (tr_parent.outerHTML);
        }
    }
    document.getElementById("tbody").innerHTML = div;
}

// stop không bán hàng nữa
$('#table').on('click','#btnStop',function(){
var td_id = $(this).closest('tr').find('td:eq(1)').text();
var td_price = $(this).closest('tr').find('td:eq(3)').text();

var result =`{"Id":${td_id} ,"Price":${td_price},"Status": false,"UserId":"${localStorage.getItem("UserId")}"}`;
let Xu_ly_HTTP = new XMLHttpRequest();
Xu_ly_HTTP.open("POST" , 'http://localhost:3001' + `/UpdateMenu`,false);

Xu_ly_HTTP.send(result);
let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;

if (Chuoi_Tra_ve == "Done") {
    alert("Update successfully");
    window.location.reload();
}
else {
    alert("Update unsuccessfully");
}
});

// edit  hàng thay đổi giá tiền
$('#table').on('click','#btnEdit',function(){

    var td_id = $(this).closest('tr').find('td:eq(1)').text();
    var td_price = $(this).closest('tr').find('td:eq(3)').text();
    var change = prompt(`Giá cũ : ${td_price} \nGiá mới : ` ,'');
   
    if(!$.isNumeric(change))
        alert('Không nhận chuỗi kí tự');
   
        var result =`{"Id":${td_id} ,"Price":${change},"Status": true,"UserId":"${localStorage.getItem("UserId")}"}`;
        let Xu_ly_HTTP = new XMLHttpRequest();
        Xu_ly_HTTP.open("POST" , 'http://localhost:3001' + `/UpdateMenu`,false);
    
        Xu_ly_HTTP.send(result);
        let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
    
        if (Chuoi_Tra_ve == "Done") {
            alert("Update successfully");
            window.location.reload();
        }
        else {
            alert("Update unsuccessfully");
        }
   });