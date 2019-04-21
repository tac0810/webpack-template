import './_header';
import './extensions';
import Delegate from "./Delegate";

const delegate = new Delegate()

window.addEventListener('DOMContentLoaded', function() {
	delegate.projectInit()
	delegate.willLoad()
})

window.addEventListener('load', function() {
	delegate.didLoad()
})

window.addEventListener(window.OTHER ? 'resize' : 'orientationchange', function() {
	delegate.resize()
})

window.addEventListener('scroll', function() {
	delegate.scroll(window.pageYOffset || document.documentElement.scrollTop)
})

