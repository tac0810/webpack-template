export default class ViewController {
	constructor() {
		if ('development' === process.env.NODE_ENV) {
			console.log(this.constructor.name);
		}
	}

	/**
	 * @public
	 */
	viewWillLoad() {
		this.stage = new window.Stage()
		this.stage.setup()
		this.stage.render()
	}

	/**
	 * @public
	 */
	viewDidLoad() {}

	/**
	 * @public
	 */
	viewWillAppear() {}

	/**
	 * @public
	 */
	viewDidAppear() {}

	/**
	 * @public
	 */
	resize() {}

	/**
	 *
	 * @param st {number}
	 * @public
	 */
	scroll(st) {}
}
