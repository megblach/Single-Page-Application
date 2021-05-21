import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import $ from "jquery";
import { header, main, footer} from "./common/";
import { carousel } from "./views/home/carusel-home";

const body = $(document.body);

body.append(header());
body.append(main());
body.append(footer());

carousel();
