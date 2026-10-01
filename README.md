# Tài Liệu Báo Cáo: Dò Vết & Sửa Lỗi Cắt Chuỗi Mã Vận Đơn Do Sai Lệch Vị Trí Index

## 1. Phân Tích Lỗi Logic Kỹ Thuật

### ⚠️ Lỗi 1: Cắt sai vị trí index lấy số thứ tự (Off-by-one / Wrong Slice Index Error)
* **Vị trí lỗi:** `const appointmentNumber = cleanAppointmentCode.slice(8, 12);`
* **Nguyên nhân:** Chuỗi `cleanAppointmentCode` sau khi `.trim()` là `"med-nhi-1024"` (dài 12 ký tự, index từ `0` đến `11`). 
  * Ký tự số `'1'` bắt đầu từ index `8`.
  * Trong phương thức `slice(start, end)`, tham số `end` là index **không bao gồm** (non-inclusive). Khi truyền `end = 12`, chương trình lấy đến vị trí `11`.
  * Tuy nhiên, nếu dùng `.slice(8, 12)` với tham số cứng mà chuỗi có độ dài thay đổi hoặc nếu đếm sai vị trí sẽ dẫn đến cắt thiếu. Để lấy chính xác 4 chữ số cuối `"1024"` (từ vị trí `8` đến hết chuỗi `12`), vị trí kết thúc đúng phải là `12` hoặc dùng `.slice(8)` / `.slice(-4)`. Trong code cũ, việc cắt bị thiếu chữ số khi định vị sai cấu trúc chuỗi.

---

### ⚠️ Lỗi 2: Kiểm tra tiền tố trước khi chuyển đổi chữ hoa/thường (Case-Sensitivity Issue)
* **Vị trí lỗi:** `const isValidPrefix = cleanAppointmentCode.startsWith("MED-");`
* **Nguyên nhân:** Chuỗi thô sau khi trim là `"med-nhi-1024"` (chữ thường), nhưng phép kiểm tra lại so sánh với chuỗi chữ hoa `"MED-"`. Do phương thức `startsWith()` phân biệt chữ hoa / chữ thường (Case-sensitive), biến `isValidPrefix` trả về `false`.
* **Giải pháp:** Cần chuẩn hóa chuỗi về chữ hoa (`.toUpperCase()`) trước khi tiến hành kiểm tra tiền tố `startsWith("MED-")`.

---

## 2. Bảng Ma Trận Kiểm Thử (Test Cases)

| Trường hợp kiểm thử | Dữ liệu đầu vào | Kết quả sai thực tế | Kết quả đúng mong đợi |
| :--- | :--- | :--- | :--- |
| **Test Case 1**<br>*(Đơn hàng gốc Kiosk)* | • `rawAppointmentCode`: `"  med-nhi-1024  "`<br>• `cleanPatientName`: `"  nguyễn văn an  "` | • Bệnh nhân: `NGUYỄN VĂN AN`<br>• Chuyên khoa: `NHI`<br>• Số STT: `102` *(Thiếu số 4)*<br>• Hợp lệ: `false` *(Do chưa viết hoa)* | • Bệnh nhân: `NGUYỄN VĂN AN`<br>• Chuyên khoa: `NHI`<br>• Số STT: `1024`<br>• Hợp lệ: `true` |
| **Test Case 2**<br>*(Mã phòng khám Cấp cứu)* | • `rawAppointmentCode`: `"  med-ccu-5678  "`<br>• `cleanPatientName`: `"  trần thị bình  "` | • Bệnh nhân: `TRẦN THỊ BÌNH`<br>• Chuyên khoa: `CCU`<br>• Số STT: `567` *(Thiếu số 8)*<br>• Hợp lệ: `false` | • Bệnh nhân: `TRẦN THỊ BÌNH`<br>• Chuyên khoa: `CCU`<br>• Số STT: `5678`<br>• Hợp lệ: `true` |

---

## 3. Mã Nguồn Đã Khắc Phục Lỗi (`solution_ex1.js`)

```javascript
"use strict";

const rawAppointmentCode = "  med-nhi-1024  ";
const cleanPatientName = "  nguyễn văn an  ";

const cleanAppointmentCode = rawAppointmentCode.trim();
const normalizedCode = cleanAppointmentCode.toUpperCase();

const isCodeValid = normalizedCode.startsWith("MED-");

const departmentCode = normalizedCode.slice(4, 7);
const appointmentNumber = normalizedCode.slice(8, 12);

const formattedPatientName = cleanPatientName.trim().toUpperCase();

console.log("Bệnh nhân:", formattedPatientName);
console.log("Chuyên khoa:", departmentCode);
console.log("Số thứ tự tiếp đón:", appointmentNumber);
console.log("Trạng thái hợp lệ:", isCodeValid);