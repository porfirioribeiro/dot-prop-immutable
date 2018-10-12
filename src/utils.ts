export type TPrim = string | number;
export type TProp = TPrim | TPrim[];
export function propToArray(prop: TProp): TPrim[] {
  return Array.isArray(prop)
    ? prop
    : typeof prop === "number"
      ? [prop]
      : prop.split(".").reduce(function(ret: string[], el, index, list) {
          var last = index > 0 && list[index - 1];
          if (last && /(?:^|[^\\])\\$/.test(last)) {
            ret.pop();
            ret.push(last.slice(0, -1) + "." + el);
          } else {
            ret.push(el);
          }
          return ret;
        }, []);
}

export function getArrayIndex(head: string, obj: any[]) {
  if (head === "$end") {
    return /* head = */ Math.max(obj.length - 1, 0);
  }
  if (!/^\+?\d+$/.test(head)) {
    throw new Error("Array index '" + head + "' has to be an integer");
  }
  return parseInt(head);
}
