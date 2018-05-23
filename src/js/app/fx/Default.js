import Schedule from 'js/utils/Schedule';

export default class Default {

    run( prev, next, $newContent, params, controllerManager, nextTask ) {
        return function() {
            let self = this,
                $b = $( 'body' ),
                $prev = $( '#' + prev, $b ),
                $next = $newContent.find( '#' + next ),
                to = ( prev !== 'top' && next === 'top' ) || ( prev === 'top' && next === 'top' ) ? 'index' : 'sub',
                dl = null;

            const schedule = new Schedule();
            const PROCESS_TIME = 10;

            schedule.add( resolve => {
                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );

            schedule.add( resolve => {
                $prev.remove();
                $( '#contents' ).append( $next );
                $( 'body' ).removeClass( 'index sub' ).addClass( to );
                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );

            schedule.add( resolve => {
                if ( $prev.length ) {
                    controllerManager.add( next, $next );
                    controllerManager.use( 'prev' ).viewDidDisappear();
                    controllerManager.pop();
                }

                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );

            schedule.add( resolve => {
                controllerManager.use( 'current' ).viewWillAppear();
                Schedule.wait( PROCESS_TIME ).then( resolve );
            } );

            schedule.done( () => {
                nextTask( dl );
            } );
        }
    }

}