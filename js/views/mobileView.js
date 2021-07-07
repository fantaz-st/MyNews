import View from './view.js';

class MobileView extends View {
  _parentElement = document.querySelector('.mobile-article-inner');
  _data;

  generateMarkup() {}

  addHandlerNavButtons(handler) {
    document.querySelector('.article-inner').addEventListener('click', function (e) {
      const btn = e.target.closest('.nav-menu-btn');
      if (!btn) return;
      const mainArticlesDiv = document.querySelector('.main_articles');
      const latestNewsDiv = document.querySelector('.latest_news');
      const allArticlesDiv = document.querySelector('.rest_articles');
      document.querySelector('.nav-menu-btn.active').classList.remove('active');
      btn.classList.add('active');

      if (btn.dataset.name === 'featured') {
        latestNewsDiv.style.display = 'none';
        allArticlesDiv.style.display = 'flex';
        mainArticlesDiv.style.display = 'flex';
      } else if (btn.dataset.name === 'latest') {
        allArticlesDiv.style.display = 'none';
        mainArticlesDiv.style.display = 'none';
        latestNewsDiv.style.display = 'block';
      }
    });
  }
}

document.getElementById('menu_checkbox').addEventListener('click', function () {
  document.querySelector('.overlay').classList.toggle('active');
  //document.querySelector('body').classList.toggle('overlay');
});

export default new MobileView();
