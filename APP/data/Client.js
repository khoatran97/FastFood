// Biến này sẽ được gửi kèm các request từ APP đến BUS (đều ở dạng JSON) để BUS kiểm tra session
//window.UserId

// Biến này dùng để kiểm tra xem user có quyền truy cập trang hay không (Kiểm tra mỗi khi load 1 trang)
//window.Role

function getRole() {
    let Xu_ly_HTTP = new XMLHttpRequest();
    // Tạo chuỗi JSON
    var str = `{"UserId": "${localStorage.getItem("UserId")}"}`;

    // Gửi request
    Xu_ly_HTTP.open("POST", 'http://localhost:3001' + `/Session`, false);
    Xu_ly_HTTP.send(str);
    
    // Trả về chức vụ
    // 1: Phục vụ
    // 2: Thu ngân
    // 3: Quản lý
    return +(Xu_ly_HTTP.responseText);
}
//<li class="nav-item"> <a class="btn btn-secondary btn-block mt-3" id="btnLogin"  href="login.html" >Đăng Nhập</a></li>
function LoadUserId(){
    var hello =`Hello,  ${localStorage.getItem('UserId')}`;
   if(localStorage.getItem('UserId') != null)
   {
    // hidden login
    document.getElementById('Parent_Login').setAttribute('class',' nav-item d-none');
    // show logout
    document.getElementById('Parent_Logout').setAttribute('class','nav-item');
    document.getElementById('btnLogout').innerHTML = hello;
    
   }
   else
   {
       // show login
    document.getElementById('Parent_Login').setAttribute('class',' nav-item ');
    // hidden logout
    document.getElementById('Parent_Logout').setAttribute('class','nav-item d-none');
    
   }
  
}




function LogIn() {

    var username = document.getElementById('Id').value;
    var password = document.getElementById('Password').value;

    let Xu_ly_HTTP = new XMLHttpRequest();
    // Tạo chuỗi JSON
    var str = `{"Id": "${username}", "Password": "${password}"}`;

    // Gửi request
    Xu_ly_HTTP.open("POST", 'http://localhost:3001' + `/LogIn`, false);
    Xu_ly_HTTP.send(str);
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
    if (Chuoi_Tra_ve == "Done") {
       
        // Lưu lại thông tin
        localStorage.setItem("UserId", `${username}`);
        localStorage.setItem("Role", `${this.getRole()}`);
        
        var role = localStorage.getItem("Role");
        // Chuyển trang
        switch (+(role)) {
            case 1:
                // Chuyển về trang nhân viên phục vụ
                window.location.href='waiter.html'
                //document.location.hash = 'home.html';
                break;
            case 2:
                // Chuyển về trang nhân viên thu ngân
                window.location.href ='cashier.html'
                break;
            case 3:
                // Chuyển về trang quản lý
                window.location.href = "manager.html"
                break;
        }
    }
    else {
        alert('dang nhap sai ');
    }
}

function LogOut() {
    
    if (confirm('Are you sure to logout?')) {
        let Xu_ly_HTTP = new XMLHttpRequest();
    // Tạo chuỗi JSON
    // Gửi request
    Xu_ly_HTTP.open("POST", 'http://localhost:3001' + `/LogOut`, false);
    Xu_ly_HTTP.send( JSON.stringify({"UserId": `${localStorage.getItem('UserId')}`}));
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;

    if (Chuoi_Tra_ve == "Done") {
        // Xoá thông tin -> trả về trạng thái khách
        localStorage.clear();
        LoadUserId();
        window.location.reload();
    }

    } else {
        // Do nothing!
    }

    
}