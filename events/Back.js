export default {
  _instance: null,
  back: () => {},
  get instance() {
    // eslint-disable-next-line no-underscore-dangle
    if (!this._instance) {
      // eslint-disable-next-line no-underscore-dangle
      this._instance = this;
    }
    // eslint-disable-next-line no-underscore-dangle
    return this._instance;
  },
};
