// Dữ liệu khởi tạo danh sách đơn đặt vé
let bookings = [
    { 
      bookingCode: "CIN-001", 
      customerName: "Nguyễn Văn An",
      movieTitle: "Ánh Trăng Cuối Phố", 
      ticketCount: 2,
      pricePerTicket: 90000, 
      totalAmount: 194400 
    },
    { 
      bookingCode: "CIN-002", 
      customerName: "Trần Thị Bình",
      movieTitle: "Biệt Đội Sao Băng", 
      ticketCount: 4,
      pricePerTicket: 90000, 
      totalAmount: 349920 
    },
    { 
      bookingCode: "CIN-003", 
      customerName: "Lê Minh Châu",
      movieTitle: "Mùa Hè Rực Lửa", 
      ticketCount: 6,
      pricePerTicket: 110000, 
      totalAmount: 641520 
    }
  ];
  
  // 1. Hiển thị danh sách đơn đặt vé
  function displayBookings() {
    if (bookings.length === 0) {
      console.log("Danh sách đơn đặt vé trống");
      alert("Danh sách đơn đặt vé trống");
      return;
    }
  
    let totalRevenue = 0;
    console.log("--- DANH SÁCH ĐƠN ĐẶT VÉ ---");
  
    for (let i = 0; i < bookings.length; i++) {
      let item = bookings[i];
      totalRevenue += item.totalAmount;
      console.log(
        (i + 1) + ". " + item.bookingCode + " - " + item.customerName + " - " + item.movieTitle + "\n" +
        "   SL: " + item.ticketCount + " | Giá: " + item.pricePerTicket + " | Tổng TT: " + item.totalAmount
      );
    }
    console.log("Tổng: " + bookings.length + " đơn đặt vé – Doanh thu: " + totalRevenue);
    alert("Đã hiển thị danh sách trong Console!");
  }
  
  // 2. Thêm đơn đặt vé mới
  function handleCreateBooking() {
    // Nhập mã đặt vé
    let code = prompt("Nhập mã đặt vé (Ví dụ: CIN-004):");
    if (code === null) return;
    code = code.trim().toUpperCase();
  
    // Kiểm tra mã đơn giản
    if (code === "" || code.length < 6 || !code.startsWith("CIN-")) {
      alert("Mã đặt vé không hợp lệ! Phải bắt đầu bằng 'CIN-' và có ít nhất 6 ký tự.");
      return;
    }
  
    // Kiểm tra trùng mã
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].bookingCode === code) {
        alert("Mã đặt vé đã tồn tại!");
        return;
      }
    }
  
    // Nhập tên khách hàng
    let customerName = prompt("Nhập tên khách hàng:");
    if (customerName === null) return;
    customerName = customerName.trim();
    if (customerName === "") {
      alert("Tên khách hàng không được để trống!");
      return;
    }
  
    // Nhập tên phim
    let movieTitle = prompt("Nhập tên phim:");
    if (movieTitle === null) return;
    movieTitle = movieTitle.trim();
    if (movieTitle === "") {
      alert("Tên phim không được để trống!");
      return;
    }
  
    // Nhập số vé
    let ticketCount = prompt("Nhập số lượng vé:");
    if (ticketCount === null) return;
    ticketCount = Number(ticketCount);
    if (isNaN(ticketCount) || ticketCount <= 0) {
      alert("Số vé phải là số nguyên lớn hơn 0!");
      return;
    }
  
    // Nhập giá vé
    let pricePerTicket = prompt("Nhập giá mỗi vé:");
    if (pricePerTicket === null) return;
    pricePerTicket = Number(pricePerTicket);
    if (isNaN(pricePerTicket) || pricePerTicket <= 0) {
      alert("Giá vé phải là số lớn hơn 0!");
      return;
    }
  
    // Tính tiền
    let baseCost = ticketCount * pricePerTicket;
    let discount = ticketCount >= 4 ? baseCost * 0.1 : 0;
    let serviceFee = (baseCost - discount) * 0.08;
    let totalAmount = Math.round(baseCost - discount + serviceFee);
  
    // Thêm vào mảng
    let newBooking = {
      bookingCode: code,
      customerName: customerName,
      movieTitle: movieTitle,
      ticketCount: ticketCount,
      pricePerTicket: pricePerTicket,
      totalAmount: totalAmount
    };
  
    bookings.push(newBooking);
    alert("Thêm đơn đặt vé thành công! Tổng thanh toán: " + totalAmount);
  }
  
  // 3. Cập nhật đơn đặt vé
  function handleUpdateBooking() {
    let code = prompt("Nhập mã đặt vé cần cập nhật:");
    if (code === null) return;
    code = code.trim().toUpperCase();
  
    let foundIndex = -1;
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].bookingCode === code) {
        foundIndex = i;
        break;
      }
    }
  
    if (foundIndex === -1) {
      alert("Không tìm thấy đơn đặt vé có mã " + code);
      return;
    }
  
    let oldTotal = bookings[foundIndex].totalAmount;
  
    let newTicketCount = prompt("Nhập số lượng vé mới:");
    if (newTicketCount === null) {
      alert("Đã hủy cập nhật. Giữ nguyên tổng tiền: " + oldTotal);
      return;
    }
    newTicketCount = Number(newTicketCount);
  
    let newPrice = prompt("Nhập giá vé mới:");
    if (newPrice === null) {
      alert("Đã hủy cập nhật. Giữ nguyên tổng tiền: " + oldTotal);
      return;
    }
    newPrice = Number(newPrice);
  
    // Tính lại tiền
    let baseCost = newTicketCount * newPrice;
    let discount = newTicketCount >= 4 ? baseCost * 0.1 : 0;
    let serviceFee = (baseCost - discount) * 0.08;
    let totalAmount = Math.round(baseCost - discount + serviceFee);
  
    // Cập nhật giá trị
    bookings[foundIndex].ticketCount = newTicketCount;
    bookings[foundIndex].pricePerTicket = newPrice;
    bookings[foundIndex].totalAmount = totalAmount;
  
    alert("Cập nhật thành công!\n- Tổng cũ: " + oldTotal + "\n- Tổng mới: " + totalAmount);
  }
  
  // 4. Xóa đơn đặt vé
  function handleDeleteBooking() {
    let code = prompt("Nhập mã đặt vé cần xóa:");
    if (code === null) return;
    code = code.trim().toUpperCase();
  
    let foundIndex = -1;
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].bookingCode === code) {
        foundIndex = i;
        break;
      }
    }
  
    if (foundIndex === -1) {
      alert("Không tìm thấy đơn đặt vé có mã " + code);
      return;
    }
  
    let confirmDelete = prompt("Bạn có chắc muốn xóa không? Nhập 'Y' để xác nhận:");
    if (confirmDelete === null || confirmDelete.trim().toLowerCase() !== "y") {
      alert("Đã hủy thao tác xóa.");
      return;
    }
  
    bookings.splice(foundIndex, 1);
    alert("Xóa thành công! Còn lại " + bookings.length + " đơn.");
  }
  
  // 5. Tìm kiếm đơn đặt vé theo tên phim
  function handleSearchBooking() {
    let keyword = prompt("Nhập tên phim cần tìm:");
    if (keyword === null || keyword.trim() === "") {
      alert("Chưa nhập từ khóa tìm kiếm!");
      return;
    }
    keyword = keyword.trim().toLowerCase();
  
    let count = 0;
    let resultStr = "Kết quả tìm kiếm:\n";
    for (let i = 0; i < bookings.length; i++) {
      let movie = bookings[i].movieTitle.toLowerCase();
      if (movie.includes(keyword)) {
        count++;
        resultStr += count + ". " + bookings[i].bookingCode + " - " + bookings[i].movieTitle + "\n";
      }
    }
  
    if (count === 0) {
      alert("Không tìm thấy đơn đặt vé phù hợp.");
    } else {
      alert(resultStr);
    }
  }
  
  // Hàm chạy chương trình
  function main() {
    let choice;
    do {
      // Dấu + sẽ có tác dụng ép kiểu dữ liệu thành number
      let input = prompt(`
          ===================================
          HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
          ===================================
          1. Hiển thị danh sách đơn đặt vé
          2. Thêm đơn đặt vé mới
          3. Cập nhật đơn đặt vé
          4. Xóa đơn đặt vé
          5. Tìm kiếm đơn đặt vé theo tên phim
          0. Thoát chương trình
          ====================================
          Vui lòng nhập lựa chọn của bạn (0 - 5):
      `);
  
      if (input === null) {
        choice = 0;
      } else {
        choice = +input;
      }
  
      switch (choice) {
        case 1:
          // 1. Hiển thị danh sách đơn đặt vé
          displayBookings();
          break;
        case 2:
          // 2. Thêm đơn đặt vé mới
          handleCreateBooking();
          break;
        case 3:
          // 3. Cập nhật đơn đặt vé
          handleUpdateBooking();
          break;
        case 4:
          // 4. Xóa đơn đặt vé
          handleDeleteBooking();
          break;
        case 5:
          // 5. Tìm kiếm đơn đặt vé theo tên phim
          handleSearchBooking();
          break;
        case 0:
          alert("Thoát chương trình. Cảm ơn bạn đã sử dụng!");
          break;
        default:
          alert("Lựa chọn không hợp lệ. Vui lòng thử lại.");
          break;
      }
    } while (choice !== 0);
  }
  
  // Chạy chương trình
  main();