declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    MONGO_URI?: string;
    SESSION_SECRET: string;
    DISCORD_CLIENT_ID?: string;
    DISCORD_CLIENT_SECRET?: string;
    DISCORD_CALLBACK_URI?: string;
  }
}
