import { useEffect } from "react";
import $ from "jquery";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-bs4/js/dataTables.bootstrap4.js";
import "../assets/css/dataTables.bootstrap4.min.css";

function handleAddDataTableJquery(idTable) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    $(document).ready(function () {
      $(idTable).DataTable({
        responsive: true,
        retrieve: true,
        language: {
          oAria: {
            sSortAscending: ": Ấn để sắp xếp tăng dần",
            sSortDescending: ": Ấn để sắp xếp giảm dần",
          },
          oPaginate: { sFirst: "Đầu", sLast: "Cuối", sNext: "Tiếp", sPrevious: "Trước" },
          sEmptyTable: "Không có dữ liệu trong bảng",
          sInfo: "Hiển thị từ _START_ tới _END_ của _TOTAL_ dữ liệu",
          sInfoEmpty: "Hiển thị từ 0 tới 0 của 0 dữ liệu",
          sInfoFiltered: "(đã lọc _MAX_ dữ liệu)",
          sInfoPostFix: "",
          sDecimal: "",
          sThousands: ",",
          sLengthMenu: "Hiển thị _MENU_ dữ liệu",
          sLoadingRecords: "Đang tải...",
          sProcessing: "Đang chạy...",
          sSearch: "Tìm kiếm:",
          sSearchPlaceholder: "",
          sUrl: "",
          sZeroRecords: "Không có dữ liệu được tìm thấy",
        },
      });
    });
  }, []);
  return <></>;
}

export default handleAddDataTableJquery;
