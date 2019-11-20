<!-- 证书维护（志愿者） -->
<template>
  <div class="integral">
    <Row class="row">
      <Col span="10">
        <button>选择志愿者团队</button>
      </Col> 
      <Col span="14">
        <Select v-model="model1" style="width:80%">
          <Option v-for="item in team" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
    </Row>

    <Row>
      <Col span="12">
        <a href="javascript:;">更换LOGO</a>
      </Col>
      <Col span="12">
        <a href="javascript:;">更换页尾</a>
      </Col>
    </Row>
    <div class="box">
      <div class="photo"></div>
      <Upload action="//jsonplaceholder.typicode.com/posts/">
        <Button type="primary" icon="ios-cloud-upload-outline">上传图片</Button>
      </Upload>
    </div>
    <Button type="primary" icon="ios-cloud-saved-outline" @click="location">保存图片</Button>
    <div class="integral-table">
      <div class="pages">
        <Page :total="100" show-elevator show-total size="small" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {
          value: "华为",
          label: "华为"
        },
        {
          value: "中兴",
          label: "中兴"
        }
      ],
      model1: ""
    };
  },

  methods: {
    location(){
      this.$router.push({ name: 'vp_cenfic.vue' })
    }
  }
};
</script>
<style lang="scss" scoped>
.integral {
  text-align: center;
}
a {
  color: black;
  font-size: 14px;
}
.box {
  width: 80%;
  border: 1px solid gray;
  height: 20rem;
  margin: 2rem auto;
  background: #bfeef0;
}
.photo {
  width: 60%;
  height: 15rem;
  border: 1px solid gray;
  margin: 1rem auto;
  background: #c3cbcb;
}
.integral-table {
  margin-top: 30px;
}
button {
    padding: 5px;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  border:1px solid gray;
}
.row{
    margin: 1rem;
}
</style>
