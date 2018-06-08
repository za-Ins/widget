const isLeapYear = year => year % 4 === 0 && year % 100 !== 0

const date = new Date()
const now = {
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate()
}

// 获取某年某月的天数
const getDays = ({year, month}) => {
  const map = {
    1: 31,
    2: isLeapYear(year) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  }
  return map[month]
}

// 投保人大于等于16周岁
// 因为当前表单模型不支持只设置结束日期（即不设置开始日期），故这里添加了一个不可能达到的开始日期，取人的生理极限年龄 100岁
export const largestAge = `${now.year - 100}-${now.month}-${now.day.toString().padStart(2, 0)}`
export const applicantRangeStart = `${now.year - 100}-${now.month}-${now.day.toString().padStart(2, 0)}`
export const applicantRangeEnd = `${now.year - 16}-${now.month}-${now.day.toString().padStart(2, 0)}`

// 被保人大于等于28天小于等于60周岁
export const insurantRangeStart = `${now.year - 60}-${now.month}-${now.day.toString().padStart(2, 0)}`

// 从一个日期减去28天
const minus28DayFrom = formatDate => {
  let {year, month, day} = formatDate
  day -= 28
  if (day <= 0) {
    month -= 1
    if (month === 0) {
      year--
      month += 12
    }
    day += getDays({year, month})
  }
  return `${year}-${month}-${day.toString().padStart(2, 0)}`
}

export const insurantRangeEnd = minus28DayFrom(now)
