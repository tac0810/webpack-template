import App from "./app/App";
import FxRouter from "./app/routes/FxRouter";
import VcRouter from "./app/routes/VcRouter";


export default class Delegate {
	constructor() {
		this.app = new App(FxRouter, VcRouter, true);
		this.app.debug = process.env.NODE_ENV === 'development';
		this.app.boot();

		this.rendering = null
	}

	willLoad() {
		if (this.app.controllerManager.use('current')) this.app.controllerManager.use('current').viewWillLoad()
	}

	didLoad() {
		if (this.app.controllerManager.use('current')) this.app.controllerManager.use('current').viewDidLoad()
	}

	resize() {
		if (this.app.controllerManager.use('current')) this.app.controllerManager.use('current').resize()
	}

	scroll(st) {
		if (this.app.controllerManager.use('current')) this.app.controllerManager.use('current').scroll(st)
	}

	render() {

		if (this.app.controllerManager.use('current')) this.app.controllerManager.use('current').render()

		if (this.rendering) cancelAnimationFrame(this.rendering)
		this.rendering = requestAnimationFrame(this.render.bind(this))
	}

	stopRender() {
		if (this.rendering) cancelAnimationFrame(this.rendering)
	}
}
