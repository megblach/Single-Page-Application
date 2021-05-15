import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import { header, main, footer} from "./common/";
import { navigation } from "./navigation/navigation";
// import { signUp } from "./sign-up/sign-up";
// import { signIn } from "./sign-in/sign-in";

const body = $(document.body);

// body.append(signUp());
// body.append(signIn());

body.append(header());
body.append(navigation());
body.append(main());
body.append(footer());
