class Section { 
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  // renders element on page
  renderElements() {
    this._items.forEach((item) => this._renderer(item));
  }

  //takes DOM element & adds to the container
  addItem(item) {
    this._container.prepend(item);
  }
}

export default Section;



