//const API_KEY = 'aa45a5638d5d4834af98010c52e2cd14';
const API_KEY = 'baa3a94494a84b94a710ba35d1534363';

export const state = {
  articles: [],
  mainArticles: [],
  category: [],
  latest: [],
  moreLatest: [],
  page: 1,
  //uncomment next line to simulate all articles loaded
  // articlesRendered: 980,
  articlesRendered: 20,
  totalArticles: 20,
  search: {
    query: '',
    results: [],
  },
  favorites: [],
};

export const getArticles = async function (pageSize = '20', page = '1', category = 'general') {
  try {
    const data = await fetch(
      `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`
    );
    const json = await data.json();
    populateArticles(json, category);
  } catch (err) {
    console.error(err);
  }
};
export const getMoreLatestArticles = async function () {
  try {
    //get current page
    const loadPage = state.page + 1;
    //fetch articles
    const data = await fetch(
      `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?category=general&pageSize=20&page=${loadPage}&apiKey=${API_KEY}`
    );
    const json = await data.json();
    //check if there's more retrieved articles than the ones already rendered
    if (json.totalResults > state.articlesRendered) {
      state.moreLatest = json.articles;
      state.page = loadPage;
      state.totalArticles = json.totalResults;
      state.articlesRendered = state.articlesRendered + 20;
      console.log(state.totalArticles, state.articlesRendered);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

const populateArticles = function (data, category) {
  state.articles = [];
  state.mainArticles = [];
  for (let i = 0; i <= 3; i++) {
    state.mainArticles.push(data.articles[i]);
  }
  for (let i = 3; i < data.articles.length; i++) {
    state.articles.push(data.articles[i]);
  }
  //state.articles = data.articles;
  state.latest = data.articles;
  state.category = category;
};
const populateSearch = function (data, query) {
  state.search.query = query;
  state.search.results = data.articles;
};

//https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=

export const getArticleByCategories = async function (category) {
  try {
    const data = await fetch(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/sources?category=${category}&apiKey=${API_KEY}`);
    const json = await data.json();
    populateSearch(json, query);
  } catch (err) {
    console.error(err);
  }
};

//https://newsapi.org/v2/everything?q=Apple&from=2021-07-01&sortBy=popularity&apiKey=

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await fetch(
      `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${query}&from=2021-07-01&sortBy=popularity&apiKey=${API_KEY}`
    );
    const json = await data.json();
    populateSearch(json, query);
    console.log(json);
  } catch (err) {
    throw err;
  }
};

export const loadCategoryResults = async function (category) {
  try {
    state.search.query = category;
    const data = await fetch(
      `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    const json = await data.json();
    populateSearch(json, category);
  } catch (err) {
    throw err;
  }
};

const persistFavorites = function () {
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
};

export const addBookmark = function (article) {
  state.favorites.push(article);
  //favoritesView.render(model.state.favorites);
  persistFavorites();
};

const init = function () {
  const storage = localStorage.getItem('favorites');
  if (storage) state.favorites = JSON.parse(storage);
};
init();
