import { User } from './../users/user.document';

export enum STRATEGIES {
  DISCORD = 'discord',
  LOCAL = 'local',
}

export type Done = (err: Error, user: User) => void;
