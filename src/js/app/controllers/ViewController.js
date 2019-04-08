export default class ViewController {
    constructor() {
    }

    /**
     * @public
     */
    viewWillLoad() {
        console.log('viewWillLoad');

        this.stage = new window.Stage()
        this.stage.setup()
        this.stage.render()
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
