/**
 * 过滤器
 * 格式化银行卡，将一串连接的数字转换为更可读的格式
 * 例 ： '6227001277511541662' 格式化后就变成了： '6227 0012 7751 1541 662'
 * @param cardNo 银行卡编号
 */
export default (cardNo = '') => cardNo&&cardNo.replace(/\s/g, '').replace(/\d{4}/g, $0 => $0 + ' ')
