import 'js/_header';
import Delegate from "./Delegate";

const delegate = new Delegate()

window.addEventListener('DOMContentLoaded', function() {
	delegate.willLoad()
})

window.addEventListener('load', function() {
	delegate.didLoad()
})

let resizeEvent = window.OTHER ? "resize" : "orientationchange";
window.addEventListener(resizeEvent, function() {
	delegate.resize()
})

window.addEventListener('scroll', function() {
	delegate.scroll(window.pageYOffset || document.documentElement.scrollTop)
})

