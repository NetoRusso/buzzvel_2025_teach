import '@testing-library/jest-dom';

if (typeof window.HTMLElement.prototype.scrollBy === 'undefined') {
  window.HTMLElement.prototype.scrollBy = function(options) {
    if (typeof this._customScrollByMock === 'function') {
        this._customScrollByMock(options);
    } else {
        const currentScrollLeft = this.scrollLeft || 0;
        const currentScrollTop = this.scrollTop || 0;
        if (options && typeof options.left === 'number') {
          this.scrollLeft = currentScrollLeft + options.left;
        }
        if (options && typeof options.top === 'number') {
          this.scrollTop = currentScrollTop + options.top;
        }
    }
  };
}

const scrollLeftDescriptor = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'scrollLeft');
if (!scrollLeftDescriptor || typeof scrollLeftDescriptor.set === 'undefined') {
  Object.defineProperty(window.HTMLElement.prototype, 'scrollLeft', {
    configurable: true,
    get: function() {
      return this._privateScrollLeft === undefined ? 0 : this._privateScrollLeft;
    },
    set: function(value) {
      this._privateScrollLeft = Number(value);
    },
  });
}

const offsetLeftDescriptor = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'offsetLeft');
if (!offsetLeftDescriptor) {
    Object.defineProperty(window.HTMLElement.prototype, 'offsetLeft', {
        configurable: true,
        get: function() {
            return this._privateOffsetLeft === undefined ? 0 : this._privateOffsetLeft;
        }
    });
}