<!--维护培训模板共用-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="head">
      <!-- <p>培训模板</p> -->
      <p>
        <Button class="table-btn" @click="modal1 = true">新增模板</Button>
      </p>
      <Modal v-model="modal1" title="新增模板">
        <p>请选择分类</p>
        <div class="tabs">
          <Button
            class="btn"
            v-for="(item, index) in arr"
            :key="index"
            @click="train(item.dicId,item.dicName,0)"
            >{{ item.dicName }}</Button
          >
        </div>
      </Modal>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <p class="content-head">{{ item.dicName }}</p>
          <div class="wap">
            <Button
              @click="train(i[id], i[name], 1)"
              v-for="(i, m) in item.mouldList"
              :key="m"
              class="btn"
              >{{ i[name] }}</Button
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getActiveTypeItem } from "@/request/api";
export default {
  data() {
    return {
      show: false,
      modal1: false,
      arr: []
    };
  },
  props: {
    navigation1: Object,
    list: Array,
    from: {
      type: String,
      default: "editing"
    },
    name: {
      type: String,
      default: "activityName"
    },
    id: {
      type: String,
      default: "activityId"
    }
  },
  components: {},

  computed: {},

  created() {
    this.getList();
  },

  methods: {
    train(id, name, ble) {
     if(ble== 0&& this.from == 'editing'){
      this.$router.push({
        name: this.from,
        query: { dicId:id,name}
      })
     }else{
      this.$router.push({
        name: this.from,
        query: { id, name, ble }
      });
     }
    },
    more() {
      if (this.show === false) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    getList() {
      getActiveTypeItem({}).then(res => {
        this.arr = res.data;
        console.log(res);
      });
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
  min-height: 600px;
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
      .wap {
        padding: 20px;
        .btn {
          margin-right: 20px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
.tabs {
  margin: 10px 0;
}
.tabs .btn {
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
