import view from './view';
import previewView from './previewView';

class BookmarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
