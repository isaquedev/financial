declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URL: string;
      SECRET: string;
      REDIS_URL: string;
      ENV: string;
    }
  }
}

export {};
