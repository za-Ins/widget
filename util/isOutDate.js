/*eslint-disable */
/**
 返回给定日期是否早于当前日期
 // 当给定的日期无效时，返回null
 returns {true|false|null}
 */

export default function (date) {
  let _now = new Date
  let _now_year = _now.getYear()
  let _now_month = _now.getMonth() + 1
  let _now_day = _now.getDate()

  let _date
  // 偿试new一个Date
  try {
    _date = new Date(date)
  } catch (e) {
    console.log(e)
    return null
  }

  let _year = _date.getYear()
  let _month = _date.getMonth() + 1
  let _day = _date.getDate()

  if (!_year) {
    console.log('invalid date')
    return null
  }

  if (_year === _now_year) {
    if (_month === _now_month) {
      return _day < _now_day
    } else if (_month < _now_month) {
      return true
    }
    return false
  } else if (_year < _now_year) {
    return true
  }
  return false
}
