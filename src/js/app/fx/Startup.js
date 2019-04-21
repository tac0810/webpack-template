import Schedule from 'js/utils/Schedule';
import BaseFx from "./BaseFx"

export default class Startup extends BaseFx {
	run() {
		const { controllerManager, nextTask } = this.props
		let schedule = new Schedule()
		schedule.add(resolve => {
			let $content = document.querySelector('.page-content'),
				id = $content.getAttribute('id');

			document.body.classList.add(id === 'top' ? 'index' : 'sub');
			controllerManager.add(id, $content);
			Schedule.wait(this.PROCESS_TIME).then(resolve);
		});

		schedule.add(resolve => {
			// controllerManager.use('current').viewWillLoad();
			// controllerManager.use('current').viewDidLoad();
			controllerManager.use('current').viewWillAppear();
			Schedule.wait(this.PROCESS_TIME).then(resolve);
		});

		schedule.done(() => {
			window.pageInitialized = true;
			nextTask()
		});
	}
}
