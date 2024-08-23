"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const server_1 = __importDefault(require("./server"));
// tslint:disable-next-line:no-var-requires
const codyConfig = require(process.cwd() + '/codyconfig');
if (!codyConfig) {
    console.error("No codyconfig.ts found in the current working directory: " + process.cwd());
    process.exit(1);
}
const server = (0, server_1.default)(codyConfig);
server.listen(config_1.default.PORT, () => {
    console.log('Server listening at port %d', config_1.default.PORT);
    console.log({ config: config_1.default });
});
process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down server');
    server.close();
    process.exit(0);
});
