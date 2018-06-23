// Biến này sẽ được gửi kèm các request từ APP đến BUS (đều ở dạng JSON) để BUS kiểm tra session
//window.UserId

// Biến này dùng để kiểm tra xem user có quyền truy cập trang hay không (Kiểm tra mỗi khi load 1 trang)
//window.Role

function getRole() {
    let Xu_ly_HTTP = new XMLHttpRequest();
    // Tạo chuỗi JSON
    var str = `{"UserId": ${window.UserId}}`;
    var json = JSON.parse(str);

    // Gửi request
    Xu_ly_HTTP.open("GET", 'http://localhost:3001' + `/Session`, false);
    Xu_ly_HTTP.send(json);
    
    // Trả về chức vụ
    // 1: Phục vụ
    // 2: Thu ngân
    // 3: Quản lý
    return +(Xu_ly_HTTP.responseText);
}

function LogIn(username, password) {
    let Xu_ly_HTTP = new XMLHttpRequest();
    // Tạo chuỗi JSON
    var str = `{"Id": ${username}, "Password": ${password}}`;
    var json = JSON.parse(str);

    // Gửi request
    Xu_ly_HTTP.open("POST", 'http://localhost:3001' + `/LogIn`, false);
    Xu_ly_HTTP.send(json);
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;

    if (Chuoi_Tra_ve == "Done") {
        // Lưu lại thông tin
        window.UserId = username;
        window.Role = this.getRole();

        // Chuyển trang
        switch (this.Role) {
            case 1:
                // Chuyển về trang nhân viên phục vụ
                break;
            case 2:
                // Chuyển về trang nhân viên thu ngân
                break;
            case 3:
                // Chuyển về trang quản lý
                break;
        }
    }
    else {
        //
    }
}

function LogOut() {
    let Xu_ly_HTTP = new XMLHttpRequest();
    // Tạo chuỗi JSON
    var str = `{"UserId": ${this.UserId}}`;
    var json = JSON.parse(str);

    // Gửi request
    Xu_ly_HTTP.open("POST", 'http://localhost:3001' + `/LogOut`, false);
    Xu_ly_HTTP.send(json);
    let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;

    if (Chuoi_Tra_ve == "Done") {
        // Xoá thông tin -> trả về trạng thái khách
        window.UserId = "";
        window.Role = 0;
    }
}