import App from "./app/App";
import FxRouter from "./app/routes/FxRouter";
import VcRouter from "./app/routes/VcRouter";


export default class Delegate {
	constructor() {
		/**
		 *
		 * @type {App}
		 * @private
		 */
		this._app = new App(FxRouter, VcRouter, true);
		this._app.debug = process.env.NODE_ENV === 'development';
		this._app.boot();

		/**
		 *
		 * @type {null}
		 * @private
		 */
		this._rendering = null
	}

	projectInit() {
		if (this._app.controllerManager.use('current')) this._app.controllerManager.use('current').projectInit()
	}

	willLoad() {
		if (this._app.controllerManager.use('current')) this._app.controllerManager.use('current').viewWillLoad()
	}

	didLoad() {
		if (this._app.controllerManager.use('current')) this._app.controllerManager.use('current').viewDidLoad()
	}

	resize() {
		if (this._app.controllerManager.use('current')) this._app.controllerManager.use('current').resize()
	}

	scroll(st) {
		if (this._app.controllerManager.use('current')) this._app.controllerManager.use('current').scroll(st)
	}

	render() {
		if (this._app.controllerManager.use('current')) this._app.controllerManager.use('current').render()

		if (this._rendering) cancelAnimationFrame(this._rendering)
		this._rendering = requestAnimationFrame(this.render.bind(this))
	}

	stopRender() {
		if (this._rendering) cancelAnimationFrame(this._rendering)
	}
}
