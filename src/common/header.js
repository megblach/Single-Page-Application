import $ from 'jquery';
import { navigationbar } from '../navigation/navbar'



export const header = () => {
    const headerElement = $('<header></header>');
    headerElement.append( navigationbar);

    return headerElement;
};







