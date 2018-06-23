
var Chuoi_du_lieu = null;

function Search_Value()
{
    Chuoi_Tra_cuu = txtSearch.value.toUpperCase();
    var Tai_lieu = new DOMParser().parseFromString("<root /", "text/xml");
    //var Tai_lieu = new DOMParser().parseFromString("<root>", "text/xml");
    var Danh_sach_Kq = Tai_lieu.documentElement
    
    var Danh_sach = Chuoi_du_lieu.getElementsByTagName("Mon");
    for (var i = 0; i < Danh_sach.length; i++) {
      var Mat_hang = Danh_sach[i].getAttribute("Ten");
        console.log(Mat_hang);
      var Ten = Mat_hang.toUpperCase()
      if (Ten.indexOf(Chuoi_Tra_cuu) >= 0) 
        Danh_sach_Kq.appendChild(Tai_lieu.importNode(Danh_sach[i], true))
    }
    Hien_Du_lieu(Danh_sach_Kq,false);
}

function Hien_Du_lieu(Danh_sach, check) {
    var Du_lieu;
    
    if(check)// nếu dữ liệu được gọi từ Bus về
    {
        Du_lieu = new DOMParser().parseFromString(Danh_sach, "text/xml").documentElement;
        if(Chuoi_du_lieu == null)
             Chuoi_du_lieu = Du_lieu;
    }
   else// Dữ liệu được gọi từ catche web
   {
        Du_lieu = Danh_sach;
   }
    var Danh_sach= Du_lieu.getElementsByTagName("Mon");
   
    var div = document.createElement('div');

    for (var i = 0; i<Danh_sach.length; i++) {
        // tẩng 1 :<div>
        var div1  =document.createElement('div');
        div1.setAttribute('class','media menu-item btn btn-light');
        div1.setAttribute('id','btnItem');

        // con tầng 1 : 1.1 img
       // console.log(`${Danh_sach[i].innerHTML}`);
      // var aa = Du_lieu.getElementsByTagName('Ten');
       //console.log(`_____________________________`);
      //  console.log(`${aa[i].innerHTML}`);
        var img = document.createElement("img");
        img.setAttribute("class", "mr-3");
        img.setAttribute("src", "../images/"+Danh_sach[i].getAttribute('Ma_so')+".png");
        img.setAttribute("alt", "No Image");
        
        //con tầng 1 : 1.2 div
        var div2  =document.createElement('div');
        div2.setAttribute('class','media-body');

        // con tầng  1..2 : 1.2.1 h5
        var h5 = document.createElement('h5');
        h5.setAttribute('class','mt-0');
        h5.innerText = Danh_sach[i].getAttribute('Ten');

        console.log(Danh_sach[i].getAttribute('Ten'));
        // con tầng 1.2  : 1.2.2 p
        //tình trạng còn hàng hay không

        //con tầng 1.2 : 1.2.3 h6
        var h6 = document.createElement('h6');
        h6.setAttribute('class','text-primary menu-price');
        h6.innerText = 'Price: ' + parseInt(Danh_sach[i].getAttribute('Don_gia') ).toLocaleString()  ;


       
        div2.appendChild(h5);
        div2.appendChild(h6);
        //
        div1.appendChild(img);
        div1.appendChild(div2);
        
       // var a = document.createElement('a');
        //a.setAttribute('href','javascript:;');
       // a.appendChild(div1);
        var max_show = 5;
        if (i <max_show)
         div.appendChild(div1);
        
        
       
    }
    document.getElementById("sanpham").innerHTML = div.outerHTML;
}


// Xự kiển click thẻ

$("#section-contact").click(function(){
    alert("HTML: ");
});

//Xóa tất cả dữ liệu 
$('#btnDeleteAll').on('click', function(){
    var gtable = document.getElementById('table');
    var gbody = gtable.getElementsByTagName('tbody');
     while (gbody[0].childElementCount !=0) {
        gbody[0].firstChild.remove();
     }
});

// Save dữ liệu
//Xóa tất cả dữ liệu 
$('#btnSave').on('click', function(){
    var gtable = document.getElementById('table');
    var gbody = gtable.getElementsByTagName('tbody');
    var chuoi_nhung_ket_qua =[] ;
   
    console.log(gbody[0].childNodes);
     if (confirm('Are you sure you want to save this thing into the database?')) {
        gbody[0].childNodes.forEach(element => {
            var chuoi_ket_qua ='';
            chuoi_ket_qua +=element.childNodes[0].innerHTML ;
            chuoi_ket_qua +='|' ;
            chuoi_ket_qua +=element.childNodes[1].childNodes[0].value ;
            chuoi_ket_qua +='|' ;
            chuoi_ket_qua +=element.childNodes[2].innerHTML ;
            chuoi_ket_qua +='\n';
            chuoi_nhung_ket_qua.push(chuoi_ket_qua);
        });

        alert(chuoi_nhung_ket_qua);
    } else {
        // Do nothing!
    }
});





//Xóa dữ liệu 
$('#table').on('click','#btnDelete', function(){
    var td1 = $(this).closest('tr').find('td:eq(0)').text();
    $(this).closest('tr').remove();
     //  alert(td1);
    //console.log(td1);
});

// Load dữ liệu vào bảng
$('#sanpham').on('click', '#btnItem', function(){
	// alert('msg');
	// var tr = $(this).parent().parent();
	var xx ;
    var td1 = $(this).closest('div').closest('div').closest('div').find('h5').text();
    var td2 = $(this).closest('div').closest('div').closest('div').find('h6').text();
    td2 = td2.split(" ")[1];

    // load dữ liệu vào trong table
    var gtable = document.getElementById('table');
    var gbody = gtable.getElementsByTagName('tbody');
    
    var row  = gbody[0].insertRow(gbody[0].lenght);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = td1;
    cell2.innerHTML = '<input type="number" name="quantity" min="1" style="width:50px;" value="1" >';
    cell3.innerHTML = td2;
    cell4.innerHTML = '<button type="button" class="btn btn-danger p-1 pr-3 pl-3" id="btnDelete" ><i  class="fa fa-times mr-auto" style="margin-right:10px;"></i></button>';
    

});
