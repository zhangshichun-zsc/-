<!--维护培训模板共用-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="head">
      <p>培训模板</p>
      <p>
        <Button class="table-btn" @click="modal1=true">新增模板</Button>
        <Button class="table-btn">作废模板</Button>
      </p>
      <Modal v-model="modal1" title="新增培训模板">
        <p>请选择项目</p>
        <div class="tabs">
          <Button>快乐活动营</Button>
          <Button>智库</Button>
          <Button>支持性就业</Button>
        </div>
        <div class="tabs">
          <Button>家长赋能计划</Button>
          <Button>招募实习生</Button>
          <Button>趾印计划</Button>
        </div>
        <div class="tabs">
          <Button>老友陪伴</Button>
          <Button>青少年</Button>
          <Button>自倡导小组</Button>
        </div>
        <p>请选择活动分类</p>
        <div class="tabs">
          <Button>篮球</Button>
          <Button>排球</Button>
          <Button>校园</Button>
        </div>
        <div class="tabs">
          <Button>羽毛球</Button>
          <Button>徒步</Button>
          <Button>戈壁</Button>
        </div>
      </Modal>
    </div>
    <div class="content">
      <ul>
        <li v-for="item in list">
          <p class="content-head">{{item.dicName}}</p>
          <div class="option" v-for="i in item.mouldList">
            <p @click="train(i.activityId)">{{i.activityName}}</p>
          </div>
          <!-- <div v-show="show">
            <div class="option">
              <p>夏令营活动模板</p>
              <p>登山活动模板</p>
              <p>戈壁活动模板</p>
            </div>
            <div class="option">
              <p>气排球活动模板</p>
              <p>生日会活动模板</p>
              <p>羽毛球活动模板</p>
            </div>
          </div>
          <p class="btn">
            <Button type="success" @click="more">更多</Button>
          </p> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      modal1: false,
    };
  },
  props: [ 'navigation1','list','from' ],
  components: {},

  computed: {},

  created() {},

  methods: {
    train(e) {
      this.$router.push({ name: this.from,query:{activityId:e} });
    },
    more() {
      if (this.show === false) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.head {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  margin-bottom: 5px;
  p {
    padding-left: 20px;
    padding-right: 150px;
  }
  .table-btn {
    height: 30px;
    width: 80px;
    margin-left: 10px;
  }
}
.content {
  background: #ffffff;
  ul {
    margin: 0 140px;
    padding: 20px 0;
    li {
      .content-head {
        border-bottom: #e4e4e4 1px solid;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        margin: 20px 0;
      }
      .option {
        display: flex;
        justify-content: space-between;
        p {
          height: 50px;
          width: 200px;
          border: #e4e4e4 1px solid;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          margin-top: 10px;
        }
      }
      .btn {
        text-align: center;
        margin: 20px 0;
      }
    }
  }
}
.tabs {
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
}
.tabs button {
  width: 120px;
  height: 26px;
  text-align: center;
  line-height: normal;
}
</style>
