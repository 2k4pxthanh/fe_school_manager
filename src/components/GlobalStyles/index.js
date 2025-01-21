import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../assets/css/style.min.css";

import handleActiveWeb from "../../utils/handleActiveWeb.js";
import handleAlert from "../../utils/handleAlert.js";

function GlobalStyles({ children }) {
  handleActiveWeb();
  handleAlert();
  return children;
}

export default GlobalStyles;
