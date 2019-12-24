<!--维护活动融融固定项(会员)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-activity">融融介绍</p>
      <Form :model="parameterObj" :label-width="80">
        <FormItem label="标题">
          <Input v-model="parameterObj.title" placeholder="请输入..." style="width:30rem;"  size="large"></Input>
        </FormItem>
        <FormItem label="详情">
          <wangeditor :labels="parameterObj.text" @change="change" id="ed1"></wangeditor>
        </FormItem>
      </Form>
      <div class="button-food">
        <Button @click="setInfo" class="btn"  shape="circle" size='large'>保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail, setpropaganda } from '@/request/api'
export default {
  data() {
    return {
      navigation1: {
        head: '维护活动融融固定项'
      },
      formValidate: {
        title: ''
      },

      parameterObj: {
        title: '',
        text: '',
        orgId: ''
      },
      title: '',
      // 富文本富文本editor
      editor1: {
        contents: ''
      }
    }
  },

  components: {},

  computed: {},

  created() {},

  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getDetail({
        orgId: '1'
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.parameterObj.orgId = res.data.orgId
          this.parameterObj.title = res.data.propagandaTitle
          this.parameterObj.text = res.data.propagandaText
        }
      })
    },
    setInfo() {
      setpropaganda({
        ...this.parameterObj
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$Message.success('修改成功')
          this.getInfo()
        } else {
          this.$Message.error('修改失败，请重试')
        }
      })
    },
    change(res) {
      this.parameterObj.text = res
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  border: #e4e4e4 solid 1px;
  margin-top: 20px;
  .content-activity {
    border-bottom: #e4e4e4 solid 1px;
    background: #f3f3f3;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }
  form {
    padding: 1rem;
    background-color: #ffffff;
  }
}
.btn{
  width: 100px;
  background: #FF565A !important;
  color: #fff !important;
  border-color:#FF565A !important;
}
.button-food {
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  button {
    margin: 1rem;
  }
}
</style>
