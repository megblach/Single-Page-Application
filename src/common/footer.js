import $ from 'jquery';

export const footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return $(`
  <div class="fixed-bottom">
  <footer>
  <small>Wszelkie prawa zastrzeżone ALK &copy; ${year} </small>
  </footer>
  </div>
    
    `);
};