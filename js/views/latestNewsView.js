import View from './view.js';

class LatestNewsView extends View {
  _parentElement2 = document.querySelector('.article-inner');
  _parentElement = document.querySelector('.latest_news');
  _errorMessage = 'Nema tog artikla dragane.';

  _data;

  generateMarkup2() {
    return this._data.latest
      .map(cur => {
        return `
        <div class="latest_article">
                <p class="published_time">12:34</p>
                    <a href="${cur.url}" class="title">${cur.title}</a>
        </div>
        <div class="separator"></div>
        `;
      })
      .join('');
  }

  generateArticles() {
    return this._data
      .map(cur => {
        return `
<div class="latest_article">
  <p class="published_time">12:34</p>
  <a href="${cur.url}" class="title">${cur.title}</a>
</div>
<div class="separator"></div>
`;
      })
      .join('');
  }
}

export default new LatestNewsView();
