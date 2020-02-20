/**
 * 验证证件
 */

const isCardNo = (card,str) => {
    if(!str)return false
    if (str.indexOf('内地')>-1) {
      return checkCardId(card);
    }
    //台湾
    if (/^[A-KM-QT-XZ]{1}[0-9]{9}$/.test(card) && str.indexOf('台湾') > -1){
      return true
    }
    //护照
    if (/^E\d{8}$/.test(card) && str.indexOf('护照')>-1){
      return true
    }
    //香港
    if (/^[A-Z][0-9]{6}\([0-9A-Z]\)$/.test(card) && str.indexOf('香港') > -1 ){
      return true
    }
    //澳门
    if (/^[157][0-9]{6}\([0-9]\)$/.test(card) && str.indexOf('澳门') > -1) {
      return true
    }
    return false;
  }
  
  function checkCardId(idCard) {
    // 1 "验证通过!", 0 //校验不通过 // id为身份证号码
    var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    // var format = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    //号码规则校验
    if (!format.test(idCard)) {
      return false
    }
    // // //区位码校验
    // // //出生年月日校验  前正则限制起始年份为1900;
    // var year = idCard.substr(6, 4), //身份证年
    //   month = idCard.substr(10, 2), //身份证月
    //   date = idCard.substr(12, 2), //身份证日
    //   time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
    //   now_time = Date.parse(new Date()), //当前时间戳
    //   dates = (new Date(year, month, 0)).getDate(); //身份证当月天数
    // if (time > now_time || date > dates) {
    //   return false
    // }
    // // 校验码判断
    // var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
    // var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); //校验码对照表
    // var id_array = idCard.split("");
    // var sum = 0;
    // for (var k = 0; k < 17; k++) {
    //   sum += parseInt(id_array[k]) * parseInt(c[k]);
    // }
    // if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
    //   return false;
    // }
    return true
  }
  export default isCardNo;
