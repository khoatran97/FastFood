
var left =false;
function Hien_Du_lieu(Danh_sach) {
   
    console.log(Danh_sạch);
    var Du_lieu = new DOMParser().parseFromString(Danh_sach, "text/xml").documentElement;
    var Danh_sach= Du_lieu.getElementsByTagName("Mon");
   

    for (var i = 0; i<Danh_sach.length; i++) {
        // tẩng 1 :<div>
        var div1  =document.createElement('div');
        div1.setAttribute('class','media menu-item');

        // con tầng 1 : 1.1 img
       // console.log(`${Danh_sach[i].innerHTML}`);
       var aa = Du_lieu.getElementsByTagName('Ten');
        var img = document.createElement("img");
        img.setAttribute("class", "mr-3");
        img.setAttribute("src", "../images/"+Du_lieu.getElementsByTagName('Ma_so')[i].innerHTML+".png");
        img.setAttribute("alt", "No Image");
        
        //con tầng 1 : 1.2 div
        var div2  =document.createElement('div');
        div2.setAttribute('class','media-body');

        // con tầng  1..2 : 1.2.1 h5
        var h5 = document.createElement('h5');
        h5.setAttribute('class','mt-0');
        h5.innerText = Du_lieu.getElementsByTagName('Ten')[i].innerHTML;
        // con tầng 1.2  : 1.2.2 p
        //tình trạng còn hàng hay không

        //con tầng 1.2 : 1.2.3 h6
        var h6 = document.createElement('h6');
        h6.setAttribute('class','text-primary menu-price');
        h6.innerText = 'Price :  ' + parseInt(Du_lieu.getElementsByTagName('Don_gia')[i].innerHTML ).toLocaleString()  ;


       
        div2.appendChild(h5);
        div2.appendChild(h6);
        //
        div1.appendChild(img);
        div1.appendChild(div2);
        

        // xét điều kiện để đưa dữu liệu vào các trạng thái tương ứng
       if(!left)
       {
        document.getElementById("sanphamleft").appendChild(div1);
        left = true;
       }
       else
       {
        document.getElementById("sanphamright").appendChild(div1);
        left = false;
       }
        
       
    }
}