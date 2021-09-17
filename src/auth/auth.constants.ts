import { User } from '../users/models/user.document';

export enum STRATEGIES {
  LOCAL = 'local',
  GOOGLE = 'google',
  DISCORD = 'discord',
}

export type Done = (err: Error | null, user: User | null) => void;
