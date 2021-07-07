import View from './view.js';

class SearchView extends View {
  _parentElement = document.querySelector('.mobile-category_btns');
  _data;

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this.clearInput();
    return query;
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('.overlay').classList.toggle('active');
      document.getElementById('menu_checkbox').checked = false;
      const btn = e.target.closest('.btn-category');
      if (!btn) return;
      const allBtns = [...document.querySelectorAll('.btn-category')];
      allBtns.forEach(cur => cur.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.name;
      handler(category);
    });
  }
}

export default new SearchView();
