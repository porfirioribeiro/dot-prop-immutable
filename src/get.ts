import { TProp, propToArray } from './utils';

/**
 * Get a value by a dot path.
 * @param obj The object to evaluate.
 * @param prop The path to value that should be returned.
 * @param value The default value to return if no result
 */
// export function get<T extends any, V = any>(obj: T, prop: TProp, value: V): V;
export function get<T extends any, V = any>(obj: T, prop: TProp, value?: V): V | undefined {
  prop = propToArray(prop);

  for (var i = 0; i < prop.length; i++) {
    if (typeof obj !== 'object' || obj === null) {
      return value;
    }
    var head = prop[i];
    if (Array.isArray(obj) && head === '$end') {
      head = obj.length - 1;
    }
    obj = obj[head];
  }

  if (typeof obj === 'undefined') {
    return value;
  }

  return obj as any;
}
