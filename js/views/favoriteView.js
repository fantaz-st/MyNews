import View from './view.js';

class FavoriteView extends View {
  _parentElement = document.querySelector('.article-inner');
  _favoriteButtonParentElement = document.querySelector('.desktop-category_btns');
  _favoriteButtonParentElementMobile = document.querySelector('.mobile-category_btns');

  _data;

  generateMarkup() {
    console.log(this._data);
    return `
    <h2 class="header">Favorites</h2>
                <div class="rest_articles">
                ${this._data
                  .map(cur => {
                    return `
                    <a href="${cur.link}"class="article">
            
                        <img class="banner-small" src="${cur.image === null ? `../img/placeholder.jpg` : cur.image}">
                            <div class="inner">
                                <p class="category">${cur.category}</p>
                                <p class="title">${cur.title}</p>
                                <p class="author">${cur.author === null ? '' : cur.author}</p>
                            </div>
                    </a>
                    `;
                  })
                  .join('')}
                </div>
    `;
  }

  addFavoriteButtonToCategory() {
    const markup = `<button data-name="favorites" class="btn btn-category"><i class="fas fa-heart favorites_btn"></i><p>Favorites</p></button>`;
    this._favoriteButtonParentElement.insertAdjacentHTML('beforeend', markup);
    this._favoriteButtonParentElementMobile.insertAdjacentHTML('beforeend', markup);
  }

  addHandlerFavoriteClick(handler) {
    document.querySelector('.article-inner').addEventListener('click', function (e) {
      const btn = e.target.closest('.favorites_btn');
      if (!btn) return;
      const parent = btn.parentElement;
      const children = parent.children;
      const article = {
        link: children[1].href,
        image: children[1].children[0].src,
        category: children[1].children[1].children[0].textContent,
        title: children[1].children[1].children[1].textContent,
        author: children[1].children[1].children[2].textContent,
      };

      handler(article);
    });
  }
}

export default new FavoriteView();
