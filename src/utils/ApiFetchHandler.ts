export class ApiFetchHandler {
  callBackFunction;
  timeout = 1000;
  #timer?: number;
  constructor(callBackFunction: () => Promise<void>, timeout?: number) {
    if (timeout) this.timeout = timeout;
    this.callBackFunction = callBackFunction;
  }

  debounce() {
    if (this.#timer) {
      window.clearTimeout(this.#timer);
    }

    this.#timer = window.setTimeout(() => {
      this.callBackFunction();
    }, this.timeout);
  }
}

export default ApiFetchHandler;
