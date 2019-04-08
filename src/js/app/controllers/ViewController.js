export default class ViewController {
	constructor() {
		if ( 'development' === process.env.NODE_ENV ) {
			console.log( this.constructor.name );
		}
	}

	/**
	 * @public
	 */
	viewWillLoad() {}

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
