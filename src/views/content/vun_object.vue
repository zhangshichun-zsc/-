<!--问卷调查(志愿者)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
     <div class="flex-center-between integral-top"> 
        <div>
          <span>问卷调查—问卷对象</span>
        </div>
    </div> 
     <div class="flex-center-end integral-body" style="font-size:14px">
        <div class="flex-center-start" style="margin-bottom:20px">
          <Button @click="add" style="margin-right:10px">添加</Button>
          <Button>删除</Button>
        </div>
   </div>
   <Table border :columns="columns" :data="data"></Table>
   <Button style="margin:20px auto;display:block;"size="large" @click="save">保存</Button>
  </div>
 
</template>

<script>


export default {
  data() {
    return {
      navigation1: {
        head: "问卷调查(志愿者)"
      },
            columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "账号",
          key: "start",
          render:(h,params) =>{
              return h("div","12345678")
          }
        },
        {
          title: "用户类型",
          key: "end",
          render: (h, params) => {
            return h("div", "受益方");
          }
        }
      ],
      data: [
        {
            name:'王二'
        },
        {
            name:'张三'
        },
        {
            name:'李四'
        },
        {
            name:'王五'
        },
        {
            name:'赵六'
        },
        {
            name:'元一'
        },
        {
            name:'鹿六'
        }
      ],
      types: "",
      value: "",
    };
  },

  components: {},

  computed: {},

  created() {},

  methods: {
      add(){
          this.$router.push({name:'vun_new'})
      },
      save(){
          this.$router.push({name:'vun_question'})
      }
  }
};
</script>
<style lang="scss" scoped>
.integral-top {
  height: 50px;
  border: 1px solid #e4e4e4;
  margin: 20px 0;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
}

</style>
