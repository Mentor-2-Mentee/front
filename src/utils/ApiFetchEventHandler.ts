/**
 * now support function : debounce
 *
 * Params
 * @callBackFunction (required) target eventHander (contained fetch api) method
 * @timeout (nullable) default 1000ms
 *
 * @debounce api method
 */
export class ApiFetchEventHandler {
  callbackFunction;
  timeout = 1000;
  #timer?: number;
  constructor(callBackFunction: () => Promise<void>, timeout?: number) {
    if (timeout) this.timeout = timeout;
    this.callbackFunction = callBackFunction;
  }

  debounce() {
    if (this.#timer) {
      window.clearTimeout(this.#timer);
    }

    this.#timer = window.setTimeout(() => {
      this.callbackFunction();
    }, this.timeout);
  }
}

export default ApiFetchEventHandler;
