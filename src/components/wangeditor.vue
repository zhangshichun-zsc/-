<template>
  <div id="wangeditor">
    <div :id="id" v-html="excontent"></div>
  </div>
</template>

<script>
    import E from "wangeditor";
    import "../wangEditor/release/wangEditor.min.css";
    // wangEditor配置按钮菜单
    const btnmenu = [
        "head", //标题
        "bold", //粗体
        "fontSize", //字号
        "fontName", //字体
        "italic", //斜体
        "underline", //下划线
        "strikeThrough", //删除线
        "foreColor", //文字颜色
        "backColor", //背景颜色
        "link", //插入链接
        "list", //列表
        "justify", //对齐方式
        "quote", //引用
        "image", //插入图片
        "undo", //撤销
        "redo" // 重复
    ];
    export default {
        name: "wangeditor",
        data() {
            return {
                excontent: "",
                editor: "",
                info: ""
            }
        },
        props: ["labels","id"],
        mounted() {
            this.editor = new E("#"+this.id);
            // 自定义菜单配置
            this.editor.customConfig.menus = btnmenu;
            // 配置上传图片为base64
            this.editor.customConfig.uploadImgShowBase64 = false;
            // // 配置图片上传服务器
            // this.editor.customConfig.uploadImgServer='http://localhost:8081/study/photo/wangEditorUpload';
            // 隐藏“网络图片”tab
            this.editor.customConfig.showLinkImg = false;
            //使用 base64 编码直接将图片插入到内容中
            this.editor.customConfig.uploadImgShowBase64 = true;
            // withCredentials（跨域传递 cookie）
            this.editor.customConfig.withCredentials = true;
            // 自定义header
            this.editor.customConfig.uploadHeader = {};
            // 后端接收上传文件的参数名
            this.editor.customConfig.uploadFileName = "";
            // 将图片大小限制为2M
            this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
            // 限制最多上传6张图片
            this.editor.customConfig.uploadImgMaxLength = 6;
            // 设置超时
            this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000;
            // 关闭粘贴样式的过滤
            this.editor.customConfig.pasteFilterStyle = false;
            // 忽略粘贴内容中的图片
            this.editor.customConfig.pasteIgnoreImg = true;
            // 自定义处理粘贴的文本内容
            this.editor.customConfig.pasteTextHandle = function(content) {
                // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
                // return content + '<p>在粘贴内容后面追加一行</p>'
                return content;
            };
            // url 即插入图片的地址(插入网络图片的回调)
            this.editor.customConfig.linkImgCallback = function(url) {
                console.log(url);
            };
            // 插入链接的校验
            this.editor.customConfig.linkCheck = function(text, link) {
                console.log(text); // 插入的文字
                console.log(link); // 插入的链接
                return true; // 返回 true 表示校验成功
                // return '验证失败' // 返回字符串，即校验失败的提示信息
            };
            // 插入网络图片的校验
            this.editor.customConfig.linkImgCheck = function(src) {
                console.log(src); // 图片的链接
                return true; // 返回 true 表示校验成功
                // return '验证失败' // 返回字符串，即校验失败的提示信息
            };
            // 编辑区域的z-index默认为100
            this.editor.customConfig.zIndex = 100;
            // 图片上传回调
            this.editor.customConfig.uploadImgHooks = {
                fail: (xhr, editor, result) => {
                    /**插入图片回调失败 */
                },
                success: (xhr, editor, result) => {
                    /**图片上传成功回调 */
                },
                timeout: (xhr, editor, result) => {
                    /**网络超时回调 */
                },
                error: (xhr, editor, result) => {
                    /**图片上传错误回调 */
                },
                customInsert: (insertImg, result, editor) => {
                    /**图片上传成功，插入图片回调 */
                }
            };
            // 上传图片的错误提示默认使用alert弹出，你也可以自定义用户体验更好的提示方式
            this.editor.customConfig.customAlert = function(info) {
                // info 是需要提示的内容
                alert("自定义提示：" + info);
                console.log(info);
            };
            this.editor.customConfig.customUploadImg = function(files, insert) {
                // files 是 input 中选中的文件列表
                // insert 是获取图片 url 后，插入到编辑器的方法

                // 上传代码返回结果之后，将图片插入到编辑器中
                insert(imgUrl);
            };
            this.editor.customConfig.onchange =  (html) => {
                // html 即变化之后的内容
                this.content = html
                this.$emit('change',html)
            }
              // 创建富文本编辑器
            this.editor.create();
            
            // 获取富文本内容
            this.editor.txt.html(this.labels);
        },
        methods: {
            updata() {
                alert(this.editor.txt.html());
                this.editor.txt.html("");
            }
        }
    };
</script>

<style>
</style>
