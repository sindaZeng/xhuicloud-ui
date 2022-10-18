export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isExternal(path: string): boolean {
  return /^(https?:|http:|mailto:|tel:)/.test(path)
}

export function isUrl(url: string): boolean {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isEmptyObject(val: any): val is Record<any, any> {
  return JSON.stringify(val) === '{}'
}
