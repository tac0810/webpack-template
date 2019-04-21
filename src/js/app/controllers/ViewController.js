export default class ViewController {
    constructor() {
    }

    /**
     * @public
     */
    viewWillLoad() {
        console.log(this.constructor.name + ': viewWillLoad');
    }

    /**
     * @public
     */
    viewDidLoad() {
        console.log(this.constructor.name + ': viewDidLoad');
    }

    /**
     * @public
     */
    viewWillAppear() {
        console.log(this.constructor.name + ': viewWillAppear');
    }

    /**
     * @public
     */
    viewDidAppear() {
        console.log(this.constructor.name + ': viewDidAppear');
    }

    viewWillDisappear(){
        console.log(this.constructor.name + ': viewWillDisappear');
    }

    viewDidDisappear(){
        console.log(this.constructor.name + ': viewDidDisappear');
    }

    /**
     * @public
     */
    resize() {
        console.log(this.constructor.name + ': resize', window.innerWidth);
    }

    /**
     *
     * @param st {number}
     * @public
     */
    scroll( st ) {
        console.log(this.constructor.name + ': scroll', st);
    }
}
