function Validate () {
  console.log('this is validate center')
}

let pt = Validate.prototype

pt.validate = function (value, rules) {
  var v = this.trimStr(value)
  var require = rules.find((n) => {
    return n.type == 'required'
  })
  if (require || (!require && v)) {
    var result = rules.find((n) => {
      return !this[n.type](v, n.param)
    })
    return result
  }
}
pt.address = function (str) {
  let reg = new RegExp(/^[A-Z0-9\(\)\-a-z\s]*[A-Z0-9\(\)\-a-z\s]$/)
  return reg.test(str)
}
pt.addressCN = function (str) {
  let reg = new RegExp(/^[\u4e00-\u9fa5A-Z0-9\(\)\-a-z\s]*[\u4e00-\u9fa5A-Z0-9\(\)\-a-z\s]$/)
  return reg.test(str)
}
pt.EmptyAndEAndBracket = function (str) {
  let reg = new RegExp(/^[A-Z0-9\(\)a-z\s]*[A-Z0-9\(\)a-z\s]$/)
  return reg.test(str)
}
pt.EmptyAndE = function (str) {
  let reg = new RegExp(/^([A-Za-z]+\s?)*[A-Za-z]$/)
  return reg.test(str)
}
pt.china = function (str) {
  let reg = new RegExp(/^[\u4e00-\u9fa5a-zA-Z\s]+$/)
  return reg.test(str)
}
pt.numAndE = function (str) {
  let reg = new RegExp(/^[0-9a-zA-Z\s]+$/)
  return reg.test(str)
}

pt.hdk = function (str) {
  var v = this.trimStr(str)
  var s = v.toUpperCase()
  let reg = new RegExp(/^[A-Z][0-9]{6}\([0-9A-Z]\)$/)
  if (reg.test(s)) {
    var obj = {}
    var code = Array.from({length: 26}, (v, i) => {
      obj[String.fromCharCode(65 + i)] = i + 1
      return obj
    })
    var first = obj[s.substr(0, 1)]
    var middle = s.substr(1, 6).split('')
    var last = s.substr(8, 1)
    var result = [first, ...middle]
    var total = result.map((e, i) => {
      return e * (8 - i)
    }).reduce((pre, cur) => pre + cur)
    var yu = total % 11
    var z
    if (yu == 0) {
      z = 0
    } else if (yu == 1) {
      z = 'A'
    } else {
      z = 11 - yu
    }
    if (z == last) {
      return true
    } else {
      return false
    }
  }
  return false
}

pt.trimStr = function (str) {
  return str ? str.replace(/(^\s*)|(\s*$)/g, "") : ''
}

pt.required = function (str) {
  var v = this.trimStr(str)
  if (v.length > 0) {
    return true
  } else {
    return false
  }
}

pt.length = function (str, option) {
  let length = str.length
  let max = option.max || 9999
  let min = option.min || 2
  if (length >= min && length <= max) {
    return true
  } else {
    return false
  }
}
/**
  [email 检查邮箱是否正确]
  @params {[string]} email [邮箱地址]
  @return Booleans
**/
pt.email = function (email) {
  let reg = new RegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)
  if (reg.test(email)) {
    return true
  }
  return false
}
/**
 * [equal 两个值是否相等]
 * @param  {[number],[string]}  val1,val2[验证的值]
 * @return {Boolean}
 */
pt.equal = function (val1, val2) {
  return val1 === val2
}
/**
 * [phone 验证手机号]
 * @param  {[string]}  phone [手机号]
 * @return {Boolean}
 */
pt.phone = function (phone) {
  let reg = new RegExp(/^((((0?)|((00)?))(((\s){0,2})|([-_－—\s]?)))|(([(]?)[+]?))(852)?([)]?)([-_－—\s]?)((2|3|5|6|9)?([-_－—\s]?)\d{3})(([-_－—\s]?)\d{4})$/)
  return reg.test(phone)
}
/**
 * [isNum 是否是数字]
 * @param  {[number]}  val [验证的值]
 * @return {Boolean}
 */
pt.isNum = function (val) {
  let reg = new RegExp(/^[0-9]*.$/)
  return reg.test(val)
}
/**
 * [password 密码]
 * @param  {[string]}  pwd [验证的值:数字或字母,6-16位]
 * @return {Boolean}
 */
pt.password = function (pwd) {
  // var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)
  var reg = new RegExp(/^[0-9A-Za-z]{6,16}$/)
  return reg.test(pwd)
}
/**
 * [name 姓名]
 * @param  {[string]}  name [验证的值:数字和字母,6-20位]
 * @return {Boolean}
 */
pt.name = function (name) {
  var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/)
  return reg.test(name)
}
/**
 * [translateDate date数据格式 转换]
 * @param  {[string]}  data [日期，将日/月/年转换为年-月-日,支持月/年转换为年-月]
 */
pt.transDate = function (date) { //date数据格式 转换
  if (!date) {
    return
  }
  let arr = date.split("/")
  let str = ''
  arr.reverse()
  str = arr.join('-')
  return str
}
/**
 * 判断是不是闰年
 * @param year
 */
pt.isLeapYear = function (year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}
/**
 * [getAge 根据时间年月日获取年龄]
 * @param  {[string]}  birthday [时间:'22/12/2017']
 * @return {Boolean}
 */
pt.getAge = function (birthday) {
  let returnAge = ''
  let birthdayArr = birthday.split("/")
  let birthYear = birthdayArr[2]
  let birthMonth = birthdayArr[1]
  let birthDay = birthdayArr[0]

  let d = new Date()
  let nowYear = d.getFullYear()
  let nowMonth = d.getMonth() + 1
  let nowDay = d.getDate()

  if (nowYear == birthYear) {
    returnAge = 0//同年 则为0岁
  } else {
    let ageDiff = nowYear - birthYear  //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        let dayDiff = nowDay - birthDay//日之差
        if (dayDiff < 0) {
          if (birthMonth == "02" && birthDay == "29" && nowDay == "28" && !this.isLeapYear(nowYear)) {
            returnAge = ageDiff
          } else {
            returnAge = ageDiff - 1
          }
        } else {
          returnAge = ageDiff
        }
      } else {
        let monthDiff = nowMonth - birthMonth//月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge//返回周岁年龄
}

let v = new Validate()
export default v
