import { proxy } from 'valtio';
import { effect } from 'valtio-reactive';

type SetOverload<T> = {
  (state: Partial<T>): void;
  <K extends keyof T>(key: K, value: T[K]): void;
};

export class Reactivity<T extends object> {
  #state: T;

  #disposes: VoidFunction[];

  constructor(initial: T) {
    this.#disposes = [];
    this.#state = proxy(initial);
  }

  get = () => {
    return this.#state;
  };

  subscribe = (callback: VoidFunction): VoidFunction => effect(callback);
  cleanup = () => {
    this.#disposes.forEach((dispose) => dispose());
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
