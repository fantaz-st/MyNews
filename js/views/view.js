export default class View {
  _parentElement;
  _data;

  render(data) {
    this._data = data;
    const markup = this.generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addMoreArticles(data, div) {
    this._data = data;
    const markup = this.generateArticles();
    div.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="loading">
      <div class="spinner"></div>
      <div class="loader-message">Fetching articles...</div>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  toggleLoader() {
    document.querySelector('.loading-more-articles').classList.toggle('active');
  }
  removeMoreArticlesSpinner(div) {
    if (document.querySelector('.latest_news').contains('.loading-more-articles')) console.log('lol');
  }
  noMoreArticlesText() {
    document.querySelector('.loading-more-articles .loader-message').textContent = 'No more articles';
  }
}
