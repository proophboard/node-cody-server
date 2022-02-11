declare const config: {
    ENV_NAME: string | undefined;
    PORT: string | number;
    SELF_URL: string;
    REDIS_ENDPOINT: string | undefined;
    HEARTBEAT_TIMEOUT: number;
    HEARTBEAT_INTERVAL: number;
};
export default config;
