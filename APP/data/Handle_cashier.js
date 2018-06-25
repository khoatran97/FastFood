
{/* <tr class="clickable" data-toggle="collapse" id="row1" data-target=".row1">
            <td><i class=" fa fa-plus"></i></td>
            <td>data1</td>
          	<td>data2</td>  
            <td>data3</td>
            <td><button type="button" class="fa fa-money"></button></td>
        </tr>
        <tr class="collapse row1">
            <td>- child row</td>
            <td>data</td>
          	<td>data</td>  
            <td>data</td>
        </tr>
        <tr class="collapse row1">
            <td>- child row</td>
            <td>data</td>
          	<td>data</td>  
            <td>data</td>
        </tr> */}


function Hien_Du_lieu(Danh_sach) {

    var Du_lieu = new DOMParser().parseFromString(Danh_sach, "text/xml").documentElement;
    var Danh_sach = Du_lieu.getElementsByTagName("Don_hang");

    var div = [];
    

    for (var i = 0; i < Danh_sach.length; i++) {
        var tr_parent = document.createElement('tr');
        tr_parent.setAttribute('class', 'clickable');
        tr_parent.setAttribute('data-toggle', 'collapse');
        tr_parent.setAttribute('data-target', `.row${i}`);
        console.log(Danh_sach[i].getAttribute('Ma'));
        // con của tr_parent
        //sub 1.1
        var i_1 = document.createElement('i');
        i_1.setAttribute('class', 'fa fa-plus');
        var td_1 = document.createElement('td');
        td_1.appendChild(i_1);
        //sub 1.2
        var td_2 = document.createElement('td');
        td_2.innerHTML = Danh_sach[i].getAttribute('Ma');

        //sub 1.3
        var td_3 = document.createElement('td');
        td_3.innerHTML = Danh_sach[i].getAttribute('Ngay');
        //sub 1.4
        var td_4 = document.createElement('td');
        td_4.innerHTML = Danh_sach[i].getAttribute('Tong_tien');
        //sub 1.5
        var td_5 = document.createElement('td');
        td_5.innerHTML = Danh_sach[i].getAttribute('Tinh_trang');
        //sub 1.6
        var button = document.createElement('button');
        button.setAttribute('id', 'btnPay')
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'fa fa-money fa-2x btn btn-info');
        button.innerHTML = 'Pay$';
        var td_6 = document.createElement('td');
        td_6.setAttribute('type', 'vertical-align:auto;');
        td_6.setAttribute('class', 'p-0');
        td_6.appendChild(button);

        // thiết lập đợt 1
        tr_parent.appendChild(td_1);
        tr_parent.appendChild(td_2);
        tr_parent.appendChild(td_3);
        tr_parent.appendChild(td_4);
        //tr_parent.appendChild(td_5);
        tr_parent.appendChild(td_6);
        if (td_5.innerHTML == 'false')// chỉ hiển thị những hóa đơn có tình trạng là false
        {
            div += (tr_parent.outerHTML);
            for (let index = 0; index < Danh_sach[i].children.length; index++) {
                // sub dữ liệu con , dữ liệu được ẩn
                var sub_tr_parent = document.createElement('tr');
                sub_tr_parent.setAttribute('class', `collapse row${i}`);
                //sub con 1
                var sub_td_1 = document.createElement('td');
                sub_td_1.innerHTML = '&nbsp;';
                //sub con 2
                var sub_td_2 = document.createElement('td');
                sub_td_2.innerHTML = Danh_sach[i].children[index].getAttribute('Ma_so');
                //sub con 3
                var sub_td_3 = document.createElement('td');
                sub_td_3.innerHTML = Danh_sach[i].children[index].getAttribute('Ten');
                //sub con 4
                var sub_td_4 = document.createElement('td');
                sub_td_4.innerHTML = Danh_sach[i].children[index].getAttribute('So_luong');
                //sub con 5
                var sub_td_5 = document.createElement('td');
                sub_td_5.innerHTML = Danh_sach[i].children[index].getAttribute('Don_gia');
                //sub con 6
                var sub_td_6 = document.createElement('td');
                sub_td_6.innerHTML = Danh_sach[i].children[index].getAttribute('Tong');


                // thiết lập đợt 2..*
                // sub_tr_parent.appendChild(sub_td_1);
                sub_tr_parent.appendChild(sub_td_2);
                sub_tr_parent.appendChild(sub_td_3);
                sub_tr_parent.appendChild(sub_td_4);
                sub_tr_parent.appendChild(sub_td_5);
                sub_tr_parent.appendChild(sub_td_6);

                div += (sub_tr_parent.outerHTML);
                // end thiết lập đợt 1


            }
            // end thiết lập đợt 1
        }

    }
    console.log(div);
    document.getElementById("tbody").innerHTML = div;
}
//Xóa dữ liệu 
$('#table').on('click', '#btnDelete', function () {
    var td1 = $(this).closest('tr').find('td:eq(0)').text();
    $(this).closest('tr').remove();
    //  alert(td1);
    //console.log(td1);
});
$('#table').on('click', '#btnPay', function () {
    var td1 = $(this).closest('tr').find('td:eq(1)').text();
    var result =`{"Id":${td1} ,"UserId":"${localStorage.getItem("UserId")}"}`;
    alert('lỗi nằm ở đây... trong file Handle_Cashier.js dòng 128');
    let Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open( "PUT", 'http://localhost:3001' + `/PayBill`,false);
  
    Xu_ly_HTTP.send(JSON.stringify({"Id": td1},{"UserId":`${localStorage.getItem("UserId")}`}));
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
});
