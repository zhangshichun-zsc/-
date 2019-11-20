<!-- 政策维护(志愿者) -->
<template>
  <div class="integral">
    <div class="integral-header">
       <Navigation :labels="navigation1"></Navigation>
    </div>
    <div class="integral-table">
      <div class="push">
           <div class="box">
              <div class="box1">用户注册政策</div>
              <div class="box2"></div>
           </div>
           <div class="content" >
             <wangeditor :labels="editor1" id="ed1"></wangeditor>
           </div>
      </div>
      <div class="push">
           <div class="box">
              <div class="box1">志愿者注册政策</div>
              <div class="box2"></div>
           </div>
           <div class="content" >
             <wangeditor :labels="editor2" id="ed2"></wangeditor>
           </div>
      </div>
      <div class="push">
           <div class="box">
              <div class="box1">非官方活动发布政策</div>
              <div class="box2"></div>
           </div>
           <div class="content" >
             <wangeditor :labels="editor3" id="ed3"></wangeditor>
           </div>
      </div>
      <div class="push">
           <div class="box">
              <div class="box1">邀请好友规则政策</div>
              <div class="box2"></div>
           </div>
           <div class="content" >
             <wangeditor :labels="editor4" id="ed4"></wangeditor>
           </div>
      </div>
      <div class="content">
         <Button type="success">提交</Button>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       navigation1: {
        head: "政策维护（志愿者）",
       },
      data: [{}],
        editor1: {
            contents:''
        },
        editor2: {
            contents:''
        },
        editor3: {
            contents:''
        },
        editor4: {
            contents:''
        },
    }
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {

  }
};
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.integral-table {
  margin-top: 30px;
}
.table-header {
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-right: 15px;
}
.integral-table .pages {
  padding: 5px 20px;
  margin-top: 50px;
  background: #fff;
}
.pages {
  text-align: center;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
.ivu-tag {
  margin-left: 10px;
}
.box{
  display: flex;
}
.box1{
  width: 180px;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  background:gray;
  color: white;
}
.box2{
width: 0;
height: 0;
border-width: 20px;
border-style: solid;
border-color:  transparent transparent transparent gray;
}
.push{
  margin:10px 0;
}
.content{
  width: 80%;
  margin: 20px auto;
}

</style>
