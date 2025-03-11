import dotenv from "dotenv";

dotenv.config();

export default class EnvManager {
    static getEnv(key: string) {
        return process.env[key];
    }
    static getEnvOrThrow(key: string) {
        const value = this.getEnv(key);
        if (!value) {
            throw new Error(`Environment variable ${key} is not set.`);
        }
        return value;
    }
}