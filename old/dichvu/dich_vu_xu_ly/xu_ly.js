// gọi đến thao tác đọc dữ liệu
var File = require("fs")
var DOMParser = require("xmldom").DOMParser
var XMLSerializer = require("xmldom").XMLSerializer
 
class Xu_ly_Luu_tru{
  Doc_Du_lieu_Khach_Tham_quan(){
    var Duong_dan = "../du_lieu_luu_tru/Data.xml"
    var XML = File.readFileSync(Duong_dan,"UTF-8")
    var Du_lieu = new DOMParser().parseFromString(XML, "text/xml")

    var Mat_hang = Du_lieu.getElementsByTagName("Hang")

    

    var Mat_hang_Khach_tham_quan = Du_lieu.createElement("Danh_sach_mat_hang")
    for (var i = 0; i<Mat_hang.length; i++) {
      var Mat_hang_rut_gon = Du_lieu.createElement("Hang")
      Mat_hang_rut_gon.setAttribute("Ma_so", Mat_hang[i].getAttribute("Ma_so"))
      Mat_hang_rut_gon.setAttribute("Ten", Mat_hang[i].getAttribute("Ten"))
      Mat_hang_rut_gon.setAttribute("Don_gia_ban", Mat_hang[i].getAttribute("Don_gia_ban"))
      Mat_hang_rut_gon.setAttribute("Trangthai_conhang", Mat_hang[i].getAttribute("Trangthai_conhang"))

      // chạy xuống thằng con lấy lên loại sản 
      var Nhom_hang = Du_lieu.getElementsByTagName("Nhom_hang")
      Mat_hang_rut_gon.setAttribute("Loai_hang",Nhom_hang[i].getAttribute("Ma_so"))


      Mat_hang_Khach_tham_quan.appendChild(Mat_hang_rut_gon)
    }
    return Mat_hang_Khach_tham_quan
  }

  Doc_Du_lieu_Quan_ly(){
    var Duong_dan = "../du_lieu_luu_tru/Data.xml"
    var XML = File.readFileSync(Duong_dan,"UTF-8")
    var Du_lieu = new DOMParser().parseFromString(XML, "text/xml")

    var Mat_hang = Du_lieu.getElementsByTagName("Hang")

    

    var Mat_hang_Khach_tham_quan = Du_lieu.createElement("Danh_sach_mat_hang")
    for (var i = 0; i<Mat_hang.length; i++) {
      var Mat_hang_rut_gon = Du_lieu.createElement("Hang")
      Mat_hang_rut_gon.setAttribute("Ma_so", Mat_hang[i].getAttribute("Ma_so"))
      Mat_hang_rut_gon.setAttribute("Ten", Mat_hang[i].getAttribute("Ten"))
      Mat_hang_rut_gon.setAttribute("Don_gia_ban", Mat_hang[i].getAttribute("Don_gia_ban"))

      // chạy xuống thằng con lấy lên loại sản 
      
      var Subvalue1 = Du_lieu.getElementsByTagName('Danh_sach_ban_hang');
      var Subvalue2 = Du_lieu.getElementsByTagName('Danh_sach_nhap_hang');
      // biến
      var bien1 = Tinh_Tong_So_Luong(Subvalue1[i],'Ban_hang'); // Tổng số lượng bán và tổng tiền bán của Bán hàng
      var bien2 = Tinh_Tong_So_Luong(Subvalue2[i],'Nhap_hang');// Tổng số lượng bán và tổng tiền bán của Nhập hàng

      Mat_hang_rut_gon.setAttribute("Soluongnhap", bien2)
      Mat_hang_rut_gon.setAttribute("Soluongton", bien2 - bien1)
      Mat_hang_rut_gon.setAttribute("Soluongban", bien1)
      console.log('nhap hang',bien2);
      console.log('nhap ton',bien2 - bien1);
      console.log('nhap ban',bien1);
      Mat_hang_Khach_tham_quan.appendChild(Mat_hang_rut_gon)
    }
    return Mat_hang_Khach_tham_quan
  }


 
}
//=============================
var Xuly = new Xu_ly_Luu_tru()
module.exports = Xuly

// tính số lượng bán của 1 loại sản phẩm 
function Tinh_Tong_So_Luong(Danh_sach,str)
{
  var sl = 0;
  var Danh_sach_Ban_hang
  if( str == 'Ban_hang')
    Danh_sach_Ban_hang = Danh_sach.getElementsByTagName('Ban_hang');
  else
  Danh_sach_Ban_hang = Danh_sach.getElementsByTagName('Nhap_hang');
    for(var i = 0 ;i<Danh_sach_Ban_hang.length;i++)
    {
      sl += parseInt(Danh_sach_Ban_hang[i].getAttribute('So_luong'));
    }
  return sl ;
}

// // tính số lượng nhập của 1 loại sản phẩm // trả về 2 giá trị: số lượng và giá tiền
// function Tinh_Tong_Nhap_Hang(Danh_sach)
// {
//   var sl =0;
//   var sum = 0;
//   var Danh_sach_Nhap_hang = Danh_sach.getElementsByTagName("Nhap_hang");
//   for( var i = 0 ; i<Danh_sach_Nhap_hang.length;i++)
//   {
//     sl += parseInt(Danh_sach_Nhap_hang[i].getAttribute('So_luong'));
//     sum += parseInt(Danh_sach_Nhap_hang[i].getAttribute('Tien'));

//   }
//   return sl +'|'+sum;
// }
