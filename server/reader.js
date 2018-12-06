const fs = require( 'fs' );

fs.readFile( './external/hello.txt', ( err, data ) => 
{
    if ( err )
    {
        throw err;
    }
    console.log( data );
} );