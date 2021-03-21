import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import {header, main, footer} from './common/';
import {navigation} from './navigation/navigation';
import {signUp} from './sign-up/sign-up';

const body = $(document.body);

body.append(signUp());

body.append( header () );
body.append( navigation () );
body.append( main () );
body.append( footer () );

