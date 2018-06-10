
// Tivi



var Tham_so = document.URL.split("?")
// xử lý tham số chuyền vào
console.log('đã vào được xulyxu kien');
var str = Tham_so[1]
console.log(str);

var arr = str.split("/");
var src_img = arr[0];
var Ma_so = arr[1];
console.log(src_img);
console.log(Ma_so);

var Tivi = Lay_Thong_tin_Tivi(Ma_so)
var Ten = Tivi.getAttribute('Ten')
var Giaban = Tivi.getAttribute('Don_gia_Ban');

var div1 = document.createElement('div')
div1.id='name';

var div2 = document.createElement('div')
div2.setAttribute('class','picture');
div2.setAttribute('id','oke');

var image = document.createElement('img')
image.setAttribute('src',`${src_img}/${Ma_so}.png`);
image.setAttribute('alt','Khong tim thay anh');
image.setAttribute('style',`width:500px;height:400px;`);
div2.appendChild(image);


var div3 = document.createElement('div')
div3.setAttribute('class','price_sale');
div3.innerHTML = '<h2>'+ Ten+ '</h2>';
div3.innerHTML +=  '<p> Giá bán : '+ Giaban.toLocaleString('vi') +' đ' +'</p>';
                
div1.appendChild(div2);       
div1.appendChild(div3);
document.getElementById("listview").innerHTML = div1.innerHTML;