import Utility from 'js/utils/Utility'

export default class UIScroll {
	constructor() {
		this.st = 0
		this.scrollHandler = []

		this.anchorScrollStart = e => {}
		this.anchorScrollCallBack = e => {}
	}

	run() {
		$('.anchor-trigger').on('click.UIScroll', e => {
			e.preventDefault()
			let $t = $(e.currentTarget),
				anchor = $t.attr('href'),
				adjust = $t.data('anchor-adjust')

			this.anchorScrollStart(e)
			UIScroll.anchorScroll(anchor, adjust, () => {
				this.anchorScrollCallBack(e)
			})
		})

		$(window).on('scroll.UIScroll', e => {
			this.st = $(e.target).scrollTop()

			this.scrollHandler.map(elem => {
				elem(this.st)
			})
		})
	}

	/**
	 *
	 * @param resetScrollTop {Boolean}
	 */
	destroy(resetScrollTop) {
		if (resetScrollTop) {
			this.st = 0
		}

		this.scrollHandler = []
		$('.anchor-trigger').off('click.UIScroll')
		$(window).off('scroll.UIScroll')
	}

	/**
	 *
	 */
	static anchorScroll(anchor, adjust = 0, callback = () => {}) {
		let st = $(anchor).offset().top + 1 - adjust

		TweenLite.to($('body,html'), 1, {
			scrollTop: st,
			ease: Utility.getCubicCurve(0.6, 0, 0.3, 1),
			onComplete() {
				callback()
			}
		})
	}
}
