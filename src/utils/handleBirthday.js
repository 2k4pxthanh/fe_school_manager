function handleBirthday(day) {
  const date = new Date(day); // Chuyển chuỗi ngày thành đối tượng Date
  const dayFormatted = ("0" + date.getDate()).slice(-2); // Lấy ngày và thêm số 0 nếu cần
  const monthFormatted = ("0" + (date.getMonth() + 1)).slice(-2); // Lấy tháng và thêm số 0 nếu cần
  const yearFormatted = date.getFullYear(); // Lấy năm

  // Trả về ngày theo định dạng "dd/mm/yyyy"
  return `${dayFormatted}/${monthFormatted}/${yearFormatted}`;
}

export default handleBirthday;
