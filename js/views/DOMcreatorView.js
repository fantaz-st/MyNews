import mainArticlesView from './mainArticlesView.js';
import View from './view.js';

class DOMcreatorView extends View {
  _parentElement = document.querySelector('.article-inner');
  _data;

  generateMarkup() {
    return `
    <div class="nav-btns">
      <button class="nav-menu-btn active" data-name="featured">Featured</button>
      <button class="nav-menu-btn" data-name="latest">Latest</button>
    </div>
    <h2 class="header">Home</h2>
                <div class="main_four">
                    <div class="main_articles">
                    ${this._data.mainArticles
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
                                    </div>`;
                      })
                      .join('')}
                    </div><div>
                    <div class="loading-more-articles">
    <div class="loader-message">Fetching more articles...</div>
 </div>
 <div class="latest_news">
                        <h2 class="header"><span class="dot"></span>Latest news</h2>
                        ${this._data.latest
                          .map(cur => {
                            return `
        <div class="latest_article">
                <p class="published_time">12:34</p>
                    <a href="${cur.url}" class="title">${cur.title}</a>
        </div>
        <div class="separator"></div>
        `;
                          })
                          .join('')}
                    </div>
                </div>
                    </div>
                    
                <div class="rest_articles">
                ${this._data.articles
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

  addHandlerScrollDetect(handler) {
    var listElm = document.querySelector('.latest_news');
    listElm.addEventListener('scroll', function () {
      if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) handler(listElm);
    });
  }
}

export default new DOMcreatorView();
