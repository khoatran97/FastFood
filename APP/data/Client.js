class Client {
    constructor() {
        this.UserId = "";
        this.Role = 0;
    };

    getRole() {
        let Xu_ly_HTTP = new XMLHttpRequest();
        // Tạo chuỗi JSON
        var str = `{"UserId": ${this.UserId}}`;
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

    LogIn(username, password) {
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
            this.UserId = username;
            this.Role = this.getRole();

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

    LogOut() {
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
            this.UserId = "";
            this.Role = 0;
        }
    }
}

module.exports.Client = new Client();