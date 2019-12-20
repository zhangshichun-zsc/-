function setRem() {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
    let htmlDom = document.getElementsByTagName('html')[0]
    console.log(htmlWidth)
    let root = Math.ceil(htmlWidth /96)
    htmlDom.style.fontSize = root + 'px'
}
/* eslint-disable */
setRem()
window.onresize = function () {
    setRem()
}
