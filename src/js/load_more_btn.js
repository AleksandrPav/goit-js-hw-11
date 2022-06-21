
export default class LoadMoreBtn {
    constructor({ selector, hidden = false }) {
        this.refs = this.getRefs(selector);
        hidden && this.hide();
    }

    getRefs(selector) {
        const refs = {};
        refs.loadBtn = document.querySelector(selector);
        return refs;
    }

    enable() {
        this.refs.loadBtn.disabled = false;
        this.refs.loadBtn.textContent = 'Load more';
    }

    disable() {
        this.refs.loadBtn.disabled = true;
        this.refs.loadBtn.textContent = 'Load...';
    }

    show() {
        this.refs.loadBtn.classList.remove('is-hidden');
    }

    hide() {
        this.refs.loadBtn.classList.add('is-hidden');
    }
};