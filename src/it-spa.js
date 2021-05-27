import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './it-spa.scss' 
import $ from "jquery";
import { header, main, footer} from "./common/";

const body = $(document.body);

body.append(header());
body.append(main());
body.append(footer());

