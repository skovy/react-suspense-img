/**
 * Given a value, determine if it's a promise.
 *
 * @returns true if the value is a promise, false otherwise.
 *
 * @param promise the value to check if it's a promise
 */
export const isPromise = (promise: any): promise is Promise<any> =>
  !!promise && typeof promise.then === 'function';
