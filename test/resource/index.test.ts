import invariant from 'invariant';

import { resource } from '../../src';

jest.mock('invariant', () => jest.fn());

describe('resource', () => {
  beforeAll(() => {
    Object.defineProperty(Image.prototype, 'src', {
      set(src: string) {
        if (src.startsWith('https://')) {
          setTimeout(() => this.onload());
        } else {
          setTimeout(() => this.onerror());
        }
      },
    });
  });

  beforeEach(() => {
    resource.clear();
  });

  describe('when nothing is cached', () => {
    it('throws a promise', () => {
      expect(() => resource.read('https://placekitten.com/12/34')).toThrow(
        Promise
      );
    });

    it('throws an invariant error', () => {
      expect(invariant).toHaveBeenCalledWith(
        true,
        `An image was loaded that wasn't preloaded.\n` +
          `Consider adding \`resource.preloadImage("https://placekitten.com/12/34")\`` +
          ` before using with <Img src="https://placekitten.com/12/34" />`
      );
    });
  });

  describe('when the image has already been loaded', () => {
    it('returns the image source', async () => {
      try {
        resource.read('https://placekitten.com/12/34');
      } catch (promise) {
        await promise;
      }

      expect(resource.read('https://placekitten.com/12/34')).toBe(
        'https://placekitten.com/12/34'
      );
    });
  });

  describe('when an error occurs loading an image', () => {
    it('throws an error', async () => {
      try {
        resource.read('wat');
      } catch (promise) {
        await promise.catch(() => {});
      }

      expect(() => resource.read('wat')).toThrowError(
        'An error occurred loading the image: "wat"'
      );
    });
  });

  describe('preloadImage', () => {
    it('starts to load the image and returns the promise otherwise a string if already loaded', async () => {
      const promise = resource.preloadImage('https://placekitten.com/12/34');
      await promise;

      expect(promise).resolves.toBe('https://placekitten.com/12/34');
      expect(resource.read('https://placekitten.com/12/34')).toBe(
        'https://placekitten.com/12/34'
      );

      const src = resource.preloadImage('https://placekitten.com/12/34');
      expect(src).toBe('https://placekitten.com/12/34');
    });
  });
});
