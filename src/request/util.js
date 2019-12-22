import { userExprotUrl } from "@/request/http";

const urlEncode = function (param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
}

const userExprot = function (hean, parame) {
  let exportUrl = userExprotUrl + hean + "?" + urlEncode(parame).substr(1)
  console.log(exportUrl)
  window.open(exportUrl, '_blank')
}

export default {
  formatDate: function (timestamp) {
    let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
    let m = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
    let s = date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds();
    return Y + M + D + h + m + ':' + s;
  },
  formatDate_time: function (timestamp) {
    let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = date.getMonth() + 1 + '-';
    let D = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes();
    let s = date.getSeconds();
    return Y + M + D
  },

  formatDateYMD: function (timestamp) {
    let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    return Y + M + D;
  },
  //oninput = "this.value=this.value.replace(/[^\d]/g,'')"
  //防止表单提交   this.util.debounce(方法名,时间);
  debounce: function (func, wait) {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait);
    }
  },
  //导出数据
  exportData: function (arrs, data) {
    if (arrs.length == 0) {
      arrs = data
    }
    this.$refs.selection.exportCsv({
      filename: this.navigation1.head,
      columns: this.columns.filter((col, index) => index > 0),
      data: arrs
    });

  },

  // Vue.directive('enterNumber', {
  //   inserted: function (el) {
  //     el.addEventListener("keypress",function(e){
  //       e = e || window.event;
  //       let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
  //       let re = /\d/;
  //       if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
  //           if(e.preventDefault){
  //               e.preventDefault();
  //           }else{
  //               e.returnValue = false;
  //           }
  //       }
  //     });
  //   }
  // });

  // 删除 接口传递 的对象中的空值，
  remove(obj) {
    for (var key in obj) {
      if (obj[key] === '') {
        delete obj[key]
      }
    }
    return obj
  },

  urlEncode,
  userExprot,

  //数组去重在a数组中去除与b数组相同的元素
  arrChange(a, b) {
    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < a.length; j++) {
        if (a[j] == b[i]) { //如果是id相同的，那么a[ j ].id == b[ i ].id
          a.splice(j, 1);
          j = j - 1;
        }
      }
    }
    return a;
  },

  //字符串转数组
  strarr(a) {
    a.split(",").map(item => {
      return Number(item)
    })
  },

  //  添加 enter 事件
  keydowenter(vm, Callback) {
    if (!Callback) return console.error('请添加调用的事件处理函数')
    if (!vm) return console.error('请添当前的this 实例')
    let then = vm
    then.Callback = function () {
      return Callback()
    }
    document.onkeydown = function () {
      var key = window.event.keyCode;
      if (key == 13) {
        Callback && then.Callback()
      }
    };
  },
  //  解绑 enter 事件
  removekeydow() {
    document.onkeydown = null
    return false
  }


}

