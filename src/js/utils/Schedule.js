export default class Schedule {
    constructor() {

        /**
         *
         * @type {Array}
         * @private
         */
        this._list = [];

        /**
         *
         * @type {Array}
         * @private
         */
        this._promiseList = [];
    }

    static wait( time ) {
        return new Promise( resolve => {
            setTimeout( function() {
                resolve();
            }, time );
        } );
    }

    /**
     *
     * @param task {function}
     */
    add( task = resolve => {} ) {
        this._list.push( () => {
            let promise = new Promise( resolve => {
                task( resolve );
            } );

            this._promiseList.push( promise );

            return promise
        } );
    }

    /**
     *
     * @param callback {function}
     */
    done( callback = () => {} ) {
        this._list.reduce( ( prev, current ) => {
            return prev.then( current );
        }, Promise.resolve() ).then( () => {
            Promise.all( this._promiseList ).then( callback );
        } );


    }
}