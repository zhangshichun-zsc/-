<!--活动总结(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="head">
      <p>5.12"行走在夏日"游园活动</p>
      <span>未开始</span>
    </div>
    <div class="content">
      <div class="summarize">
        <p>本次活动总结</p>
        <wangeditor :labels="editor1" id="ed1"></wangeditor>
      </div>
      <div class="activity-content">
        <p class="content-img">
          <span>您可以上传有意思的活动照片</span>
          <span>上传图片(最多6张)</span>
        </p>
        <div class="uploading-img">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="btn">
          <Button class="table-btn" @click="btn">提交</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: "活动总结(会员)"
      },
        // 富文本editor
        editor1: {
            contents:''
        }
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    onEditorBlur(){
      console.log(this.editorOption)
      // 失去焦点事件
    },
    btn(){
      console.log(apiAddress)
      apiAddress().then(res=> {
            console.log(res)
        })
    }

  }
};
</script>
<style lang="scss" scoped>
.head {
  height: 70px;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  align-items: flex-start;
  margin-bottom: 20px;
  p {
    margin: 5px 0px;
    font-size: 20px;
    height: 20px;
  }
}
.content {
  padding-left: 80px;
  background: #ffffff;
  .summarize {

    padding-top: 20px;
    p {
      width: 280px;
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      background: green;
      padding-left: 20px;
    }
  }
}
.rich-text {
  height: 300px;
  width: 900px;
  border: #e4e4e4 1px solid;
  margin-bottom: 20px;
}

.activity-content {
  background: #ffffff;
  padding-bottom: 30px;
  .content-img {
    display: flex;
    flex-direction: column;
    span {
      font-size: 14px;
      color: #999999;
      margin: 10px 0;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    button {
      height: 40px;
      width: 140px;
    }
  }
}

.uploading-img {
  ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 700px;
    li {
      height: 120px;
      width: 120px;
      background: #e4e4e4;
      margin: 10px 30px;

    }
  }
}

//上传图片样式
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
