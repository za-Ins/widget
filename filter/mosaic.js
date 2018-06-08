let reg = /^(\d{3})(\d{4})(\d{4})$/

//  （如果看起来像一个手机号码），把中间的4位 马赛克（即用*号代替）
export default seq => reg.test(seq) ? seq.replace(reg, ($0, $1, $2, $3) => $1 + '****' + $3) : seq
