window.cookie = {
  set: function (name, value) { // 设置cookie方法
    var Days = 30
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
  },
  get: function (key) { // 获取cookie方法
    var arrStr = document.cookie.split("; ")
    for (var i = 0; i < arrStr.length; i++) {
      var temp = arrStr[i].split("=")
      if (temp[0] == key) {
        return unescape(temp[1])
      }
    }
  },
  delete: function (key) { // 删除cookie方法
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = window.cookie.set(name)
    if (cval != null) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
    }
  }
}