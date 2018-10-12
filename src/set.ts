import { TProp, propToArray, getArrayIndex, TPrim } from './utils';

/**
 * Set a value by a dot path.
 * @param obj The object to evaluate.
 * @param prop The path to be set.
 * @param val The value to set.
 */
export function set<T = any>(obj: T, prop: TProp, value: any): T {
  return setPropImmutableRec(obj, propToArray(prop), value, 0);
}

function setPropImmutableRec<T extends any>(obj: T, prop: TPrim[], value: any, i: number) {
  let clone: any;
  let head = prop[i];

  if (prop.length > i) {
    if (Array.isArray(obj)) {
      head = getArrayIndex(head as string, obj);
      clone = obj.slice();
    } else {
      clone = Object.assign({}, obj);
    }
    clone[head] = setPropImmutableRec(obj[head] !== undefined ? obj[head] : {}, prop, value, i + 1);
    return clone;
  }

  return typeof value === 'function' ? value(obj) : value;
}

/**
 * Set many values defined in a map on the obj
 * @param obj
 * @param map
 */
export function setAll<T = any>(obj: T, map: Record<TPrim, any>) {
  return Object.keys(map).reduce(function(acc, path) {
    return set(acc, path, map[path]);
  }, obj);
}
