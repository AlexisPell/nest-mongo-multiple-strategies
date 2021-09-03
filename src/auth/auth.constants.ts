export enum STRATEGIES {
  DISCORD = 'discord',
}

export type STRATEGY_KEY = keyof typeof STRATEGIES;

// May pick anything else from payload later if necessary
export type DiscordSSOPayload = {
  id: string;
  email: string;
  username: string;
  accessToken: string;
  discriminator: string;
  avatar: string | null;
};
