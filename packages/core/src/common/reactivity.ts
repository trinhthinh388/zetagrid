import { proxy } from 'valtio';

type SetOverload<T> = {
  (state: Partial<T>): void;
  <K extends keyof T>(key: K, value: T[K]): void;
};

type GetOverload<T> = {
  (): T;
  <K extends keyof T>(key: K): T[K];
};

export class Reactivity<T extends object> {
  #state: T;

  get: GetOverload<T> = <K extends keyof T>(...args: unknown[]) => {
    if (!args[0]) return this.#state;
    return this.#state[args[0] as K];
  };

  set: SetOverload<T> = (...args: unknown[]) => {
    if (typeof args[0] === 'string') {
      // @ts-expect-error just ignore
      this.#state[args[0]] = args[1];
    } else {
      this.#state = {
        ...this.#state,
        // @ts-expect-error just ignore
        ...args[0],
      };
    }
  };

  constructor(initial: T) {
    this.#state = proxy(initial);
  }
}
