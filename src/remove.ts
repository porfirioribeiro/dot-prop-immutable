import { TProp, propToArray, TPrim, getArrayIndex } from './utils';

/**
 * Delete a property by a dot path.
 * If target container is an object, the property is deleted.
 * If target container is an array, the index is deleted.
 * If target container is undefined, nothing is deleted.
 * @param obj The object to evaluate.
 * @param prop The path to the property or index that should be deleted.
 */
export function remove<T = any>(obj: T, prop: TProp): T {
  return removePropImmutableRec(obj, propToArray(prop), 0);
}

function removePropImmutableRec<T extends any>(obj: T, prop: TPrim[], i: number) {
  let clone,
    head = prop[i];

  if (typeof obj !== 'object' || (!Array.isArray(obj) && obj[head] === undefined)) {
    return obj;
  }

  if (prop.length - 1 > i) {
    if (Array.isArray(obj)) {
      head = getArrayIndex(head as string, obj);
      clone = obj.slice();
    } else {
      clone = Object.assign({}, obj);
    }

    clone[head] = removePropImmutableRec(obj[head], prop, i + 1);
    return clone;
  }

  if (Array.isArray(obj)) {
    head = getArrayIndex(head as string, obj);
    clone = [].concat(obj.slice(0, head), obj.slice(head + 1));
  } else {
    clone = Object.assign({}, obj);
    delete clone[head];
  }

  return clone;
}
