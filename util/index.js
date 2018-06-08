//  将一个字符串首字母大写
export const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('')

//  类型判断函数的生成函数，可以生成 isArray, isFunction 等等
export const is = function (type) {
  return function (target) {
    return ({}).toString.call(target) === `[object ${firstUpperCase(type)}]`
  }
}

//  判断一个对象是否是数组
export const isArray = Array.isArray || is('array')

export const isObject = is('object')

export const isDate = is('date')

export const isFunction = is('function')

export const isString = is('string')

export const isBoolean = is('boolean')

/**
 * 判断一个参数是否已经是“最基础的”，
 * 这里基础包括null、基础类型、正则表达式、字符串等，一般不再允许操纵它内部再小料度的东西。
 * 字符串虽然可以操纵更小粒度，但却不再是当前字符串，所以严格意义上并不视作可操纵内部
 * 注意，对数组进行typeof运算，会得出'object'，而这里是期望如此的
 * @param it  将要作为判断的参数
 */
export const isAtom = it => (typeof it !== 'object' || it === null)

/**
 * 从指定上下文（默认为window)中找到一个没有用到的key
 * @param [context = window] {Object} - 上下文对象
 * @returns {string} 对应的key
 */
export const getKey = ({context = window} = {}) => {
  let name
  do {
    name = parseInt(Math.random() * 1e16)
  } while (context[name] !== void 0)
  return name.toString()
}

/**
 * 给定一个函数，转化成挂载在window下的一个函数，并返回一个动态函数名
 * 该动态函数名是安全的，安全在这儿有两个意思：
 * 1. 不会覆盖已经存在的key
 * 2. 该函数执行一次后自动移除，不会造成额外的内存浪费
 * @param fn {Function} - 将要封装的函数
 * @param [context=window] {Object} 上下文对象，为window对象或其它Vue文件，对象等
 * @returns {string} 封装后的动态函数名
 */
const getDynamicFn = (fn, {context = window} = {}) => {
  const dynamicFn = getKey()
  context[dynamicFn] = function (args) {
    const param = args ? JSON.parse(args) : args
    if (isString(fn) && context && context[fn] && isFunction(context[fn])) {
      context[fn](param)
    } else if (isFunction(fn)) {
      fn(param)
    }
    setTimeout(key => {
      delete context[key]
    }, 100, dynamicFn)
  }
  return dynamicFn
}

/**
 * 按条件封装一个函数或者生成一个动态函数，保证该函数全局可访问
 * 应用场景主要在jsBridge中
 * @param [fn] {Function} 目标函数
 * @param [context=window] {Object|window} 上下文对象
 * @returns {string} 按条件封装后的函数
 */
export const wrapFn = (fn, {context = window} = {}) => {
  return isFunction(context[fn]) ? fn : getDynamicFn(fn, {context})
}

/**
 * 获取当前时间时间段
 */
export const getTimeSlot = function () {
  let timeSlot = new Date().getHours()
  if (timeSlot < 6) {
    return '凌晨'
  } else if (timeSlot < 9) {
    return '早上'
  } else if (timeSlot < 12) {
    return '上午'
  } else if (timeSlot < 14) {
    return '中午'
  } else if (timeSlot < 17) {
    return '下午'
  } else if (timeSlot < 19) {
    return '傍晚'
  } else if (timeSlot < 22) {
    return '晚上'
  } else {
    return '夜里'
  }
}
