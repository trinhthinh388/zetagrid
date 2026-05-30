/**
 * A generic FIFO queue backed by a circular buffer.
 *
 * Provides O(1) amortized `enqueue` and `dequeue` operations,
 * avoiding the O(n) cost of `Array.prototype.shift()`.
 *
 * @template T - The type of elements held in the queue.
 *
 * @example
 * ```ts
 * const q = new Queue<number>();
 * q.enqueue(1);
 * q.enqueue(2);
 * q.dequeue(); // 1
 * q.peek();    // 2
 * q.size;      // 1
 * ```
 *
 * @example
 * ```ts
 * // Initialize with values
 * const q = Queue.from([1, 2, 3]);
 * q.dequeue(); // 1
 * ```
 */
export class Queue<T> {
  /** Internal circular buffer storage. */
  private _buffer: (T | undefined)[];
  /** Index of the front element. */
  private _head: number;
  /** Index where the next element will be inserted. */
  private _tail: number;
  /** Number of elements currently in the queue. */
  private _size: number;

  private static readonly DEFAULT_CAPACITY = 16;

  /**
   * Creates a new Queue.
   *
   * @param initialCapacity - Initial internal buffer capacity. Defaults to 16.
   */
  constructor(initialCapacity: number = Queue.DEFAULT_CAPACITY) {
    const capacity = Math.max(1, initialCapacity);
    this._buffer = new Array(capacity);
    this._head = 0;
    this._tail = 0;
    this._size = 0;
  }

  /**
   * Creates a Queue pre-populated with the given items.
   *
   * @param items - An iterable of items to enqueue in order.
   * @returns A new Queue containing all items.
   */
  static from<U>(items: Iterable<U>): Queue<U> {
    const arr = Array.isArray(items) ? items : [...items];
    const queue = new Queue<U>(arr.length || Queue.DEFAULT_CAPACITY);
    for (const item of arr) {
      queue.enqueue(item);
    }
    return queue;
  }

  /** The number of elements in the queue. */
  get size(): number {
    return this._size;
  }

  /** Whether the queue contains no elements. */
  get isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Adds an element to the back of the queue.
   *
   * @param value - The value to enqueue.
   */
  enqueue(value: T): void {
    if (this._size === this._buffer.length) {
      this._grow();
    }
    this._buffer[this._tail] = value;
    this._tail = (this._tail + 1) % this._buffer.length;
    this._size++;
  }

  /**
   * Removes and returns the element at the front of the queue.
   *
   * @returns The front element.
   * @throws {RangeError} If the queue is empty.
   */
  dequeue(): T {
    if (this._size === 0) {
      throw new RangeError('Cannot dequeue from an empty queue');
    }
    const value = this._buffer[this._head] as T;
    this._buffer[this._head] = undefined; // Allow GC
    this._head = (this._head + 1) % this._buffer.length;
    this._size--;
    return value;
  }

  /**
   * Returns the element at the front of the queue without removing it.
   *
   * @returns The front element, or `undefined` if the queue is empty.
   */
  peek(): T | undefined {
    if (this._size === 0) {
      return undefined;
    }
    return this._buffer[this._head] as T;
  }

  /**
   * Removes all elements from the queue.
   */
  clear(): void {
    this._buffer = new Array(Queue.DEFAULT_CAPACITY);
    this._head = 0;
    this._tail = 0;
    this._size = 0;
  }

  /**
   * Iterates over the queue elements from front to back
   * without removing them.
   */
  *[Symbol.iterator](): Iterator<T> {
    for (let i = 0; i < this._size; i++) {
      yield this._buffer[(this._head + i) % this._buffer.length] as T;
    }
  }

  /**
   * Returns a shallow copy of the queue elements as an array,
   * ordered from front to back.
   */
  toArray(): T[] {
    const result: T[] = new Array(this._size);
    for (let i = 0; i < this._size; i++) {
      result[i] = this._buffer[(this._head + i) % this._buffer.length] as T;
    }
    return result;
  }

  /**
   * Doubles the internal buffer capacity and re-linearizes elements.
   */
  private _grow(): void {
    const oldLen = this._buffer.length;
    const newLen = oldLen * 2;
    const newBuffer: (T | undefined)[] = new Array(newLen);

    for (let i = 0; i < this._size; i++) {
      newBuffer[i] = this._buffer[(this._head + i) % oldLen];
    }

    this._buffer = newBuffer;
    this._head = 0;
    this._tail = this._size;
  }
}
