import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  constructor(isResult) {
    super();

    this._parentElement = document.querySelector(
      isResult ? '.results' : '.bookmarks__list'
    );
    this._errorMessage = isResult
      ? 'No recipes found for your query. Please try another one!'
      : 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  }
  _message = ``;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(rec => this._generateMarkupPreview(rec)).join('');
  }

  _generateMarkupPreview(recipe) {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          recipe.id === id ? 'preview__link--active' : ''
        }" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated ${recipe.key ? '' : 'hidden'}">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
  }
}

export const resultsView = new ResultsView(true);
export const bookmarksView = new ResultsView(false);
