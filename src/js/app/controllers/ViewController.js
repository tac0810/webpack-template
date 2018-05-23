export default class ViewController {
    get resizeTrigger() {
        return this._resizeTrigger;
    }

    set resizeTrigger(value) {
        this._resizeTrigger = value;
    }

    constructor() {

        /**
         *
         * @type {boolean}
         * @private
         */
        this._resizeTrigger = true;
    }

    /**
     * @public
     */
    viewWillLoad() {
    }

    /**
     * @public
     */
    viewDidLoad() {
    }

    /**
     * @public
     */
    viewWillAppear() {
    }

    /**
     * @public
     */
    viewDidAppear() {
    }

    /**
     * @public
     */
    resize() {
    }

    /**
     *
     * @param st {number}
     * @public
     */
    scroll(st) {
    }
}