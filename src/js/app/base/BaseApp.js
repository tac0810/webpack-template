import page from 'page';
import axios from 'axios';
import BaseControllerManager from "./BaseControllerManager";

export default class BaseApp {
	constructor(FxRouter, VcRouter) {

		/**
		 *
		 * @type {BaseControllerManager}
		 * @public
		 */
		this.controllerManager = new BaseControllerManager(VcRouter);

		/**
		 *
		 * @type {boolean}
		 * @public
		 */
		this.debug = true;

		/**
		 *
		 * @type {Array}
		 * @private
		 */
		this._requests = [];

		/**
		 *
		 * @type {null}
		 * @private
		 */
		this._prev = null;

		/**
		 * @type {Object}
		 * @private
		 */
		this._fx = FxRouter;

		/**
		 *
		 * @type {boolean}
		 */
		this.pageInitialized = false;

		/**
		 *
		 * @type {boolean}
		 */
		this.hashChange = false;

		/**
		 *
		 */
		this.sendAnalytics = path => {};
	}

	/**
	 * @public
	 */
	boot() {
		page.exit('*', (prevCtx, next) => {
			this._pageExit(prevCtx, next);
		});
		page('*', ctx => {
			this._pageEnter(ctx);
		});
		page();
	}

	/**
	 *
	 * @private
	 */
	_safeBoot() {
		new Promise(resolve => {
			new this._fx['none --> none']({
				prevID: null,
				nextID: null,
				$newContent: null,
				params: null,
				controllerManager: this.controllerManager,
				nextTask: resolve
			})
		}).then(() => {
			this.controllerManager.use('current').viewDidAppear();
		});
	}

	/**
	 *
	 * @param prevID {string}
	 * @param nextID {string}
	 * @param $newContent {HTMLElement}
	 * @param params {{from: {}, to: {}}}
	 * @returns {Promise}
	 * @private
	 */
	_apply(prevID, nextID, $newContent, params) {
		return new Promise(resolve => {
			[`${prevID} --> ${nextID}`, `${prevID} --> *`, `* --> ${nextID}`, '* --> *'].some(value => {
				if (!(value in this._fx)) {
					return false
				}

				if (this.debug) {
					console.log('%c' + value, 'color: #03A9F4;');
					// console.group('%cViewController', 'color: #00C853;');
				}

				new this._fx[value]({
					prevID,
					nextID,
					$newContent,
					params,
					controllerManager: this.controllerManager,
					nextTask: resolve
				}).run();
				return true
			})
		})
	}

	/**
	 *
	 * @param ctx
	 * @private
	 */
	_pageEnter(ctx) {
		if (ctx.cancel === true) return;
		if (this.debug) {
			console.log('%cpage enter', 'color: #03A9F4;');
		}

		if (ctx.init) {
			this._apply('none', 'none', null, null).then(data => {
				this.pageInitialized = true;
				this.controllerManager.use('current').viewDidAppear();
			});
			return;
		}

		if (!this.pageInitialized) return;

		this._addRequestQueue({
			from: this._prev,
			to: ctx
		});
		this._pageChange();
	}

	/**
	 *
	 * @param prevCtx
	 * @param next
	 * @private
	 */
	_pageExit(prevCtx, next) {
		if (this.hashChange) return;
		if ("" !== prevCtx.hash && 0 === prevCtx.hash.length) return;

		this._prev = prevCtx;

		if (!this.pageInitialized) return next();
		if (prevCtx.cancelExit === true) return next();

		this.controllerManager.use('current').viewWillDisappear();

		if (this.debug) {
			// console.groupEnd('ViewController');
			console.log('%cpage exit', 'color: #03A9F4;');
			// console.groupEnd('app');
		}
		next();
	}

	/**
	 *
	 * @returns {*}
	 * @private
	 */
	_pageChange() {
		let params = this._getRequestQueue(),
			process = [];

		if (params === false) {
			return new Promise(resolve => {
				resolve()
			});
		}

		BaseApp._setNavActive(params.to.canonicalPath);

		// if (params.to.fromChildPage || params.to.toChildPage) {
		//
		// } else {
		// 	process.push(_scrollToTop());
		// }

		document.body.classList.add('page-changing')

		// console.log('will load');
		process.unshift(axios.get(params.to.path));

		return new Promise(resolve => {
			Promise.all(process).then(res => {
				// console.log('did load');

				let _res = res;
				if (Array.isArray(res)) {
					_res = res[0];
				}

				this._showPage(_res.data, params).then(resolve);
				this._current = params.to;
				// ga('send','pageview', params.to.path);
				// this.sendAnalytics( params.to.path );
			}).catch(res => {
				this._showPage(res.responseText, params).then(resolve);
				this._current = params.to;
			})
		})
	}

	/**
	 *
	 * @param res
	 * @param params
	 * @returns {*}
	 * @private
	 */
	_showPage(res, params) {
		let folder = document.createElement('div')
		folder.innerHTML = res
		let title = res.match(/<title>(.*)<\/title>/)
		let prev_id = document.querySelector('.page-content').getAttribute('id')
		let next_id = folder.querySelector('.page-content').getAttribute('id')

		if (folder.querySelector('title').innerText) {
			title = folder.querySelector('title').innerText;
		} else {
			title = document.querySelector('title').innerText;
		}

		return new Promise(resolve => {
			this._apply(prev_id, next_id, folder, params).then(data => {
				document.body.classList.remove('page-changing')
				document.querySelector('title').innerText = title
				this.controllerManager.use('current').viewDidAppear();
				resolve();
			});
		});
	}

	/**
	 *
	 * @returns {*}
	 * @private
	 */
	_getRequestQueue() {
		let _requests = this._requests;

		if (_requests.length === 0) return false;

		let params = _requests[_requests.length - 1];

		this._requests = [];

		return params;
	}

	/**
	 *
	 * @param params
	 * @private
	 */
	_addRequestQueue(params) {
		this._requests[this._requests.length] = params;
	}

	/**
	 *
	 * @param path
	 * @private
	 */
	static _setNavActive(path) {
		let p = ((path !== '' && path.substr(-1) === '/') ? path : path + '/').replace(/^\/([a-zA-Z\-\_]*)\/.*$/, '/$1/');
		let $context = $('#g-footer, #g-header, .g-nav');
		$context.find('.nav-list, .dot').removeClass('current');
		$context.find('a[href="' + p + '"]').parent().addClass('current');
	}
}
