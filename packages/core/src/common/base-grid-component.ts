import { effect } from 'valtio-reactive';
import { ComputedRect, ElementAttributes } from '../types';
import { Reactivity } from './reactivity';

export type BaseGridComponentState<T> = {
  init: boolean;
} & T;

export type RenderResult = {
  children: RenderResult[];
  attributes: ElementAttributes;
};

export abstract class BaseGridComponent<TState extends object> {
  protected dom: HTMLDivElement;
  protected disposes: VoidFunction[];
  protected rect: Reactivity<ComputedRect>;
  protected state: Reactivity<BaseGridComponentState<TState>>;

  constructor({ initial = {} }: { initial?: Partial<BaseGridComponentState<TState>> } = {}) {
    this.rect = new Reactivity<ComputedRect>({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    });
    this.disposes = [];
    this.state = new Reactivity<BaseGridComponentState<TState>>({
      init: false,
      ...initial,
    } as BaseGridComponentState<TState>);
    this.dom = window.document.createElement('div');
  }

  abstract init(): void;
  abstract destroy(): void;
  abstract render(): RenderResult[];

  getDOM = (): HTMLDivElement => {
    return this.dom;
  };

  getRect = (): ComputedRect => {
    return this.rect.getAll();
  };

  getState = (): BaseGridComponentState<TState> => {
    return this.state.getAll();
  };

  useEffect = (callback: VoidFunction): void => {
    this.disposes.push(effect(callback));
  };
}
