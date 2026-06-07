import { proxy } from 'valtio';

type SetOverload<T> = {
  (state: Partial<T>): void;
  <K extends keyof T>(key: K, value: T[K]): void;
};

export class Reactivity<T extends object> {
  #state: T;

  constructor(initial: T) {
    this.#state = proxy(initial);
  }

  getAll = () => {
    return this.#state;
  };

  get = <K extends keyof T>(key: K): T[K] => {
    return this.#state[key];
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
}
