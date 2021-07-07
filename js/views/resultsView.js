import View from './view.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.article-inner');

  generateMarkup() {
    return `
    <h2 class="header">${this._data.query}</h2>
                
               
                <div class="rest_articles">
                ${this._data.results
                  .map(cur => {
                    return `
                    <div class="article">
        <i class="far fa-heart favorites_btn"></i>
                    <a href="${cur.url}"class="article-a">
            
                        <img class="banner-small" src="${cur.urlToImage === null ? `..img/placeholder.jpg` : cur.urlToImage}">
                            <div class="inner">
                                <p class="category">${this._data.query}</p>
                                <p class="title">${cur.title}</p>
                                <p class="author">${cur.author === null ? '' : cur.author}</p>
                            </div>
                    </a>
                    </div>
                    `;
                  })
                  .join('')}
                </div>
    `;
  }
}

export default new ResultsView();
