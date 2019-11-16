import { isPromise } from '../../src/utils';

describe('isPromise', () => {
  describe('returns true if it', () => {
    it('is a promise', () => {
      const promise = new Promise(() => {});
      expect(isPromise(promise)).toBe(true);
    });
  });

  describe('returns false if it', () => {
    it('is null', () => {
      expect(isPromise(null)).toBe(false);
    });

    it('is a function', () => {
      expect(isPromise(function() {})).toBe(false);
    });

    it('is an object', () => {
      expect(isPromise({})).toBe(false);
    });
  });
});
