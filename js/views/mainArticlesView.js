import View from './view.js';

class MainArticleView extends View {
  _parentElement = document.querySelector('.main_articles');
  _errorMessage = 'Nema tog recepta dragane.';

  _data;

  generateMarkup() {
    return this._data.mainArticles
      .map(cur => {
        return `
        <a href="${cur.url}"class="article">

            <img class="banner-small" src="${cur.urlToImage === null ? `../img/placeholder.jpg` : cur.urlToImage}">
                <div class="inner">
                    <p class="category">${this._data.category}</p>
                    <p class="title">${cur.title}</p>
                    <p class="author">${cur.author === null ? '' : cur.author}</p>
                </div>
        </a>
        `;
      })
      .join('');
  }
}

export default new MainArticleView();
