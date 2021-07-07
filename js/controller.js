import * as model from './model.js';
import articleView from './views/articleView.js';
import categoryView from './views/categoryView.js';
import DOMcreatorView from './views/DOMcreatorView.js';
import latestNewsView from './views/latestNewsView.js';
import mainArticlesView from './views/mainArticlesView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import mobileSearchView from './views/mobileSearchView.js';

import mobileView from './views/mobileView.js';
import mobileCategoryView from './views/mobileCategoryView.js.js';
import favoritesView from './views/favoriteView.js';
import favoriteView from './views/favoriteView.js';

//https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY

const controller = async function () {
  try {
    resultsView.renderSpinner();
    await model.getArticles(); // const articles=await apiClient.getArticles(); - returns articles object
    // inject articles into model
    //await model.fillState(articles);
    DOMcreatorView.render(model.state);
    if (model.state.favorites.length > 0) favoriteView.addFavoriteButtonToCategory();
  } catch (err) {
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    resultsView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};
const controlMobileSearchResults = async function () {
  try {
    const query = mobileSearchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    resultsView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};
const controlShowCategory = async function (category) {
  resultsView.renderSpinner();
  if (category === 'home') {
    await model.getArticles();
    DOMcreatorView.render(model.state);
    return;
  } else if (category === 'favorites') {
    favoriteView.render(model.state.favorites);
    return;
  }
  await model.loadCategoryResults(category);
  resultsView.render(model.state.search);
};

const handleFavorites = function (article) {
  model.addBookmark(article);
  favoriteView.render(model.state.favorites);
};

const loadMoreArticles = async function (div) {
  latestNewsView.toggleLoader();
  const shouldIRender = await model.getMoreLatestArticles();
  if (shouldIRender) {
    latestNewsView.toggleLoader();
    latestNewsView.addMoreArticles(model.state.moreLatest, div);
  } else {
    latestNewsView.noMoreArticlesText();
  }
};

const init = async function () {
  await controller();
  searchView.addHandlerSearch(controlSearchResults);
  mobileSearchView.addHandlerSearch(controlMobileSearchResults);
  categoryView.addHandlerSearch(controlShowCategory);
  mobileCategoryView.addHandlerSearch(controlShowCategory);
  favoritesView.addHandlerFavoriteClick(handleFavorites);
  DOMcreatorView.addHandlerScrollDetect(loadMoreArticles);
  mobileView.addHandlerNavButtons();
};

init();
