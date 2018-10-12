import { TProp } from './utils';
import { get } from './get';
import { set } from './set';

/**
 * Toggles a value.  The target value is evaluated using Boolean(currentValue).  The result will always be a JSON boolean.
 * Be careful with strings as target value, as "true" and "false" will toggle to false, but "0" will toggle to true.
 * Here is what Javascript considers false:  0, -0, null, false, NaN, undefined, and the empty string ("")
 * @param obj The object to evaluate.
 * @param prop The path to the value.
 */
export function toggle<T = any>(obj: T, prop: TProp): T {
  return set(obj, prop, !Boolean(get(obj, prop)));
}
