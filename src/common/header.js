import $ from 'jquery';
import user from './assets/user.png'
import { navigationbar } from '../navigation/navbar'



export const header = () => {
    const headerElement = $('<header></header>');
    headerElement.append(navigationbar);

    return headerElement;
};







