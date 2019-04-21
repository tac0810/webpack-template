import Schedule from 'js/utils/Schedule';
import BaseFx from "./BaseFx"

export default class Default extends BaseFx {
	run() {
		const { prevID, nextID, $newContent, controllerManager, nextTask } = this.props
		let prevContent = document.querySelector('#' + prevID),
			nextContent = $newContent.querySelector('#' + nextID),
			to = (prevID !== 'top' && nextID === 'top') || (prevID === 'top' && nextID === 'top') ? 'index' : 'sub',
			dl = null;

		const schedule = new Schedule();

		schedule.add(resolve => {
			Schedule.wait(this.PROCESS_TIME).then(resolve);
		});

		schedule.add(resolve => {
			prevContent.parentNode.removeChild(prevContent);
			document.querySelector('#contents').appendChild(nextContent)
			document.body.classList.remove('index')
			document.body.classList.remove('sub')
			document.body.classList.add(to)
			Schedule.wait(this.PROCESS_TIME).then(resolve);
		});

		schedule.add(resolve => {
			if (prevContent) {
				controllerManager.add(nextID, nextContent);
				controllerManager.use('prev').viewDidDisappear();
				controllerManager.pop();
			}
			Schedule.wait(this.PROCESS_TIME).then(resolve);
		});

		schedule.add(resolve => {
			controllerManager.use('current').viewWillAppear();
			Schedule.wait(this.PROCESS_TIME).then(resolve);
		});

		schedule.done(() => {
			nextTask(dl);
		});
	}

}
