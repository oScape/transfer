const fs = require( 'fs' );

fs.readFile( './external/hello.txt', 'utf8', ( err, data ) => 
{
    if ( err )
    {
        throw err;
    }

    let lines = 
        // split par ligne
        data.split( '\n' )
            // on enlève le retour chariot
            .map( line => line.replace( '\r', '' ) )
            // on split entre chaque element
            .map( line => line.split( ': ' ) );    
    console.log( lines );
} );