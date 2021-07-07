import View from './view.js';

class ArticleView extends View {
  _parentElement = document.querySelector('.rest_articles');
  _errorMessage = 'Nema tog artikla dragane.';

  _data;

  generateMarkup() {
    return this._data.articles
      .map(cur => {
        return `<div class="article">
        <i class="far fa-heart favorites_btn"></i>
        <a href="${cur.url}"class="article-a">

            <img class="banner-small" src="${cur.urlToImage === null ? `../img/placeholder.jpg` : cur.urlToImage}">
                <div class="inner">
                    <p class="category">${this._data.category}</p>
                    <p class="title">${cur.title}</p>
                    <p class="author">${cur.author === null ? '' : cur.author}</p>
                </div>
        </a>
        </div>
        `;
      })
      .join('');
  }
}

export default new ArticleView();
