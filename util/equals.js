// 判断两个对象是否"相等"
import {isAtom, isArray} from './index'
const equals = (a, b) => {
  if (isAtom(a) || isAtom(b)) {
    return a === b
  }
  if (isArray(a) && a.length === 0) return isArray(b) && b.length === 0
  for (let i in a) {
    if (!a.hasOwnProperty(i)) { //  忽略原型
      break
    }
    if (!equals(a[i], b[i])) return false
  }
  return true
}

export {equals as default}
