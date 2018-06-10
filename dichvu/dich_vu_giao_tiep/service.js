var http = require("http")
var Luu_tru=require("../dich_vu_xu_ly/xu_ly.js")
var Port = 8888
var Xu_ly_Tham_so = require('querystring')
var DOMParser=require("xmldom").DOMParser
var XMLSerializer=require("xmldom").XMLSerializer

var Dich_vu = http.createServer((Yeu_cau, Tra_loi) =>
{
  var Chuoi_Nhan = "" 
  var Dia_chi_Xu_ly = Yeu_cau.url.replace("/","")
  var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?",""))
  var Ma_so_Xu_ly=Tham_so.Ma_so_Xu_ly
  var Chuoi_Kq=""
  Yeu_cau.on('data', (chunk) => {Chuoi_Nhan += chunk})
  Yeu_cau.on('end', () => {
    if (Ma_so_Xu_ly == "Doc_Du_lieu_Khach_Tham_quan"){
      Chuoi_Kq=new XMLSerializer().serializeToString(Luu_tru.Doc_Du_lieu_Khach_Tham_quan()) 
    }
    else if (Ma_so_Xu_ly == "Doc_Du_lieu_Quan_ly"){
      Chuoi_Kq=new XMLSerializer().serializeToString(Luu_tru.Doc_Du_lieu_Quan_ly()) 
    }
    
    else if (Ma_so_Xu_ly="..."){
      Chuoi_Kq="San sang ket noi"
    }
    else {
      Chuoi_Kq="Khong co Ma xu ly "+  Ma_so_Xu_ly + " nay"
    }

    Tra_loi.setHeader("Access-Control-Allow-Origin", '*')
    Tra_loi.end(Chuoi_Kq); 
  })
})
Dich_vu.listen(Port);