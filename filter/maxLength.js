//  长度限定过滤器
export default (s = '', limit) => s.length > limit ? s.slice(0, limit) : s
