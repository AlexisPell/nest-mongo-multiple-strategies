import { User } from './../users/user.document';

export enum STRATEGIES {
  LOCAL = 'local',
  GOOGLE = 'google',
  DISCORD = 'discord',
}

export type Done = (err: Error, user: User) => void;
