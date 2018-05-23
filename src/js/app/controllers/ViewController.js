export default class ViewController {
    get resizeTrigger() {
        return this._resizeTrigger;
    }

    set resizeTrigger( value ) {
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
        console.log('viewWillLoad');
    }

    /**
     * @public
     */
    viewDidLoad() {
        console.log('viewDidLoad');
    }

    /**
     * @public
     */
    viewWillAppear() {
        console.log('viewWillAppear');
    }

    /**
     * @public
     */
    viewDidAppear() {
        console.log('viewDidAppear');
    }

    viewWillDisappear(){
        console.log('viewWillDisappear');
    }

    viewDidDisappear(){
        console.log('viewDidDisappear');
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
    scroll( st ) {
    }
}