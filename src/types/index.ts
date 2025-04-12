import type { Collection } from "discord.js";
import type { Command } from "./command.js";

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ID: string;
      TOKEN: string;
    }
  }
}

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
  }
}
/* eslint-enable @typescript-eslint/consistent-type-definitions */

/**
 * A predicate to check if a structure is of a certain type.
 */
export type Predicate<T> = (structure: unknown) => structure is T;

export * from "./command.js";
export * from "./event.js";
