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