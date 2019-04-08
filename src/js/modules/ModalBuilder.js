export default class ModalBuilder {
	/**
	 *
	 * @type {{closeBtn: string, start: ModalBuilder.__default.start, closed: ModalBuilder.__default.closed, fixed: boolean, opened: ModalBuilder.__default.opened, trigger: string, bgClose: boolean, windowLock: boolean, content: {}, customAnimation: boolean, target: string}}
	 */
	constructor(options) {
		/**
		 *
		 * @type {{closeBtn: string, start: ModalBuilder.__default.start, closed: ModalBuilder.__default.closed, fixed: boolean, opened: ModalBuilder.__default.opened, trigger: string, bgClose: boolean, windowLock: boolean, content: {}, customAnimation: boolean, target: string}}
		 * @private
		 */
		this.__default = {
			target: 'body',
			trigger: '.modal-trigger',
			closeBtn: '.modal-close',
			content: {},
			bgClose: true,
			customAnimation: false,
			windowLock: true,
			fixed: true,
			start: function(modalType, scrollTop) {},
			opened: function(modalType, scrollTop) {},
			closed: function(modalType, scrollTop) {}
		}

		/**
		 *
		 * @type {{closeBtn: string, start: ModalBuilder.__default.start, closed: ModalBuilder.__default.closed, fixed: boolean, opened: ModalBuilder.__default.opened, trigger: string, bgClose: boolean, windowLock: boolean, content: {}, customAnimation: boolean, target: string}}
		 * @private
		 */
		this._option = options || this.__default

		this.saveScrollTop = 0

		this.$target = $(this._option.target)
		this.$trigger = $(this._option.trigger)
		this.$closeBtn = $(this._option.closeBtn)

		this.event = {}
		this.name = 'ModalBuilder v1.2.0'
	}

	run() {
		let _ = this

		this.$trigger.on('click.modalBuilder', function(e) {
			_._clickHandler.call(this, _, e)
		})
	}

	trigger(modalType) {
		this._shipment(this, modalType)
	}

	clear() {
		$('#wrap')
			.css({
				position: '',
				width: '',
				height: '',
				overflow: ''
			})
			.scrollTop(0)
		$(window).scrollTop(this.saveScrollTop)
	}

	destroy() {
		$('#wrap')
			.css({
				position: '',
				width: '',
				height: '',
				overflow: ''
			})
			.scrollTop(0)
		this.saveScrollTop = 0
		this._option.trigger.off('click')
		this.$target.removeClass('modal-is-active')
	}

	_shipment(_, modalType) {
		// if data-modal-type is unset.
		if (modalType === undefined || modalType === null || modalType === '') {
			console.warn('data-modal-type is undefined or not set.')
			return false
		}

		_._build(_._embed(this, modalType), modalType)
	}

	/**
	 *
	 * @param _
	 * @param modalType
	 * @return {string}
	 * @private
	 */
	_embed(_, modalType) {
		let content = this._option.content[modalType]

		if ('function' === typeof content) {
			return this._flame(content(_, modalType), modalType)
		}

		if ('string' === typeof content) {
			return this._flame(content, modalType)
		}

		throw 'undefined type'
	}

	/**
	 *
	 * @param modal
	 * @param modalType
	 * @private
	 */
	_build(modal, modalType) {
		this.saveScrollTop = $(window).scrollTop()
		if (this._option.windowLock) {
			this._set(this.saveScrollTop)
		}

		let $modal = $(modal)

		if (window.modalAspectType) {
			$modal.addClass(window.modalAspectType)
		}

		let _ = this,
			closeHandler = function(e) {
				e.preventDefault()
				e.stopPropagation()

				_.$target.removeClass('modal-is-active')
				$modal.fadeOut({
					complete: function() {
						$(this).remove()
						if (_._option.windowLock) {
							_.clear()
						}

						$(window).off('keydown.modalBuilder')

						_._option.closed(modalType, this.saveScrollTop)
					}
				})
			}

		this.$target.append($modal).addClass('modal-is-active')
		this.$target.find($modal).fadeIn({
			start: this._option.start(modalType, this.saveScrollTop),
			complete: this._option.opened(modalType, this.saveScrollTop)
		})

		if (!this._option.fixed) {
			$modal.css({
				position: 'absolute',
				top: this.saveScrollTop
			})
		}

		$modal.find(this._option.closeBtn).on('click.modalBuilder', closeHandler)

		$(window).on('keydown.modalBuilder', e => {
			if (27 === e.keyCode) {
				closeHandler(e)
			}
		})

		if (this._option.bgClose) {
			$modal.find('.modal-bg').on('click.modalBuilder', closeHandler)
			$modal.find('.modal').on('click.modalBuilder', function(e) {
				e.stopPropagation()
			})
		}
	}

	/**
	 *
	 * @param st
	 * @private
	 */
	_set(st) {
		$('#wrap')
			.css({
				position: 'fixed',
				width: '100%',
				height: $(window).outerHeight(),
				overflow: 'hidden'
			})
			.scrollTop(st)

		setTimeout(function() {
			$(window).scrollTop(0)
		}, 0)
	}

	/**
	 *
	 * @param content
	 * @param id
	 * @return {string}
	 * @private
	 */
	_flame(content, id) {
		return `<div class="modal-frame" id="modal-frame-${id}">
							<div class="modal-frame-layer-1">
								<div class="modal-bg"></div>
								<div class="modal">${content}</div>
							</div>
						</div>`
	}

	/**
	 *
	 * @param _ {ModalBuilder}
	 * @param e {jQuery.Event}
	 * @private
	 */
	_clickHandler(_, e) {
		e.preventDefault()
		this.event = e
		let data = $(this).data(),
			modalType = data['modalType']

		_._shipment.call(this, _, modalType)
	}
}
