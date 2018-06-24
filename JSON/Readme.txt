# Chuyển tất cả phương thức GET thành POST

# Luôn gửi UserId kèm trong chuỗi Json được gửi đi (đã demo cách lấy UserId)

# Kiểm tra Role mỗi khi load 1 trang xem có quyền truy cập trang đó hay không
	* Nếu không được truy cập thì tuỳ Role mà đẩy về trang tương ứng
		- null, undefined, 0 -> home
		- 1 -> waiter
		- 2 -> cashier
		- 3 -> manager
# Cấu trúc Json cần gửi ứng với mỗi chức năng được thể hiện trong các ảnh cùng thư mục này
# Quyền hạn:
	- Khách (Role = 0): LoadMenu, LoadStore, LogIn
	- Phục vụ (Role = 1): LoadMenu, LoadStore, CreateBill, LogOut
	- Thu ngân (Role = 2): LoadMenu, LoadStore, LoadBill, PayBill, LogOut
	- Quản lý (Role = 3): LoadMenu, LoadStore, LoadBill, InsertMenu, UpdateMenu, Logout
	* Chỉ cần gọi LoadMenu ở BUS sẽ tự xử lý để trả về dữ liệu tướng ứng với Role (0, 1: Lấy thông tin cơ bản; 2, 3: Lấy hết thông tin, bao gồm lịch sử được mua)

# Các kết quả được trả về:
	- Done: Hoàn thành thao tác
	- Fail: Thất bại
	- No Permission: Không có quyền thực hiện thao tác (kiểm tra ở BUS, khác với kiểm ở APP_ở dấu # thứ 3)