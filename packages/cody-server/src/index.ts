import {CodyConfig} from "./config/codyconfig";
import config from './config/config' ;
import codyServer from "./server";

// tslint:disable-next-line:no-var-requires
const codyConfig: CodyConfig = require(process.cwd() + '/codyconfig');

if(!codyConfig) {
    console.error("No codyconfig.js found in the current working directory: " + process.cwd());
    process.exit(1);
}

const server = codyServer(codyConfig);

server.listen( config.PORT, () => {
    console.log( 'Server listening at port %d', config.PORT );
    console.log({config});
} );

process.on( 'SIGTERM', () => {
    console.log( 'Received SIGTERM, shutting down server' );
    server.close();
    process.exit( 0 );
});
