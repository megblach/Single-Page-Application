import $ from 'jquery';

export const header = () => {
    const title = 'IT SPA';
    
    return $(`

    <header>
    <h1>${title}</h1>
    </header>
    
    `);
};