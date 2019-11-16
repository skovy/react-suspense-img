import invariant from 'invariant';

import { isPromise } from '../utils';

/**
 * The potential values that can be in the cache.
 *
 * - `Promise`: the image is loading.
 * - `Error`: an error occurred loading the image.
 * - `true`: the image was loaded successfully.
 */
type CacheValue = Promise<string> | Error | true;

interface ResourceCache {
  [src: string]: CacheValue;
}

/**
 * A simple resource to load images and suspend with React Concurrent mode.
 *
 * This is currently a pretty naive implementation that is inspired by a few
 * early demo apps and the Relay implementation. It has an infinite "cache"
 * size and relies on loading an image via JavaScript into the browser's cache.
 * Since the image itself is not stored in the internal resource's cache the
 * value is simply a boolean. There are likely many improvements that can be
 * made but without a lot of real world examples and use cases it's hard to
 * tell what needs to be more robust or where there may be edge cases.
 */
class Resource {
  private _cache: ResourceCache;

  constructor() {
    this._cache = {};
  }

  /**
   * Read an image by source from the cache. If it's cached, the source will
   * be returned. If it's not, a promise will be thrown. If it was attempted
   * but an error occurred an error will be thrown.
   *
   * @returns the source string if loaded, can also throw a promise and error.
   *
   * @param src the image source to read
   */
  public read = (src: string): string => {
    const cachedValue = this._cache[src];

    // 1. Check if the request to load the image is already in-flight or an
    // error has already occurred trying to load it.
    if (isPromise(cachedValue) || cachedValue instanceof Error) {
      throw cachedValue;
    }

    // 2. If it exists in the cache, the image has already been loaded.
    if (cachedValue === true) {
      return src;
    }

    // 3. It doesn't exist so it needs to be fetched. Ideally, this line is
    // never hit because that means the image was never preloaded.
    invariant(
      !cachedValue,
      `An image was loaded that wasn't preloaded.\n` +
        `Consider adding \`resource.preloadImage("${src}")\`` +
        ` before using with <Img src="${src}" />`
    );

    this.preloadImage(src);
    throw this._cache[src];
  };

  /**
   * Preload an image by source. Call this before trying to read an image.
   *
   * @param src the image source to load
   */
  public preloadImage = (src: string) => {
    const cachedValue = this._cache[src];

    // 1. Check if the request to load the image is already in-flight or an
    // error has already occurred trying to load it.
    if (isPromise(cachedValue) || cachedValue instanceof Error) {
      return cachedValue;
    }

    // 2. If it exists in the cache, the image has already been loaded.
    if (cachedValue === true) {
      return src;
    }

    const promise = new Promise<string>((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this._cache[src] = true;
        resolve(src);
      };

      img.onerror = () => {
        this._cache[src] = new Error(
          `An error occurred loading the image: "${src}"`
        );
        reject();
      };

      img.src = src;
    });

    this._cache[src] = promise;

    return promise;
  };

  /**
   * Clear every image from the resource cache.
   */
  public clear = () => {
    this._cache = {};
  };
}

// Initialize a single global resource for all images.
const resource = new Resource();

export { resource };
