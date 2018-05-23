import UserAgent from 'js/modules/UserAgent';

if ( process.env.NODE_ENV === 'development' ) {
    // setTimeout(console.log.bind(console,'%cTHIS SOURCE IS DEVELOPMENT MODE.','color: #F8BBD0;background-color: #E91E63;border:6px solid #E91E63;'));
    console.log( '%cTHIS SOURCE IS DEVELOPMENT MODE.', 'color: #F8BBD0;background-color: #E91E63;border:6px solid #E91E63;' )
} else {
    // setTimeout(console.log.bind(console,'%cBUILT AT ' + new Date( process.env.TIME_STAMP ) ,'color: #B3E5FC;background-color: #03A9F4;border:6px solid #03A9F4;'));
    console.log( '%cBUILT AT ' + new Date( process.env.TIME_STAMP ), 'color: #B3E5FC;background-color: #03A9F4;border:6px solid #03A9F4;' )
}

window.UserAgent = UserAgent;
window.ua = new UserAgent();
window.MOBILE = ua.mobile;
window.TABLET = ua.tablet;
window.OTHER = !MOBILE && !TABLET;

if ( window.OTHER ) {
    window.BROWSER = window.UserAgent.getBrowser();
    window.isIE = false;

    //IE
    if ( window.BROWSER.indexOf( 'ie' ) !== -1 ) {
        window.isIE = true;
        $( 'html' ).addClass( 'is-ie' );
    }

}

window.BREAK_POINT = 600;

/**
 *
 * @param any
 * @return {Boolean}
 */
window.isSet = any => any !== undefined && any !== null;

/**
 *
 * @return {Boolean}
 */
window.overTheBreakPoint = () => BREAK_POINT < window.innerWidth;

/**
 *
 * @param min
 * @param max
 * @return {number}
 */
Math.randomRange = function( min, max ) {
    return Math.floor( Math.random() * (max - min) + min );
};

/**
 *
 * @return {*}
 */
Array.prototype.getRandom = function() {
    return this[ Math.floor( Math.random() * this.length ) ]
};


String.prototype.ucfirst = function() {
    return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
};