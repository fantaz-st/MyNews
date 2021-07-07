import View from './view.js';

class SearchView extends View {
  _parentElement = document.querySelector('.mobile-search_bar');
  _data;

  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this.clearInput();
    return query;
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const allBtns = [...document.querySelectorAll('.btn-category')];
      allBtns.forEach(cur => cur.classList.remove('active'));
      handler();
    });
  }
}

export default new SearchView();
