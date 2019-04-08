import Schedule from 'js/utils/Schedule';

export default class Startup {
    run( prev, next, $newContent, params, controllerManager, nextTask ) {
        let _ = this,
            dl = null;

        return function() {
            let self = this,
                schedule = new Schedule(),
                PROCESS_TIME = 10;

            schedule.add( function( resolve ) {
                $( resolve );
            } );

            schedule.add( function( resolve ) {
                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );

            schedule.add( function( resolve ) {
                let $content = $( '.page-content' ),
                    id = $content.attr( 'id' );

                $( 'body' ).addClass( id === 'top' ? 'index' : 'sub' );
                controllerManager.add( id, $content );
                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );

            schedule.add( function( resolve ) {
                controllerManager.use( 'current' ).viewWillLoad();
                controllerManager.use( 'current' ).viewDidLoad();
                controllerManager.use( 'current' ).viewWillAppear();
                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );

            schedule.done( () => {
                window.pageInitialized = true;
                nextTask( dl )
            } );
        }
    }
}
