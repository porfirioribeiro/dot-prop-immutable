import { get } from './get';
import { set } from './set';
import { TProp } from './utils';

/**
 * Merges a value.  The target value must be an object, array, null, or undefined.
 * If target is an object, Object.assign({}, target, param) is used.
 * If target an array, target.concat(param) is used.
 * If target is null or undefined, the value is simply set.
 * @param obj The object to evaluate.
 * @param prop The path to the value.
 * @param val The value to merge into the target value.
 */
export function merge<T = any>(obj: T, prop: TProp, val: Partial<T>): T {
  let curVal = get(obj, prop);
  if (typeof curVal === 'object') {
    if (Array.isArray(curVal)) {
      return set(obj, prop, curVal.concat(val));
    } else if (curVal === null) {
      return set(obj, prop, val);
    } else {
      var merged = Object.assign({}, curVal, val);
      return set(obj, prop, merged);
    }
  } else if (typeof curVal === 'undefined') {
    return set(obj, prop, val);
  } else {
    return obj;
  }
}
