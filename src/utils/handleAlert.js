import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import $ from "jquery";

function handleAlert() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    $(document).ready(function () {
      let alertTimeout;
      $("#confirmDelete").click(function () {
        $("#delModel").modal("hide");
        $("#alert").css("display", "block");

        clearTimeout(alertTimeout);

        alertTimeout = setTimeout(function () {
          $("#alert").css("display", "none");
        }, 500);
      });
    });
  }, [location]);
  return <></>;
}

export default handleAlert;
