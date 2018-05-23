import Utility from 'js/utils/Utility';

export default class Startup {
    run( prev, next, $newContent, params, controllerManager ) {
        let _ = this,
            dl = null;

        return function() {
            let self = this,
                q = $.Queue(),
                PROCESS_TIME = 10;

            q.append( function() {
                let _ = this;
                $( _.resolve );
            } );

            q.append( function() {
                Utility.wait( PROCESS_TIME ).done( this.resolve );
            } );

            q.append( function() {
                let $content = $( '.page-content' ),
                    id = $content.attr( 'id' );

                $( 'body' ).addClass( id === 'top' ? 'index' : 'sub' );
                controllerManager.add( id, $content );
                Utility.wait( PROCESS_TIME ).done( this.resolve );
            } );

            q.append( function() {
                // controllerManager.use( 'current' ).viewWillLoad();
                // controllerManager.use( 'current' ).viewDidLoad();
                // controllerManager.use( 'current' ).viewWillAppear();
                // controllerManager.use( 'current' ).viewDidAppear();
                Utility.wait( PROCESS_TIME ).done( this.resolve );
            } );



            q.append( function() {

                window.pageInitialized = true;
                self.resolve( dl );
            } );
        }
    }
}