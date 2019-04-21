export default class BaseFx {
	constructor(props) {
		this.PROCESS_TIME = 100

		/**
		 *
		 * @type {{nextID: string, controllerManager: BaseControllerManager, prevID: string, params: {}, $newContent: HTMLElement, nextTask: Function}}
		 */
		this.props = props
	}

	run() {

	}
}
