import { Server } from 'http';
import { CodyConfig } from "./config/codyconfig";
declare const codyServer: (codyConfig: CodyConfig) => Server;
export default codyServer;
