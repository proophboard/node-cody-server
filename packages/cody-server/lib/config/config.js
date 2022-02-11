"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const port = process.env.PORT || 3311;
const config = {
    ENV_NAME: process.env.NODE_ENV,
    PORT: port,
    SELF_URL: process.env.SELF_URL || 'http://localhost:' + port,
    REDIS_ENDPOINT: process.env.REDIS_ENDPOINT,
    // Controls how often clients ping back and forth
    HEARTBEAT_TIMEOUT: 8000,
    HEARTBEAT_INTERVAL: 4000,
};
exports.default = config;
