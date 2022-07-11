/**
 * @callBackFunction (params:T) => Promise<void>형식의 최종 서비스메서드
 * @T callBackFunctiond에 들어갈 params타입
 *
 * @debounce callBackFunction에 인자 전달시 useCallback으로 레핑해야함
 */
export class ApiFetchHandler<T> {
  callbackFunction;
  timeout = 1000;
  #timer?: number;
  constructor(
    callBackFunction: (params: T) => Promise<void>,
    timeout?: number
  ) {
    if (timeout) this.timeout = timeout;
    this.callbackFunction = callBackFunction;
  }

  debounce(params: T) {
    if (this.#timer) {
      window.clearTimeout(this.#timer);
    }

    this.#timer = window.setTimeout(() => {
      this.callbackFunction(params);
    }, this.timeout);
  }
}

export default ApiFetchHandler;
